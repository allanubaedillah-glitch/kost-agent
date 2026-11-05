import { Router, Request, Response } from "express";
import { db } from "../db";
import { SlaMonitor } from "../services/sla-monitor";
import { KostManagementClient } from "../services/km-client";

export const testingRouter = Router();

// POST /api/v1/testing/expire-hold/:bookingId (Simulasi batas bayar 60 menit habis - Option 4-A)
testingRouter.post("/expire-hold/:bookingId", async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const booking = await db.booking.findFirst({
      where: {
        OR: [{ id: bookingId }, { bookingCode: bookingId }]
      },
      include: { partnerRoom: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Booking tidak ditemukan" } });
    }

    // Set paymentDeadline to past (10 minutes ago)
    const expiredDeadline = new Date(Date.now() - 10 * 60 * 1000);
    await db.booking.update({
      where: { id: booking.id },
      data: {
        paymentDeadline: expiredDeadline,
        status: "PENDING_PAYMENT"
      }
    });

    // Jalankan SLA check langsung
    await SlaMonitor.runChecks();

    const updatedBooking = await db.booking.findUnique({
      where: { id: booking.id },
      include: { partnerRoom: true }
    });

    res.json({
      success: true,
      message: `Hold pembayaran untuk booking ${booking.bookingCode} berhasil diexpirasikan dan slot dirilis ke Kost Management`,
      data: updatedBooking
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/testing/breach-sla/:bookingId (Simulasi Owner SLA breach 24 jam - Option 4-A)
testingRouter.post("/breach-sla/:bookingId", async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;

    const booking = await db.booking.findFirst({
      where: {
        OR: [{ id: bookingId }, { bookingCode: bookingId }]
      }
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Booking tidak ditemukan" } });
    }

    // Set verificationDeadline to 1 hour ago
    const pastDeadline = new Date(Date.now() - 60 * 60 * 1000);
    await db.booking.update({
      where: { id: booking.id },
      data: {
        verificationDeadline: pastDeadline,
        isNeedsAttention: false
      }
    });

    // Jalankan SLA check langsung
    await SlaMonitor.runChecks();

    const updatedBooking = await db.booking.findUnique({
      where: { id: booking.id }
    });

    res.json({
      success: true,
      message: `SLA verifikasi booking ${booking.bookingCode} berhasil ditrigger overdue (>24 jam) dan flagged NEEDS ATTENTION untuk Admin`,
      data: updatedBooking
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/testing/status (Ringkasan sinkronisasi data antar kedua sistem)
testingRouter.get("/status", async (req: Request, res: Response) => {
  try {
    const properties = await db.partnerProperty.count();
    const rooms = await db.partnerRoom.count();
    const bookings = await db.booking.count();
    const customers = await db.customer.count();

    res.json({
      success: true,
      service: "KostAgent",
      data: {
        properties,
        rooms,
        bookings,
        customers,
        system_time: new Date().toISOString()
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
