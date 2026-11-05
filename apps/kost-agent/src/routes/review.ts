import { Router, Request, Response } from "express";
import { db } from "../db";
import { z } from "zod";

export const reviewRouter = Router();

const createReviewSchema = z.object({
  customer_id: z.string().uuid(),
  booking_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().min(5).max(1000)
});

// POST /api/v1/reviews (Customer memberi ulasan & rating - ADR-006)
reviewRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validation = createReviewSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST",
          message: "Data ulasan tidak valid (rating 1-5, teks minimal 5 karakter)",
          details: validation.error.errors
        }
      });
    }

    const { customer_id, booking_id, rating, review_text } = validation.data;

    // 1. Ambil data booking
    const booking = await db.booking.findUnique({
      where: { id: booking_id }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Data booking tidak ditemukan" }
      });
    }

    // 2. Otorisasi pemilik booking
    if (booking.customerId !== customer_id) {
      return res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Anda hanya dapat mengulas pemesanan milik sendiri" }
      });
    }

    // 3. Validasi Kelayakan Ulasan (ADR-006): Status wajib ACCEPTED, CHECKED_IN, atau COMPLETED
    const allowedStatuses = ["ACCEPTED", "CHECKED_IN", "COMPLETED"];
    if (!allowedStatuses.includes(booking.status)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "NOT_ELIGIBLE_FOR_REVIEW",
          message: `Ulasan hanya dapat diberikan untuk booking yang berstatus ACCEPTED, CHECKED IN, atau COMPLETED (status saat ini: ${booking.status})`
        }
      });
    }

    // 4. Validasi satu review per booking ID (ADR-006)
    const existingReview = await db.review.findUnique({
      where: { bookingId: booking_id }
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        error: { code: "REVIEW_ALREADY_EXISTS", message: "Anda sudah pernah memberikan ulasan untuk booking ini" }
      });
    }

    // 5. Simpan review
    const review = await db.review.create({
      data: {
        bookingId: booking.id,
        customerId: customer_id,
        partnerPropertyId: booking.partnerPropertyId,
        rating,
        reviewText: review_text,
        isPublished: true
      }
    });

    // 6. Rekalkulasi rata-rata rating properti secara otomatis
    const allReviews = await db.review.findMany({
      where: { partnerPropertyId: booking.partnerPropertyId, isPublished: true },
      select: { rating: true }
    });

    const totalReviews = allReviews.length;
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    await db.partnerProperty.update({
      where: { id: booking.partnerPropertyId },
      data: {
        avgRating: Number(avgRating.toFixed(2)),
        totalReviews
      }
    });

    res.status(201).json({
      success: true,
      message: "Ulasan dan rating berhasil dikirim",
      data: review
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
