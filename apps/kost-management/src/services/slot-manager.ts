import { db } from "../db";

export class SlotManager {
  /**
   * Menahan kuota slot kamar secara real-time selama 60 menit (ADR-008 & ADR-010).
   * Prinsip Atomic All-or-Nothing (CAP-06).
   */
  static async holdSlots(params: {
    roomId: string;
    bookingReferenceId: string;
    slotsCount: number;
    idempotencyKey?: string;
  }) {
    const { roomId, bookingReferenceId, slotsCount } = params;

    return await db.$transaction(async (tx) => {
      // 1. Cek apakah bookingReferenceId sudah memiliki reservasi aktif (Idempotency)
      const existingReservation = await tx.roomReservation.findFirst({
        where: {
          roomId,
          bookingReferenceId,
          status: "HOLD"
        }
      });

      if (existingReservation) {
        return {
          success: true,
          reservation: existingReservation,
          isDuplicate: true
        };
      }

      // 2. Ambil data kamar terkini
      const room = await tx.room.findUnique({
        where: { id: roomId }
      });

      if (!room) {
        throw new Error("ROOM_NOT_FOUND");
      }

      if (room.status !== "AVAILABLE") {
        throw new Error("ROOM_NOT_AVAILABLE");
      }

      // 3. Hitung ketersediaan slot (CAP-02, CAP-03)
      const availableSlots = room.totalCapacity - room.occupiedSlots - room.reservedSlots;

      // 4. Validasi ketersediaan: Semua slot harus terpenuhi atau fail all (CAP-06)
      if (availableSlots < slotsCount) {
        throw new Error("INSUFFICIENT_CAPACITY");
      }

      // 5. Update kuota reserved_slots pada kamar
      const updatedRoom = await tx.room.update({
        where: { id: roomId },
        data: {
          reservedSlots: {
            increment: slotsCount
          }
        }
      });

      // 6. Buat record room_reservation berdurasi 60 menit
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 menit (ADR-000)
      const reservation = await tx.roomReservation.create({
        data: {
          roomId,
          bookingReferenceId,
          slotsCount,
          status: "HOLD",
          expiresAt
        }
      });

      return {
        success: true,
        reservation,
        remainingSlots: updatedRoom.totalCapacity - updatedRoom.occupiedSlots - updatedRoom.reservedSlots,
        isDuplicate: false
      };
    });
  }

  /**
   * Melepaskan kuota slot yang sedang di-hold (ADR-001).
   */
  static async releaseSlots(params: {
    roomId: string;
    bookingReferenceId: string;
  }) {
    const { roomId, bookingReferenceId } = params;

    return await db.$transaction(async (tx) => {
      const reservation = await tx.roomReservation.findFirst({
        where: {
          roomId,
          bookingReferenceId,
          status: "HOLD"
        }
      });

      if (!reservation) {
        return { success: false, message: "NO_ACTIVE_HOLD_FOUND" };
      }

      // 1. Kurangi reservedSlots
      await tx.room.update({
        where: { id: roomId },
        data: {
          reservedSlots: {
            decrement: reservation.slotsCount
          }
        }
      });

      // 2. Tandai reservation sebagai RELEASED
      await tx.roomReservation.update({
        where: { id: reservation.id },
        data: {
          status: "RELEASED"
        }
      });

      return { success: true, releasedSlots: reservation.slotsCount };
    });
  }

  /**
   * Mengonfirmasi slot hold menjadi occupied saat owner menekan ACCEPT.
   */
  static async confirmOccupancy(params: {
    roomId: string;
    bookingReferenceId: string;
  }) {
    const { roomId, bookingReferenceId } = params;

    return await db.$transaction(async (tx) => {
      const reservation = await tx.roomReservation.findFirst({
        where: {
          roomId,
          bookingReferenceId,
          status: "HOLD"
        }
      });

      if (!reservation) {
        throw new Error("RESERVATION_NOT_FOUND");
      }

      // Pindahkan dari reservedSlots ke occupiedSlots
      await tx.room.update({
        where: { id: roomId },
        data: {
          reservedSlots: { decrement: reservation.slotsCount },
          occupiedSlots: { increment: reservation.slotsCount }
        }
      });

      await tx.roomReservation.update({
        where: { id: reservation.id },
        data: {
          status: "CONFIRMED"
        }
      });

      return { success: true };
    });
  }

  /**
   * Background cleaner untuk membersihkan hold yang sudah kedaluwarsa (>60 menit).
   */
  static async cleanupExpiredHolds() {
    const now = new Date();
    const expiredReservations = await db.roomReservation.findMany({
      where: {
        status: "HOLD",
        expiresAt: { lt: now }
      }
    });

    for (const res of expiredReservations) {
      try {
        await SlotManager.releaseSlots({
          roomId: res.roomId,
          bookingReferenceId: res.bookingReferenceId
        });
        console.log(`[SlotManager] Expired hold otomatis dilepas: ${res.bookingReferenceId} (${res.slotsCount} slot)`);
      } catch (err) {
        console.error(`[SlotManager] Gagal melepas expired hold ${res.id}:`, err);
      }
    }
  }
}
