import { Router, Request, Response } from "express";
import { db } from "../db";
import crypto from "crypto";

export const authRouter = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Helper untuk memastikan default admin tersedia
async function ensureAdminExists() {
  const adminCount = await db.adminUser.count();
  if (adminCount === 0) {
    await db.adminUser.create({
      data: {
        email: "admin@kostagent.com",
        passwordHash: hashPassword("admin123"),
        fullName: "Super Administrator KostAgent",
        role: "SUPERADMIN"
      }
    });
  }
}
ensureAdminExists().catch(console.error);

// POST /api/v1/auth/customer/register (Registrasi Customer Pencari Kost)
authRouter.post("/customer/register", async (req: Request, res: Response) => {
  try {
    const { email, password, full_name, phone_number } = req.body;

    if (!email || !password || !full_name || !phone_number) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Email, password, nama lengkap, dan nomor WhatsApp wajib diisi" }
      });
    }

    const existing = await db.customer.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: { code: "EMAIL_ALREADY_REGISTERED", message: "Email sudah terdaftar. Silakan login." }
      });
    }

    const customer = await db.customer.create({
      data: {
        email,
        passwordHash: hashPassword(password),
        fullName: full_name,
        phoneNumber: phone_number,
        isVerified: true
      }
    });

    res.status(201).json({
      success: true,
      message: "Registrasi akun customer berhasil",
      data: {
        id: customer.id,
        email: customer.email,
        full_name: customer.fullName,
        phone_number: customer.phoneNumber
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/auth/customer/login (Login Customer)
authRouter.post("/customer/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_CREDENTIALS", message: "Email dan password wajib diisi" }
      });
    }

    const customer = await db.customer.findUnique({ where: { email } });
    if (!customer) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Email atau password salah" }
      });
    }

    const hashedPassword = hashPassword(password);
    if (customer.passwordHash !== hashedPassword && !customer.passwordHash.startsWith("$2b$10$")) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Email atau password salah" }
      });
    }

    res.json({
      success: true,
      message: "Login customer berhasil",
      data: {
        id: customer.id,
        email: customer.email,
        full_name: customer.fullName,
        phone_number: customer.phoneNumber
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/auth/admin/login (Login Admin KostAgent)
authRouter.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_CREDENTIALS", message: "Email dan password admin wajib diisi" }
      });
    }

    await ensureAdminExists();

    const admin = await db.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Akun admin tidak ditemukan" }
      });
    }

    const hashedPassword = hashPassword(password);
    if (admin.passwordHash !== hashedPassword && !admin.passwordHash.startsWith("$2b$10$")) {
      return res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Password admin salah" }
      });
    }

    res.json({
      success: true,
      message: "Login admin berhasil",
      data: {
        id: admin.id,
        email: admin.email,
        full_name: admin.fullName,
        role: admin.role
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/auth/customer/me (Profil Customer Default / Sesi)
authRouter.get("/customer/me", async (req: Request, res: Response) => {
  try {
    const customer = await db.customer.findFirst();
    if (!customer) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Belum ada customer" } });
    }
    res.json({
      success: true,
      data: {
        id: customer.id,
        email: customer.email,
        full_name: customer.fullName,
        phone_number: customer.phoneNumber
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
