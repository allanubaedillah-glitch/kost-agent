import { Router, Request, Response } from "express";
import { db } from "../db";

export const tenantRouter = Router();

// GET /api/v1/tenants/property/:propertyId (Daftar seluruh penghuni kos)
tenantRouter.get("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { status } = req.query;

    const tenants = await db.tenant.findMany({
      where: {
        propertyId,
        status: status ? String(status) : undefined
      },
      include: {
        room: true,
        rentBills: {
          orderBy: { dueDate: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      data: tenants
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/tenants (Tambah Penghuni Baru - Offline/Walk-in)
tenantRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      property_id,
      room_id,
      full_name,
      phone_number,
      id_card_number,
      emergency_contact,
      start_date,
      due_date,
      monthly_rent
    } = req.body;

    if (!property_id || !room_id || !full_name || !phone_number || !start_date || !due_date || monthly_rent === undefined) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "Property ID, Kamar, Nama lengkap, No HP, Tanggal mulai, Tanggal jatuh tempo, dan Sewa bulanan wajib diisi"
        }
      });
    }

    // Periksa kapasitas kamar
    const room = await db.room.findUnique({ where: { id: room_id } });
    if (!room) {
      return res.status(404).json({
        success: false,
        error: { code: "ROOM_NOT_FOUND", message: "Kamar tidak ditemukan" }
      });
    }

    const availableSlots = room.totalCapacity - room.occupiedSlots - room.reservedSlots;
    if (availableSlots < 1) {
      return res.status(409).json({
        success: false,
        error: {
          code: "ROOM_FULL",
          message: `Kamar ${room.roomNumber} sudah penuh (Kapasitas: ${room.totalCapacity}, Terisi: ${room.occupiedSlots}, Hold: ${room.reservedSlots})`
        }
      });
    }

    // Jalankan transaksi: buat tenant, buat tagihan awal, dan update occupiedSlots kamar
    const result = await db.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          propertyId: property_id,
          roomId: room_id,
          fullName: full_name,
          phoneNumber: phone_number,
          idCardNumber: id_card_number || null,
          emergencyContact: emergency_contact || null,
          startDate: new Date(start_date),
          dueDate: new Date(due_date),
          monthlyRent: parseFloat(monthly_rent),
          status: "ACTIVE"
        }
      });

      // Update occupiedSlots di kamar
      await tx.room.update({
        where: { id: room_id },
        data: {
          occupiedSlots: { increment: 1 }
        }
      });

      // Otomatis buat tagihan periode pertama
      const billPeriod = new Date(start_date).toISOString().slice(0, 7); // "YYYY-MM"
      const bill = await tx.rentBill.create({
        data: {
          tenantId: tenant.id,
          billPeriod,
          dueDate: new Date(due_date),
          amount: parseFloat(monthly_rent),
          status: "UNPAID"
        }
      });

      return { tenant, bill };
    });

    res.status(201).json({
      success: true,
      message: `Penghuni baru berhasil didaftarkan di Kamar ${room.roomNumber}`,
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// PUT /api/v1/tenants/:id/checkout (Check-out Penghuni)
tenantRouter.put("/:id/checkout", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tenant = await db.tenant.findUnique({
      where: { id },
      include: { room: true }
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: "TENANT_NOT_FOUND", message: "Data penghuni tidak ditemukan" }
      });
    }

    if (tenant.status === "CHECKED_OUT") {
      return res.status(400).json({
        success: false,
        error: { code: "ALREADY_CHECKED_OUT", message: "Penghuni sudah berstatus check-out sebelumnya" }
      });
    }

    // Jalankan transaksi: ubah status tenant dan kurangi occupiedSlots kamar
    await db.$transaction(async (tx) => {
      await tx.tenant.update({
        where: { id },
        data: { status: "CHECKED_OUT" }
      });

      await tx.room.update({
        where: { id: tenant.roomId },
        data: {
          occupiedSlots: { decrement: 1 }
        }
      });
    });

    res.json({
      success: true,
      message: `Penghuni ${tenant.fullName} berhasil check-out dari Kamar ${tenant.room.roomNumber}`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
