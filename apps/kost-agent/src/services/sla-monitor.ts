import { db } from "../db";
import { KostManagementClient } from "./km-client";

export class SlaMonitor {
  /**
   * 1. Periksa pemesanan PENDING_PAYMENT yang melewati batas 60 menit:
   *    Ubah menjadi EXPIRED dan rilis slot hold di Kost Management.
   * 2. Periksa pemesanan PAYMENT_SUBMITTED yang melewati batas verifikasi 24 jam:
   *    Tandai isNeedsAttention = true (ADR-003).
   */
  static async runChecks() {
    const now = new Date();

    // 1. Cek Timeout Pembayaran 60 Menit
    const expiredBookings = await db.booking.findMany({
      where: {
        status: "PENDING_PAYMENT",
        paymentDeadline: { lt: now }
      },
      include: { partnerRoom: true }
    });

    for (const b of expiredBookings) {
      try {
        await db.booking.update({
          where: { id: b.id },
          data: { status: "EXPIRED", cancellationReason: "Waktu pembayaran 60 menit habis" }
        });

        // Rilis slot di Kost Management
        await KostManagementClient.releaseSlots({
          kmRoomId: b.partnerRoom.kmRoomId,
          bookingReferenceId: b.bookingCode,
          reason: "PAYMENT_TIMEOUT_EXPIRED"
        });

        console.log(`[SlaMonitor] Booking ${b.bookingCode} kedaluwarsa (EXPIRED), slot berhasil dirilis`);
      } catch (err) {
        console.error(`[SlaMonitor] Gagal memproses expired booking ${b.id}:`, err);
      }
    }

    // 2. Cek Overdue Verifikasi Owner 24 Jam (ADR-003)
    const overdueVerifications = await db.booking.findMany({
      where: {
        status: "PAYMENT_SUBMITTED",
        isNeedsAttention: false,
        verificationDeadline: { lt: now }
      }
    });

    for (const b of overdueVerifications) {
      try {
        await db.booking.update({
          where: { id: b.id },
          data: { isNeedsAttention: true }
        });
        console.warn(`[SlaMonitor] Booking ${b.bookingCode} melewati SLA verifikasi 24 jam! Ditandai NEEDS ATTENTION untuk Admin`);
      } catch (err) {
        console.error(`[SlaMonitor] Gagal update needs attention booking ${b.id}:`, err);
      }
    }
  }
}
