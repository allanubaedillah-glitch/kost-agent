import { Router, Request, Response } from "express";
import { db } from "../db";
import { SlotManager } from "../services/slot-manager";
import { WebhookSender } from "../services/webhook";
import { z } from "zod";

export const bookingRouter = Router();

// GET /api/v1/bookings (Owner melihat daftar booking masuk)
bookingRouter.get("/", async (req: Request, res: Response) => {
  try {
    const bookings = await db.inboundBooking.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        property: { select: { name: true, city: true } },
        room: { select: { roomNumber: true, roomType: true } }
      }
    });

    res.json({
      success: true,
      data: bookings.map((b) => ({
        ...b,
        occupantsData: JSON.parse(b.occupantsData)
      }))
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/inbound (API-KM-04: Menerima booking & bukti bayar dari KostAgent)
bookingRouter.post("/inbound", async (req: Request, res: Response) => {
  try {
    const {
      kostagent_booking_id,
      property_id,
      room_id,
      customer,
      booking_details,
      occupants,
      payment_proof
    } = req.body;

    const inbound = await db.inboundBooking.create({
      data: {
        kostagentBookingId: kostagent_booking_id,
        propertyId: property_id,
        roomId: room_id,
        customerName: customer.name,
        customerPhone: customer.phone,
        slotsCount: booking_details.slots_count,
        durationMonths: booking_details.duration_months,
        startDate: new Date(booking_details.start_date),
        endDate: new Date(booking_details.end_date),
        totalAmount: booking_details.total_amount,
        occupantsData: JSON.stringify(occupants),
        paymentProofUrl: payment_proof.receipt_url,
        status: "PAYMENT_SUBMITTED"
      }
    });

    res.status(201).json({
      success: true,
      message: "Data pemesanan dan bukti pembayaran berhasil diterima untuk diverifikasi owner",
      data: {
        inbound_id: inbound.id,
        verification_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

const decisionSchema = z.object({
  decision: z.enum(["ACCEPTED", "REJECTED"]),
  rejection_reason: z.string().optional()
});

// POST /api/v1/bookings/:id/decision (Owner ACCEPT / REJECT booking - UC-KM-06)
bookingRouter.post("/:id/decision", async (req: Request, res: Response) => {
  try {
    const inboundId = req.params.id;
    const validation = decisionSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_BODY", message: "Decision wajib bernilai ACCEPTED atau REJECTED" }
      });
    }

    const { decision, rejection_reason } = validation.data;

    const booking = await db.inboundBooking.findUnique({
      where: { id: inboundId }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Data booking tidak ditemukan" }
      });
    }

    if (decision === "ACCEPTED") {
      // 1. Konfirmasi reservasi kamar: reserved_slots -> occupied_slots
      await SlotManager.confirmOccupancy({
        roomId: booking.roomId,
        bookingReferenceId: booking.kostagentBookingId
      });

      // 2. Update status inbound booking
      await db.inboundBooking.update({
        where: { id: inboundId },
        data: {
          status: "ACCEPTED",
          verifiedAt: new Date()
        }
      });

      // 3. Panggil webhook ke KostAgent (WH-KA-02)
      await WebhookSender.sendEvent("/webhooks/booking-decision", "BOOKING_VERIFIED", {
        kostagent_booking_id: booking.kostagentBookingId,
        decision: "ACCEPTED",
        rejection_reason: null,
        verified_at: new Date().toISOString()
      });

      return res.json({
        success: true,
        message: "Pemesanan berhasil disetujui (ACCEPTED), slot kamar resmi terisi",
        data: { booking_id: booking.kostagentBookingId, status: "ACCEPTED" }
      });
    } else {
      // REJECTED
      // 1. Lepas slot kamar hold
      await SlotManager.releaseSlots({
        roomId: booking.roomId,
        bookingReferenceId: booking.kostagentBookingId
      });

      // 2. Update status inbound booking
      await db.inboundBooking.update({
        where: { id: inboundId },
        data: {
          status: "REJECTED",
          rejectionReason: rejection_reason || "Ditolak oleh pemilik kos",
          refundStatus: "PENDING",
          verifiedAt: new Date()
        }
      });

      // 3. Panggil webhook ke KostAgent (WH-KA-02)
      await WebhookSender.sendEvent("/webhooks/booking-decision", "BOOKING_VERIFIED", {
        kostagent_booking_id: booking.kostagentBookingId,
        decision: "REJECTED",
        rejection_reason: rejection_reason || "Ditolak oleh pemilik kos",
        verified_at: new Date().toISOString()
      });

      return res.json({
        success: true,
        message: "Pemesanan ditolak (REJECTED), slot kamar telah dilepaskan dan alur refund diaktifkan",
        data: { booking_id: booking.kostagentBookingId, status: "REJECTED" }
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/:id/refund-account (API-KM-05: Menerima data rekening refund customer dari KostAgent)
bookingRouter.post("/:bookingReferenceId/refund-account", async (req: Request, res: Response) => {
  try {
    const { bookingReferenceId } = req.params;
    const { bank_name, account_number, account_holder } = req.body;

    const booking = await db.inboundBooking.findUnique({
      where: { kostagentBookingId: bookingReferenceId }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Booking tidak ditemukan" }
      });
    }

    await db.inboundBooking.update({
      where: { id: booking.id },
      data: {
        refundBankName: bank_name,
        refundAccountNumber: account_number,
        refundAccountHolder: account_holder,
        refundStatus: "PENDING"
      }
    });

    res.json({
      success: true,
      message: "Data rekening pengembalian dana berhasil dicatat pada antrean refund pemilik"
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/:id/confirm-refund (Owner konfirmasi transfer refund selesai - ADR-012)
bookingRouter.post("/:id/confirm-refund", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await db.inboundBooking.findUnique({ where: { id } });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Booking tidak ditemukan" }
      });
    }

    await db.inboundBooking.update({
      where: { id },
      data: {
        refundStatus: "COMPLETED",
        refundTransferredAt: new Date()
      }
    });

    // Panggil webhook ke KostAgent (WH-KA-03)
    await WebhookSender.sendEvent("/webhooks/refund-completed", "REFUND_COMPLETED", {
      kostagent_booking_id: booking.kostagentBookingId,
      transferred_at: new Date().toISOString()
    });

    res.json({
      success: true,
      message: "Pengembalian dana (refund) telah dikonfirmasi selesai ditransfer"
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/:id/confirm-check-in (Owner konfirmasi check-in fisik penghuni)
bookingRouter.post("/:id/confirm-check-in", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await db.inboundBooking.findUnique({ where: { id } });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Booking tidak ditemukan" }
      });
    }

    await db.inboundBooking.update({
      where: { id },
      data: {
        status: "CHECKED_IN",
        checkedInAt: new Date()
      }
    });

    // Panggil webhook ke KostAgent (WH-KA-04)
    await WebhookSender.sendEvent("/webhooks/check-in-confirmed", "CHECK_IN_CONFIRMED", {
      kostagent_booking_id: booking.kostagentBookingId,
      checked_in_at: new Date().toISOString()
    });

    res.json({
      success: true,
      message: "Check-in berhasil dikonfirmasi, status kamar berubah menjadi OCCUPIED"
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
