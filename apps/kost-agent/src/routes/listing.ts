import { Router, Request, Response } from "express";
import { db } from "../db";

export const listingRouter = Router();

// GET /api/v1/listings (Katalog publik pencarian kos - KA-LST-001 s/d 003)
listingRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { city, gender, min_price, max_price, room_type, sort } = req.query;

    const whereClause: any = {
      partnershipStatus: "ACTIVE"
    };

    if (city && typeof city === "string") {
      whereClause.city = { contains: city };
    }

    if (gender && typeof gender === "string") {
      whereClause.genderType = gender;
    }

    // Ambil properti yang aktif
    let properties = await db.partnerProperty.findMany({
      where: whereClause,
      include: {
        rooms: {
          where: { status: "AVAILABLE" }
        }
      }
    });

    // Filter berdasarkan kamar dan rentang harga jika ada
    if (min_price || max_price || room_type) {
      properties = properties.filter((p) =>
        p.rooms.some((r) => {
          let match = true;
          if (min_price && r.monthlyPrice < Number(min_price)) match = false;
          if (max_price && r.monthlyPrice > Number(max_price)) match = false;
          if (room_type && r.roomType !== room_type) match = false;
          return match;
        })
      );
    }

    // Sorting
    if (sort === "price_asc") {
      properties.sort((a, b) => {
        const minA = a.rooms.length > 0 ? Math.min(...a.rooms.map((r) => r.monthlyPrice)) : 0;
        const minB = b.rooms.length > 0 ? Math.min(...b.rooms.map((r) => r.monthlyPrice)) : 0;
        return minA - minB;
      });
    } else if (sort === "price_desc") {
      properties.sort((a, b) => {
        const maxA = a.rooms.length > 0 ? Math.max(...a.rooms.map((r) => r.monthlyPrice)) : 0;
        const maxB = b.rooms.length > 0 ? Math.max(...b.rooms.map((r) => r.monthlyPrice)) : 0;
        return maxB - maxA;
      });
    } else if (sort === "rating_desc") {
      properties.sort((a, b) => b.avgRating - a.avgRating);
    }

    res.json({
      success: true,
      data: properties.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        address: p.address,
        city: p.city,
        district: p.district,
        gender_type: p.genderType,
        photos: JSON.parse(p.photos),
        general_facilities: JSON.parse(p.generalFacilities),
        avg_rating: p.avgRating,
        total_reviews: p.totalReviews,
        lowest_price: p.rooms.length > 0 ? Math.min(...p.rooms.map((r) => r.monthlyPrice)) : 0,
        total_rooms_available: p.rooms.length
      }))
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// GET /api/v1/listings/rooms/:roomId (Detail kamar spesifik beserta informasi propertinya)
listingRouter.get("/rooms/:roomId", async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await db.partnerRoom.findUnique({
      where: { id: roomId },
      include: {
        partnerProperty: true
      }
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        error: { code: "ROOM_NOT_FOUND", message: "Kamar tidak ditemukan" }
      });
    }

    res.json({
      success: true,
      data: {
        ...room,
        facilities: JSON.parse(room.facilities || "[]"),
        photos: JSON.parse(room.photos || "[]"),
        available_slots: Math.max(0, room.totalCapacity - room.occupiedSlots - room.reservedSlots),
        partnerProperty: {
          ...room.partnerProperty,
          generalFacilities: JSON.parse(room.partnerProperty.generalFacilities || "[]"),
          photos: JSON.parse(room.partnerProperty.photos || "[]"),
          requirementsSchema: JSON.parse(room.partnerProperty.requirementsSchema || "{}")
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/listings/:id (Detail kos lengkap untuk customer - KA-LST-004 s/d 006)
listingRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const property = await db.partnerProperty.findUnique({
      where: { id },
      include: {
        rooms: true,
        reviews: {
          where: { isPublished: true },
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            customer: { select: { fullName: true } }
          }
        }
      }
    });

    if (!property || property.partnershipStatus !== "ACTIVE") {
      return res.status(404).json({
        success: false,
        error: { code: "LISTING_NOT_FOUND", message: "Listing kos tidak ditemukan atau belum aktif" }
      });
    }

    res.json({
      success: true,
      data: {
        id: property.id,
        name: property.name,
        slug: property.slug,
        address: property.address,
        city: property.city,
        district: property.district,
        description: property.description,
        gender_type: property.genderType,
        owner_whatsapp: property.ownerWhatsapp,
        photos: JSON.parse(property.photos),
        general_facilities: JSON.parse(property.generalFacilities),
        terms_and_rules: property.termsAndRules,
        requirements_schema: JSON.parse(property.requirementsSchema),
        payment_info: {
          bank_name: property.paymentBankName,
          account_number: property.paymentAccountNumber,
          account_holder: property.paymentAccountHolder,
          qris_url: property.paymentQrisUrl
        },
        avg_rating: property.avgRating,
        total_reviews: property.totalReviews,
        last_synced_at: property.lastSyncedAt,
        rooms: property.rooms.map((r) => ({
          id: r.id,
          room_number: r.roomNumber,
          room_type: r.roomType,
          size_sqm: r.sizeSqm,
          facilities: JSON.parse(r.facilities),
          photos: JSON.parse(r.photos),
          monthly_price: r.monthlyPrice,
          total_capacity: r.totalCapacity,
          available_slots: Math.max(0, r.totalCapacity - r.occupiedSlots - r.reservedSlots),
          status: r.status
        })),
        recent_reviews: property.reviews.map((rev) => ({
          id: rev.id,
          rating: rev.rating,
          review_text: rev.reviewText,
          customer_masked_name: rev.customer.fullName.replace(/(?<=.{2}).(?=.*@|.{2})/g, "*"),
          created_at: rev.createdAt
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
