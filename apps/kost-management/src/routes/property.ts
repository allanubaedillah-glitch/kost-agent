import { Router, Request, Response } from "express";
import { db } from "../db";

export const propertyRouter = Router();

// POST /api/v1/properties (Owner membuat properti baru)
propertyRouter.post("/", async (req: Request, res: Response) => {
  try {
    const {
      owner_id,
      name,
      address,
      city,
      district,
      description,
      gender_type,
      general_facilities,
      photos,
      contact_phone,
      whatsapp_number,
      payment_bank_name,
      payment_account_number,
      payment_account_holder,
      payment_qris_url,
      requirements
    } = req.body;

    if (!owner_id || !name || !address || !city) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Owner ID, nama kos, alamat, dan kota wajib diisi" }
      });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + "-" + Date.now().toString().slice(-4);

    const property = await db.property.create({
      data: {
        ownerId: owner_id,
        name,
        slug,
        address,
        city,
        district: district || city,
        description: description || "",
        genderType: gender_type || "MIXED",
        generalFacilities: JSON.stringify(Array.isArray(general_facilities) ? general_facilities : ["Wi-Fi", "Dapur Bersama"]),
        photos: JSON.stringify(Array.isArray(photos) ? photos : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]),
        contactPhone: contact_phone || "081234567890",
        whatsappNumber: whatsapp_number || contact_phone || "081234567890",
        requirementsSchema: JSON.stringify(requirements || {
          standard_presets: { ktp_required: true, kk_required: false, proof_of_employment: true, emergency_contact: true },
          custom_checkboxes: [],
          notes: ""
        }),
        paymentBankName: payment_bank_name || "BCA",
        paymentAccountNumber: payment_account_number || "1234567890",
        paymentAccountHolder: payment_account_holder || "PEMILIK KOS",
        paymentQrisUrl: payment_qris_url || null,
        partnershipStatus: "NONE"
      }
    });

    res.status(201).json({
      success: true,
      message: "Properti kos baru berhasil dibuat",
      data: {
        ...property,
        generalFacilities: JSON.parse(property.generalFacilities),
        photos: JSON.parse(property.photos),
        requirementsSchema: JSON.parse(property.requirementsSchema),
        rooms: []
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/properties/owner/:ownerId (Daftar properti milik owner)
propertyRouter.get("/owner/:ownerId", async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params;
    const properties = await db.property.findMany({
      where: { ownerId },
      include: {
        rooms: true,
        tenants: true,
        operationalNotes: true
      }
    });

    res.json({
      success: true,
      data: properties.map((p) => ({
        ...p,
        generalFacilities: JSON.parse(p.generalFacilities || "[]"),
        photos: JSON.parse(p.photos || "[]"),
        requirementsSchema: JSON.parse(p.requirementsSchema || "{}")
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/properties/:id/requirements (API-KM-01)
propertyRouter.get("/:id/requirements", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await db.property.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        requirementsSchema: true,
        partnershipStatus: true
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: { code: "PROPERTY_NOT_FOUND", message: "Properti kos tidak ditemukan" }
      });
    }

    const schema = JSON.parse(property.requirementsSchema);

    res.json({
      success: true,
      data: {
        property_id: property.id,
        property_name: property.name,
        requirements: schema
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// PUT /api/v1/properties/:id/requirements (Update dynamic booking requirements schema - ADR-009)
propertyRouter.put("/:id/requirements", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { requirements } = req.body;

    if (!requirements) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_DATA", message: "Data requirements wajib dikirimkan" }
      });
    }

    const updated = await db.property.update({
      where: { id },
      data: {
        requirementsSchema: JSON.stringify(requirements)
      }
    });

    res.json({
      success: true,
      message: "Ketentuan & persyaratan booking berhasil diperbarui",
      data: JSON.parse(updated.requirementsSchema)
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// PUT /api/v1/properties/:id/facilities (Update general facilities array)
propertyRouter.put("/:id/facilities", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { facilities } = req.body;

    if (!Array.isArray(facilities)) {
      return res.status(400).json({
        success: false,
        error: { code: "INVALID_FORMAT", message: "Fasilitas harus berupa array string" }
      });
    }

    const updated = await db.property.update({
      where: { id },
      data: {
        generalFacilities: JSON.stringify(facilities)
      }
    });

    res.json({
      success: true,
      message: "Fasilitas kos berhasil diperbarui",
      data: JSON.parse(updated.generalFacilities)
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// PUT /api/v1/properties/:id (Update data profil kos & bank info)
propertyRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      city,
      district,
      description,
      genderType,
      contactPhone,
      whatsappNumber,
      paymentBankName,
      paymentAccountNumber,
      paymentAccountHolder,
      paymentQrisUrl,
      photos
    } = req.body;

    const updated = await db.property.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        address: address !== undefined ? address : undefined,
        city: city !== undefined ? city : undefined,
        district: district !== undefined ? district : undefined,
        description: description !== undefined ? description : undefined,
        genderType: genderType !== undefined ? genderType : undefined,
        contactPhone: contactPhone !== undefined ? contactPhone : undefined,
        whatsappNumber: whatsappNumber !== undefined ? whatsappNumber : undefined,
        paymentBankName: paymentBankName !== undefined ? paymentBankName : undefined,
        paymentAccountNumber: paymentAccountNumber !== undefined ? paymentAccountNumber : undefined,
        paymentAccountHolder: paymentAccountHolder !== undefined ? paymentAccountHolder : undefined,
        paymentQrisUrl: paymentQrisUrl !== undefined ? paymentQrisUrl : undefined,
        photos: photos !== undefined ? (Array.isArray(photos) ? JSON.stringify(photos) : photos) : undefined
      }
    });

    res.json({
      success: true,
      message: "Profil properti kos berhasil diperbarui",
      data: {
        ...updated,
        generalFacilities: JSON.parse(updated.generalFacilities || "[]"),
        photos: JSON.parse(updated.photos || "[]"),
        requirementsSchema: JSON.parse(updated.requirementsSchema || "{}")
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/properties/:id (Detail properti dengan ketersediaan kamar)
propertyRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await db.property.findUnique({
      where: { id },
      include: {
        rooms: true,
        tenants: true,
        operationalNotes: true
      }
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: { code: "PROPERTY_NOT_FOUND", message: "Properti kos tidak ditemukan" }
      });
    }

    res.json({
      success: true,
      data: {
        ...property,
        generalFacilities: JSON.parse(property.generalFacilities || "[]"),
        photos: JSON.parse(property.photos || "[]"),
        requirementsSchema: JSON.parse(property.requirementsSchema || "{}"),
        rooms: property.rooms.map((r) => ({
          ...r,
          facilities: JSON.parse(r.facilities || "[]"),
          photos: JSON.parse(r.photos || "[]"),
          availableSlots: r.totalCapacity - r.occupiedSlots - r.reservedSlots
        }))
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
