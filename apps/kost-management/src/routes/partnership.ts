import { Router, Request, Response } from "express";
import { db } from "../db";
import { WebhookSender } from "../services/webhook";

export const partnershipRouter = Router();

// POST /api/v1/partnerships/apply (Owner mengajukan unit kos ke KostAgent - ADR-011)
partnershipRouter.post("/apply", async (req: Request, res: Response) => {
  try {
    const { property_id } = req.body;

    if (!property_id) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_PROPERTY_ID", message: "property_id wajib disertakan" }
      });
    }

    const property = await db.property.findUnique({
      where: { id: property_id },
      include: {
        owner: true,
        rooms: true
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: { code: "PROPERTY_NOT_FOUND", message: "Properti kos tidak ditemukan" }
      });
    }

    // 1. Update status properti di Kost Management menjadi WAITING_REVIEW
    await db.property.update({
      where: { id: property_id },
      data: {
        partnershipStatus: "WAITING_REVIEW",
        rejectionReason: null
      }
    });

    // 2. Kirim payload pengajuan kemitraan ke KostAgent API
    const webhookResult = await WebhookSender.sendEvent("/partnerships/apply", "PARTNERSHIP_APPLIED", {
      km_property_id: property.id,
      owner_name: property.owner.fullName,
      owner_phone: property.owner.phoneNumber,
      owner_whatsapp: property.whatsappNumber,
      name: property.name,
      slug: property.slug,
      address: property.address,
      city: property.city,
      district: property.district,
      latitude: property.latitude,
      longitude: property.longitude,
      description: property.description,
      gender_type: property.genderType,
      general_facilities: property.generalFacilities,
      photos: property.photos,
      requirements_schema: property.requirementsSchema,
      payment_bank_name: property.paymentBankName,
      payment_account_number: property.paymentAccountNumber,
      payment_account_holder: property.paymentAccountHolder,
      payment_qris_url: property.paymentQrisUrl,
      rooms: property.rooms.map((r) => ({
        km_room_id: r.id,
        room_number: r.roomNumber,
        room_type: r.roomType,
        size_sqm: r.sizeSqm,
        facilities: r.facilities,
        photos: r.photos,
        monthly_price: r.monthlyPrice,
        total_capacity: r.totalCapacity,
        occupied_slots: r.occupiedSlots,
        reserved_slots: r.reservedSlots,
        status: r.status
      }))
    });

    res.json({
      success: true,
      message: "Pengajuan kemitraan kos berhasil dikirimkan ke KostAgent untuk ditinjau Admin",
      data: {
        property_id: property.id,
        partnership_status: "WAITING_REVIEW",
        sync_result: webhookResult
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/partnerships/decision-webhook (Menerima status APPROVE/REJECT dari Admin KostAgent)
partnershipRouter.post("/decision-webhook", async (req: Request, res: Response) => {
  try {
    const { km_property_id, status, rejection_reason } = req.body;

    await db.property.update({
      where: { id: km_property_id },
      data: {
        partnershipStatus: status, // APPROVED / REJECTED
        rejectionReason: rejection_reason || null
      }
    });

    res.json({ success: true, message: `Status kemitraan kos diperbarui menjadi ${status}` });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
