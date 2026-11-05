import { Router, Request, Response } from "express";
import { db } from "../db";
import crypto from "crypto";

export const webhookRouter = Router();

// Middleware validasi signature HMAC-SHA256 (ADR-005)
function verifyWebhookSignature(req: Request, res: Response, next: Function) {
  const signature = req.headers["x-signature-sha256"] as string;
  const webhookSecret = process.env.WEBHOOK_SECRET || "webhook-secret-key-2026";

  if (!signature) {
    return res.status(401).json({
      success: false,
      error: { code: "MISSING_SIGNATURE", message: "Header X-Signature-SHA256 wajib ada" }
    });
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(403).json({
      success: false,
      error: { code: "INVALID_SIGNATURE", message: "Tanda tangan digital webhook tidak valid" }
    });
  }

  next();
}

webhookRouter.use(verifyWebhookSignature);

// POST /api/v1/webhooks/kost-sync (WH-KA-01: Sinkronisasi data kos/kamar dari Kost Management)
webhookRouter.post("/kost-sync", async (req: Request, res: Response) => {
  try {
    const { event_type, data } = req.body;

    if (data?.property_id) {
      const property = await db.partnerProperty.findUnique({
        where: { kmPropertyId: data.property_id }
      });

      if (property) {
        await db.partnerProperty.update({
          where: { id: property.id },
          data: {
            name: data.name || property.name,
            lastSyncedAt: new Date()
          }
        });

        if (Array.isArray(data.rooms)) {
          for (const r of data.rooms) {
            await db.partnerRoom.updateMany({
              where: { kmRoomId: r.room_id },
              data: {
                monthlyPrice: r.monthly_price,
                totalCapacity: r.total_capacity,
                occupiedSlots: r.occupied_slots,
                reservedSlots: r.reserved_slots,
                status: r.status,
                lastSyncedAt: new Date()
              }
            });
          }
        }
      }
    }

    res.json({ success: true, message: "Webhook sinkronisasi berhasil diproses" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/webhooks/booking-decision (WH-KA-02: Keputusan owner ACCEPT / REJECT)
webhookRouter.post("/booking-decision", async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { kostagent_booking_id, decision, rejection_reason } = data;

    const booking = await db.booking.findUnique({
      where: { bookingCode: kostagent_booking_id }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Booking tidak ditemukan" }
      });
    }

    if (decision === "ACCEPTED") {
      // Set batas check-in 14 hari sejak diterima (ADR-000, FR-CHK-001)
      const checkInDeadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      await db.booking.update({
        where: { id: booking.id },
        data: {
          status: "ACCEPTED",
          checkInDeadline
        }
      });
    } else {
      // REJECTED
      await db.booking.update({
        where: { id: booking.id },
        data: {
          status: "REJECTED",
          cancellationReason: rejection_reason || "Ditolak oleh pemilik kos"
        }
      });
    }

    res.json({
      success: true,
      message: `Status booking ${kostagent_booking_id} berhasil diperbarui menjadi ${decision}`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/webhooks/refund-completed (WH-KA-03: Konfirmasi refund owner selesai)
webhookRouter.post("/refund-completed", async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { kostagent_booking_id, transferred_at } = data;

    const booking = await db.booking.findUnique({
      where: { bookingCode: kostagent_booking_id },
      include: { refundRequest: true }
    });

    if (booking && booking.refundRequest) {
      await db.refundRequest.update({
        where: { id: booking.refundRequest.id },
        data: {
          status: "COMPLETED",
          completedAt: new Date(transferred_at || Date.now())
        }
      });
    }

    res.json({ success: true, message: "Status refund berhasil diperbarui menjadi COMPLETED" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/webhooks/check-in-confirmed (WH-KA-04: Owner konfirmasi kedatangan penghuni)
webhookRouter.post("/check-in-confirmed", async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const { kostagent_booking_id } = data;

    await db.booking.update({
      where: { bookingCode: kostagent_booking_id },
      data: {
        status: "CHECKED_IN"
      }
    });

    res.json({ success: true, message: "Status booking berhasil diperbarui menjadi CHECKED_IN" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
