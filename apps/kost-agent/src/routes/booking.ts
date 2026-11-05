import { Router, Request, Response } from "express";
import { db } from "../db";
import { KostManagementClient } from "../services/km-client";
import { z } from "zod";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

import os from "os";
import { StorageService } from "../services/storage";

export const bookingRouter = Router();

// Konfigurasi Multer (Mendukung Vercel Serverless /tmp & Local public/uploads)
const isVercel = !!process.env.VERCEL;
const uploadDir = isVercel ? os.tmpdir() : path.resolve(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  try { fs.mkdirSync(uploadDir, { recursive: true }); } catch (e) {}
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".png";
    cb(null, `receipt-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// POST /api/v1/bookings/upload-receipt (Upload File Bukti Transfer via Multer / Supabase Storage)
bookingRouter.post("/upload-receipt", upload.single("receipt"), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: { code: "NO_FILE", message: "File gambar bukti transfer belum dipilih" }
    });
  }

  try {
    const fileUrl = await StorageService.uploadReceipt(req.file);
    res.json({
      success: true,
      message: "Bukti transfer berhasil diunggah",
      data: {
        url: fileUrl,
        filename: req.file.filename || req.file.originalname,
        size: req.file.size
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "UPLOAD_ERROR", message: err.message }
    });
  }
});

const createBookingSchema = z.object({
  customer_id: z.string().uuid(),
  partner_property_id: z.string().uuid(),
  partner_room_id: z.string().uuid(),
  slots_count: z.number().int().positive(),
  duration_months: z.number().int().min(1),
  start_date: z.string(), // ISO Date string
  occupants: z.array(
    z.object({
      name: z.string().min(1),
      phone: z.string().min(8),
      id_card_number: z.string().optional(),
      emergency_contact: z.string().optional(),
      custom_answers: z.record(z.any()).optional()
    })
  ),
  idempotency_key: z.string().min(1)
});

// POST /api/v1/bookings (Inisiasi booking dinamis & hold kuota - KA-BKG-001 s/d 007, ADR-004, ADR-008)
bookingRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validation = createBookingSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_REQUEST_BODY",
          message: "Data pemesanan tidak lengkap atau tidak valid",
          details: validation.error.errors
        }
      });
    }

    const {
      customer_id,
      partner_property_id,
      partner_room_id,
      slots_count,
      duration_months,
      start_date,
      occupants,
      idempotency_key
    } = validation.data;

    // 1. Cek idempotency key
    const existingBooking = await db.booking.findUnique({
      where: { idempotencyKey: idempotency_key },
      include: { partnerProperty: true, partnerRoom: true }
    });

    if (existingBooking) {
      return res.json({
        success: true,
        message: "Pemesanan sudah ada (Idempotent response)",
        data: existingBooking
      });
    }

    // 2. Validasi jumlah data penghuni wajib sama dengan slot yang dipesan (CAP-05)
    if (occupants.length !== slots_count) {
      return res.status(400).json({
        success: false,
        error: {
          code: "OCCUPANTS_COUNT_MISMATCH",
          message: `Jumlah data penghuni (${occupants.length}) harus sama persis dengan jumlah slot yang dipesan (${slots_count})`
        }
      });
    }

    // 3. Ambil data kamar dan properti lokal
    const room = await db.partnerRoom.findUnique({
      where: { id: partner_room_id },
      include: { partnerProperty: true }
    });

    if (!room || room.partnerPropertyId !== partner_property_id) {
      return res.status(404).json({
        success: false,
        error: { code: "ROOM_NOT_FOUND", message: "Kamar atau properti tidak ditemukan" }
      });
    }

    // 4. Hitung tanggal selesai
    const startDateObj = new Date(start_date);
    const endDateObj = new Date(startDateObj);
    endDateObj.setMonth(endDateObj.getMonth() + duration_months);

    // 5. Hitung total nominal sewa (ADR-004): Harga per Slot * Jumlah Slot * Durasi Bulan
    const pricePerSlot = room.monthlyPrice;
    const totalAmount = pricePerSlot * slots_count * duration_months;

    // 6. Generate kode booking unik
    const datePrefix = new Date().toISOString().slice(0, 7).replace("-", "");
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    const bookingCode = `KA-${datePrefix}-${randomHex}`;

    // 7. Panggil Kost Management untuk REAL-TIME HOLD 60 MENIT (ADR-008, CAP-06 Atomic Fail All)
    try {
      await KostManagementClient.holdSlots({
        kmRoomId: room.kmRoomId,
        bookingReferenceId: bookingCode,
        slotsCount: slots_count,
        idempotencyKey: idempotency_key
      });
    } catch (err: any) {
      if (err.code === "INSUFFICIENT_CAPACITY" || err.message.includes("Slot kamar tidak mencukupi")) {
        return res.status(409).json({
          success: false,
          error: {
            code: "INSUFFICIENT_CAPACITY",
            message: "Slot kamar tidak mencukupi untuk memenuhi seluruh pemesanan (Fail All)"
          }
        });
      }
      throw err;
    }

    // 8. Simpan booking di database KostAgent
    const paymentDeadline = new Date(Date.now() + 60 * 60 * 1000); // 60 menit (ADR-000)

    const booking = await db.booking.create({
      data: {
        bookingCode,
        customerId: customer_id,
        partnerPropertyId: partner_property_id,
        partnerRoomId: partner_room_id,
        slotsCount: slots_count,
        durationMonths: duration_months,
        startDate: startDateObj,
        endDate: endDateObj,
        pricePerSlot,
        totalAmount,
        occupantsData: JSON.stringify(occupants),
        status: "PENDING_PAYMENT",
        paymentDeadline,
        idempotencyKey: idempotency_key
      },
      include: {
        partnerProperty: true,
        partnerRoom: true
      }
    });

    res.status(201).json({
      success: true,
      message: "Pemesanan berhasil dibuat, slot kamar terkunci selama 60 menit",
      data: {
        booking_id: booking.id,
        booking_code: booking.bookingCode,
        status: booking.status,
        total_amount: booking.totalAmount,
        payment_deadline: booking.paymentDeadline,
        payment_instructions: {
          bank_name: room.partnerProperty.paymentBankName,
          account_number: room.partnerProperty.paymentAccountNumber,
          account_holder: room.partnerProperty.paymentAccountHolder,
          qris_url: room.partnerProperty.paymentQrisUrl
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/:id/cancel (Pembatalan mandiri pre-payment - ADR-001)
bookingRouter.post("/:id/cancel", async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;

    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: { partnerRoom: true }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Data booking tidak ditemukan" }
      });
    }

    // Proteksi ADR-001: Hanya boleh membatalkan jika status masih PENDING_PAYMENT
    if (booking.status !== "PENDING_PAYMENT") {
      return res.status(400).json({
        success: false,
        error: {
          code: "CANCEL_FORBIDDEN",
          message: "Pembatalan mandiri hanya diperbolehkan pada status PENDING PAYMENT"
        }
      });
    }

    // 1. Rilis slot hold di Kost Management
    await KostManagementClient.releaseSlots({
      kmRoomId: booking.partnerRoom.kmRoomId,
      bookingReferenceId: booking.bookingCode,
      reason: "CUSTOMER_CANCELLED"
    });

    // 2. Update status booking di KostAgent
    await db.booking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLED",
        cancellationReason: "Dibatalkan mandiri oleh calon penghuni"
      }
    });

    res.json({
      success: true,
      message: "Pemesanan berhasil dibatalkan dan slot kamar telah dilepaskan kembali"
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/:id/payment (Upload bukti bayar direct-to-owner - KA-PAY-004 s/d 007)
bookingRouter.post("/:id/payment", async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const { receipt_url, sender_bank, sender_holder, notes } = req.body;

    if (!receipt_url) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_RECEIPT", message: "Tautan bukti pembayaran (receipt_url) wajib disertakan" }
      });
    }

    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        customer: true,
        partnerProperty: true,
        partnerRoom: true
      }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Data booking tidak ditemukan" }
      });
    }

    if (booking.status !== "PENDING_PAYMENT") {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_STATUS",
          message: `Pembayaran tidak dapat diunggah pada status ${booking.status}`
        }
      });
    }

    // Cek apakah timer 60 menit sudah kedaluwarsa
    if (new Date() > booking.paymentDeadline) {
      await db.booking.update({
        where: { id: bookingId },
        data: { status: "EXPIRED" }
      });
      return res.status(400).json({
        success: false,
        error: {
          code: "PAYMENT_TIMEOUT_EXPIRED",
          message: "Batas waktu pembayaran 60 menit telah kedaluwarsa"
        }
      });
    }

    // 1. Simpan bukti transfer
    await db.paymentSubmission.create({
      data: {
        bookingId,
        transferReceiptUrl: receipt_url,
        senderBankName: sender_bank,
        senderAccountHolder: sender_holder,
        submissionNotes: notes
      }
    });

    // 2. Update status booking menjadi PAYMENT_SUBMITTED (kunci tombol batal, aktifkan SLA 24 jam)
    const verificationDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const updatedBooking = await db.booking.update({
      where: { id: bookingId },
      data: {
        status: "PAYMENT_SUBMITTED",
        verificationDeadline
      }
    });

    // 3. Teruskan pemesanan dan bukti transfer ke Kost Management via API (API-KM-04)
    await KostManagementClient.sendInboundBooking({
      kostagent_booking_id: booking.bookingCode,
      property_id: booking.partnerProperty.kmPropertyId,
      room_id: booking.partnerRoom.kmRoomId,
      customer: {
        name: booking.customer.fullName,
        email: booking.customer.email,
        phone: booking.customer.phoneNumber
      },
      booking_details: {
        slots_count: booking.slotsCount,
        duration_months: booking.durationMonths,
        start_date: booking.startDate.toISOString().slice(0, 10),
        end_date: booking.endDate.toISOString().slice(0, 10),
        total_amount: booking.totalAmount
      },
      occupants: JSON.parse(booking.occupantsData),
      payment_proof: {
        receipt_url,
        sender_bank: sender_bank || "Bank Transfer",
        sender_holder: sender_holder || booking.customer.fullName,
        submitted_at: new Date().toISOString()
      }
    });

    res.json({
      success: true,
      message: "Bukti pembayaran berhasil diunggah. Mohon menunggu verifikasi pemilik maksimal 1x24 jam",
      data: {
        booking_code: updatedBooking.bookingCode,
        status: updatedBooking.status,
        verification_deadline: updatedBooking.verificationDeadline
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// POST /api/v1/bookings/:id/refund-account (Customer input rekening refund saat REJECTED - ADR-012)
bookingRouter.post("/:id/refund-account", async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const { bank_name, account_number, account_holder } = req.body;

    const booking = await db.booking.findUnique({ where: { id: bookingId } });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Booking tidak ditemukan" }
      });
    }

    if (booking.status !== "REJECTED") {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_STATUS",
          message: "Input rekening refund hanya berlaku untuk pemesanan yang berstatus REJECTED"
        }
      });
    }

    // 1. Catat rekening refund lokal
    await db.refundRequest.create({
      data: {
        bookingId,
        bankName: bank_name,
        accountNumber: account_number,
        accountHolder: account_holder,
        refundAmount: booking.totalAmount,
        status: "PENDING"
      }
    });

    // 2. Teruskan data rekening refund ke Kost Management via API (API-KM-05)
    await KostManagementClient.sendRefundAccount(booking.bookingCode, {
      bank_name,
      account_number,
      account_holder,
      refund_amount: booking.totalAmount,
      reason: "OWNER_REJECTED"
    });

    res.json({
      success: true,
      message: "Data rekening refund berhasil dicatat dan diteruskan ke pemilik kos untuk ditransfer manual"
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});

// GET /api/v1/bookings/customer/:customerId (Riwayat pesanan milik customer)
bookingRouter.get("/customer/:customerId", async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;

    const bookings = await db.booking.findMany({
      where: { customerId },
      include: {
        partnerProperty: true,
        partnerRoom: true,
        paymentSubmission: true,
        refundRequest: true,
        review: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      data: bookings.map((b) => ({
        ...b,
        occupantsData: JSON.parse(b.occupantsData || "[]")
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/bookings/:id (Melihat detail status booking)
bookingRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        partnerProperty: true,
        partnerRoom: true,
        paymentSubmission: true,
        refundRequest: true,
        review: true
      }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: { code: "BOOKING_NOT_FOUND", message: "Booking tidak ditemukan" }
      });
    }

    res.json({
      success: true,
      data: {
        ...booking,
        occupantsData: JSON.parse(booking.occupantsData)
      }
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: err.message }
    });
  }
});
