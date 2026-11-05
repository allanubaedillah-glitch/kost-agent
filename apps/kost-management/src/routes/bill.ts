import { Router, Request, Response } from "express";
import { db } from "../db";

export const billRouter = Router();

// GET /api/v1/bills/property/:propertyId (Daftar tagihan sewa & tunggakan)
billRouter.get("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { status } = req.query;

    // Perbarui otomatis status UNPAID yang melewati dueDate menjadi OVERDUE
    const now = new Date();
    await db.rentBill.updateMany({
      where: {
        status: "UNPAID",
        dueDate: { lt: now }
      },
      data: { status: "OVERDUE" }
    });

    const bills = await db.rentBill.findMany({
      where: {
        tenant: {
          propertyId
        },
        status: status && status !== "ALL" ? String(status) : undefined
      },
      include: {
        tenant: {
          include: {
            room: true
          }
        }
      },
      orderBy: { dueDate: "asc" }
    });

    // Hitung ringkasan tunggakan
    const unpaidCount = bills.filter((b) => b.status === "UNPAID").length;
    const overdueCount = bills.filter((b) => b.status === "OVERDUE").length;
    const totalTunggakan = bills
      .filter((b) => b.status === "UNPAID" || b.status === "OVERDUE")
      .reduce((sum, b) => sum + b.amount, 0);

    res.json({
      success: true,
      summary: {
        unpaidCount,
        overdueCount,
        totalTunggakan
      },
      data: bills
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/bills (Buat Tagihan Sewa Baru)
billRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { tenant_id, bill_period, due_date, amount } = req.body;

    if (!tenant_id || !bill_period || !due_date || amount === undefined) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Tenant ID, Periode tagihan, Tanggal jatuh tempo, dan Jumlah wajib diisi" }
      });
    }

    const tenant = await db.tenant.findUnique({
      where: { id: tenant_id },
      include: { room: true }
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: "TENANT_NOT_FOUND", message: "Data penghuni tidak ditemukan" }
      });
    }

    const isOverdue = new Date(due_date) < new Date();

    const bill = await db.rentBill.create({
      data: {
        tenantId: tenant_id,
        billPeriod: bill_period,
        dueDate: new Date(due_date),
        amount: parseFloat(amount),
        status: isOverdue ? "OVERDUE" : "UNPAID"
      }
    });

    res.status(201).json({
      success: true,
      message: `Tagihan periode ${bill_period} untuk ${tenant.fullName} berhasil dibuat`,
      data: bill
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// PUT /api/v1/bills/:id/pay (Catat Pelunasan Tagihan)
billRouter.put("/:id/pay", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payment_notes } = req.body;

    const existing = await db.rentBill.findUnique({
      where: { id },
      include: {
        tenant: true
      }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "BILL_NOT_FOUND", message: "Tagihan tidak ditemukan" }
      });
    }

    if (existing.status === "PAID") {
      return res.status(400).json({
        success: false,
        error: { code: "ALREADY_PAID", message: "Tagihan ini sudah lunas sebelumnya" }
      });
    }

    const updated = await db.rentBill.update({
      where: { id },
      data: {
        status: "PAID",
        paidAt: new Date(),
        paymentNotes: payment_notes || "Pelunasan tunai/transfer dikonfirmasi owner"
      }
    });

    res.json({
      success: true,
      message: `Tagihan periode ${updated.billPeriod} penghuni ${existing.tenant.fullName} telah ditandai LUNAS`,
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
