import { Router, Request, Response } from "express";
import { SlotManager } from "../services/slot-manager";
import { db } from "../db";
import { z } from "zod";

export const roomRouter = Router();

// GET /api/v1/rooms/property/:propertyId (Daftar seluruh kamar untuk properti)
roomRouter.get("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const rooms = await db.room.findMany({
      where: { propertyId },
      include: {
        tenants: {
          where: { status: "ACTIVE" }
        }
      },
      orderBy: { roomNumber: "asc" }
    });

    res.json({
      success: true,
      data: rooms.map((r) => ({
        ...r,
        facilities: JSON.parse(r.facilities || "[]"),
        photos: JSON.parse(r.photos || "[]"),
        availableSlots: Math.max(0, r.totalCapacity - r.occupiedSlots - r.reservedSlots)
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/rooms (Tambah Kamar Baru)
roomRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      property_id,
      room_number,
      room_type,
      size_sqm,
      facilities,
      photos,
      monthly_price,
      total_capacity,
      status
    } = req.body;

    if (!property_id || !room_number || monthly_price === undefined || !total_capacity) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Property ID, Nomor kamar, harga bulanan, dan kapasitas wajib diisi" }
      });
    }

    // Cek duplikasi nomor kamar dalam properti yang sama
    const existing = await db.room.findUnique({
      where: {
        propertyId_roomNumber: {
          propertyId: property_id,
          roomNumber: room_number
        }
      }
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: "ROOM_NUMBER_EXISTS", message: `Nomor kamar ${room_number} sudah ada di properti ini` }
      });
    }

    const room = await db.room.create({
      data: {
        propertyId: property_id,
        roomNumber: room_number,
        roomType: room_type || "PRIVATE",
        sizeSqm: size_sqm ? parseFloat(size_sqm) : null,
        facilities: JSON.stringify(Array.isArray(facilities) ? facilities : ["AC", "Kamar Mandi Dalam"]),
        photos: JSON.stringify(Array.isArray(photos) ? photos : ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"]),
        monthlyPrice: parseFloat(monthly_price),
        totalCapacity: parseInt(total_capacity),
        occupiedSlots: 0,
        reservedSlots: 0,
        status: status || "AVAILABLE"
      }
    });

    res.status(201).json({
      success: true,
      message: "Kamar baru berhasil ditambahkan",
      data: {
        ...room,
        facilities: JSON.parse(room.facilities),
        photos: JSON.parse(room.photos),
        availableSlots: room.totalCapacity
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// PUT /api/v1/rooms/:id (Edit Kamar)
roomRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      room_number,
      room_type,
      size_sqm,
      facilities,
      photos,
      monthly_price,
      total_capacity,
      status
    } = req.body;

    const existing = await db.room.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "ROOM_NOT_FOUND", message: "Kamar tidak ditemukan" }
      });
    }

    const updated = await db.room.update({
      where: { id },
      data: {
        roomNumber: room_number !== undefined ? room_number : undefined,
        roomType: room_type !== undefined ? room_type : undefined,
        sizeSqm: size_sqm !== undefined ? parseFloat(size_sqm) : undefined,
        facilities: facilities !== undefined ? JSON.stringify(facilities) : undefined,
        photos: photos !== undefined ? JSON.stringify(photos) : undefined,
        monthlyPrice: monthly_price !== undefined ? parseFloat(monthly_price) : undefined,
        totalCapacity: total_capacity !== undefined ? parseInt(total_capacity) : undefined,
        status: status !== undefined ? status : undefined
      }
    });

    res.json({
      success: true,
      message: "Data kamar berhasil diperbarui",
      data: {
        ...updated,
        facilities: JSON.parse(updated.facilities),
        photos: JSON.parse(updated.photos),
        availableSlots: updated.totalCapacity - updated.occupiedSlots - updated.reservedSlots
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// DELETE /api/v1/rooms/:id (Hapus Kamar)
roomRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await db.room.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "ROOM_NOT_FOUND", message: "Kamar tidak ditemukan" }
      });
    }

    if (existing.occupiedSlots > 0 || existing.reservedSlots > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: "ROOM_OCCUPIED",
          message: "Kamar tidak dapat dihapus karena masih memiliki penghuni aktif atau hold reservasi"
        }
      });
    }

    await db.room.delete({ where: { id } });

    res.json({
      success: true,
      message: "Kamar berhasil dihapus"
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// Schema validasi hold
const holdSlotsSchema = z.object({
  booking_reference_id: z.string().min(1),
  slots_count: z.number().int().positive(),
  idempotency_key: z.string().optional()
});

// POST /api/v1/rooms/:id/hold-slots (API-KM-02)
roomRouter.post("/:id/hold-slots", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const validation = holdSlotsSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST_BODY",
          message: "Data request hold slot tidak valid",
          details: validation.error.errors
        }
      });
    }

    const { booking_reference_id, slots_count, idempotency_key } = validation.data;

    const result = await SlotManager.holdSlots({
      roomId,
      bookingReferenceId: booking_reference_id,
      slotsCount: slots_count,
      idempotencyKey: idempotency_key
    });

    res.json({
      success: true,
      message: result.isDuplicate
        ? "Reservasi sudah pernah dibuat (Idempotent)"
        : "Slot berhasil ditahan sementara selama 60 menit",
      data: {
        reservation_id: result.reservation.id,
        room_id: result.reservation.roomId,
        slots_held: result.reservation.slotsCount,
        expires_at: result.reservation.expiresAt,
        remaining_available_slots: result.remainingSlots
      }
    });
  } catch (err: any) {
    if (err.message === "INSUFFICIENT_CAPACITY") {
      return res.status(409).json({
        success: false,
        error: {
          code: "INSUFFICIENT_CAPACITY",
          message: "Slot kamar tidak mencukupi untuk memenuhi seluruh permintaan pemesanan (Fail All)"
        }
      });
    }

    if (err.message === "ROOM_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        error: { code: "ROOM_NOT_FOUND", message: "Kamar tidak ditemukan" }
      });
    }

    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

const releaseSlotsSchema = z.object({
  booking_reference_id: z.string().min(1),
  reason: z.string().optional()
});

// POST /api/v1/rooms/:id/release-slots (API-KM-03)
roomRouter.post("/:id/release-slots", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const validation = releaseSlotsSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST_BODY",
          message: "Data request release slot tidak valid"
        }
      });
    }

    const { booking_reference_id } = validation.data;

    const result = await SlotManager.releaseSlots({
      roomId,
      bookingReferenceId: booking_reference_id
    });

    if (!result.success) {
      return res.status(404).json({
        success: false,
        error: { code: "NO_ACTIVE_HOLD_FOUND", message: "Tidak ada hold aktif untuk booking tersebut" }
      });
    }

    res.json({
      success: true,
      message: "Slot kamar berhasil dilepaskan kembali ke publik",
      data: {
        room_id: roomId,
        released_slots: result.releasedSlots
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
