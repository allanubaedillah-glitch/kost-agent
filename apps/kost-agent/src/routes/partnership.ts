import { Router, Request, Response } from "express";
import { db } from "../db";

export const partnershipRouter = Router();

// POST /api/v1/partnerships/apply (Menerima pengajuan kemitraan dari Kost Management - ADR-011)
partnershipRouter.post("/apply", async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    if (!data) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_PAYLOAD", message: "Payload pengajuan tidak valid" }
      });
    }

    const {
      km_property_id,
      owner_name,
      owner_phone,
      owner_whatsapp,
      name,
      slug,
      address,
      city,
      district,
      latitude,
      longitude,
      description,
      gender_type,
      general_facilities,
      photos,
      requirements_schema,
      payment_bank_name,
      payment_account_number,
      payment_account_holder,
      payment_qris_url,
      rooms
    } = data;

    // Simpan atau update partner property
    const property = await db.partnerProperty.upsert({
      where: { kmPropertyId: km_property_id },
      create: {
        kmPropertyId: km_property_id,
        ownerName: owner_name,
        ownerPhone: owner_phone,
        ownerWhatsapp: owner_whatsapp,
        name,
        slug,
        address,
        city,
        district,
        latitude,
        longitude,
        description,
        genderType: gender_type || "MIXED",
        generalFacilities: general_facilities,
        photos,
        requirementsSchema: requirements_schema,
        paymentBankName: payment_bank_name,
        paymentAccountNumber: payment_account_number,
        paymentAccountHolder: payment_account_holder,
        paymentQrisUrl: payment_qris_url,
        partnershipStatus: "WAITING_REVIEW",
        lastSyncedAt: new Date()
      },
      update: {
        ownerName: owner_name,
        ownerPhone: owner_phone,
        ownerWhatsapp: owner_whatsapp,
        name,
        address,
        city,
        district,
        description,
        genderType: gender_type || "MIXED",
        generalFacilities: general_facilities,
        photos,
        requirementsSchema: requirements_schema,
        paymentBankName: payment_bank_name,
        paymentAccountNumber: payment_account_number,
        paymentAccountHolder: payment_account_holder,
        paymentQrisUrl: payment_qris_url,
        partnershipStatus: "WAITING_REVIEW",
        lastSyncedAt: new Date()
      }
    });

    // Simpan atau update partner rooms
    if (Array.isArray(rooms)) {
      for (const r of rooms) {
        await db.partnerRoom.upsert({
          where: { kmRoomId: r.km_room_id },
          create: {
            kmRoomId: r.km_room_id,
            partnerPropertyId: property.id,
            roomNumber: r.room_number,
            roomType: r.room_type,
            sizeSqm: r.size_sqm,
            facilities: r.facilities,
            photos: r.photos,
            monthlyPrice: r.monthly_price,
            totalCapacity: r.total_capacity,
            occupiedSlots: r.occupied_slots,
            reservedSlots: r.reserved_slots,
            status: r.status,
            lastSyncedAt: new Date()
          },
          update: {
            roomNumber: r.room_number,
            roomType: r.room_type,
            sizeSqm: r.size_sqm,
            facilities: r.facilities,
            photos: r.photos,
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

    res.json({
      success: true,
      message: "Data pengajuan kos berhasil diterima dan masuk antrean verifikasi Admin KostAgent",
      data: { property_id: property.id, status: property.partnershipStatus }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/partnerships/:id/decision (Admin KostAgent APPROVE / REJECT listing - UC-ADM-01)
partnershipRouter.post("/:id/decision", async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const { decision, rejection_reason } = req.body; // decision: "ACTIVE" | "REJECTED"

    const property = await db.partnerProperty.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: { code: "PROPERTY_NOT_FOUND", message: "Listing kos tidak ditemukan" }
      });
    }

    const updated = await db.partnerProperty.update({
      where: { id: propertyId },
      data: {
        partnershipStatus: decision === "APPROVE" ? "ACTIVE" : "REJECTED",
        rejectionReason: decision === "APPROVE" ? null : rejection_reason || "Tidak memenuhi ketentuan"
      }
    });

    // Beri tahu Kost Management melalui webhook balik
    try {
      const kmUrl = process.env.KOST_MANAGEMENT_API_URL || "http://localhost:4000/api/v1";
      await fetch(`${kmUrl}/partnerships/decision-webhook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          km_property_id: property.kmPropertyId,
          status: updated.partnershipStatus,
          rejection_reason: updated.rejectionReason
        })
      });
    } catch (e) {
      console.warn("[PartnershipRouter] Gagal mengirim webhook balik ke KM:", e);
    }

    res.json({
      success: true,
      message: `Listing kos berhasil ${decision === "APPROVE" ? "disetujui dan aktif tayang" : "ditolak"}`,
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
