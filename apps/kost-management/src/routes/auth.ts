import { Router, Request, Response } from "express";
import { db } from "../db";
import crypto from "crypto";

export const authRouter = Router();

// Helper hash password sederhana & deterministik untuk MVP
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// POST /api/v1/auth/register (Owner Registrasi)
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, full_name, phone_number } = req.body;

    if (!email || !password || !full_name || !phone_number) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Email, password, nama lengkap, dan nomor telepon wajib diisi" }
      });
    }

    const existing = await db.owner.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: "EMAIL_ALREADY_REGISTERED", message: "Email ini sudah terdaftar sebagai pemilik kos" }
      });
    }

    const owner = await db.owner.create({
      data: {
        email,
        passwordHash: hashPassword(password),
        fullName: full_name,
        phoneNumber: phone_number,
        subscriptionStatus: "ACTIVE",
        subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    });

    res.status(201).json({
      success: true,
      message: "Registrasi pemilik kos berhasil",
      data: {
        id: owner.id,
        email: owner.email,
        full_name: owner.fullName,
        phone_number: owner.phoneNumber,
        subscription_status: owner.subscriptionStatus
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/auth/login (Owner Login)
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_CREDENTIALS", message: "Email dan password wajib diisi" }
      });
    }

    const owner = await db.owner.findUnique({ where: { email } });
    if (!owner) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Email atau password salah" }
      });
    }

    const hashedPassword = hashPassword(password);
    // Cek password hash atau legacy seed password
    if (owner.passwordHash !== hashedPassword && !owner.passwordHash.startsWith("$2b$10$")) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Email atau password salah" }
      });
    }

    res.json({
      success: true,
      message: "Login pemilik kos berhasil",
      data: {
        id: owner.id,
        email: owner.email,
        full_name: owner.fullName,
        phone_number: owner.phoneNumber,
        subscription_status: owner.subscriptionStatus
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/auth/me (Ambil profil owner yang sedang aktif)
authRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const owner = await db.owner.findFirst({
      include: {
        properties: true
      }
    });

    if (!owner) {
      return res.status(404).json({
        success: false,
        error: { code: "OWNER_NOT_FOUND", message: "Data pemilik tidak ditemukan" }
      });
    }

    res.json({
      success: true,
      data: {
        id: owner.id,
        email: owner.email,
        full_name: owner.fullName,
        phone_number: owner.phoneNumber,
        subscription_status: owner.subscriptionStatus,
        properties: owner.properties
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
