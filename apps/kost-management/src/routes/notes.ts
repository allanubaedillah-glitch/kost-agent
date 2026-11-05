import { Router, Request, Response } from "express";
import { db } from "../db";

export const notesRouter = Router();

// GET /api/v1/notes/property/:propertyId (Daftar catatan operasional kos)
notesRouter.get("/property/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    const notes = await db.operationalNote.findMany({
      where: { propertyId },
      orderBy: [
        { isCompleted: "asc" },
        { createdAt: "desc" }
      ]
    });

    res.json({
      success: true,
      data: notes
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/notes (Tambah Catatan Operasional Baru)
notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { property_id, title, category, target_date } = req.body;

    if (!property_id || !title) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_FIELDS", message: "Property ID dan judul catatan wajib diisi" }
      });
    }

    const note = await db.operationalNote.create({
      data: {
        propertyId: property_id,
        title,
        category: category || "REMINDER",
        targetDate: target_date ? new Date(target_date) : null,
        isCompleted: false
      }
    });

    res.status(201).json({
      success: true,
      message: "Catatan operasional berhasil ditambahkan",
      data: note
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// PUT /api/v1/notes/:id/toggle (Tandai Catatan Selesai/Belum)
notesRouter.put("/:id/toggle", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await db.operationalNote.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: "NOTE_NOT_FOUND", message: "Catatan tidak ditemukan" }
      });
    }

    const updated = await db.operationalNote.update({
      where: { id },
      data: {
        isCompleted: !existing.isCompleted
      }
    });

    res.json({
      success: true,
      message: updated.isCompleted ? "Catatan ditandai selesai" : "Catatan diaktifkan kembali",
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// DELETE /api/v1/notes/:id (Hapus Catatan)
notesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.operationalNote.delete({ where: { id } });

    res.json({
      success: true,
      message: "Catatan operasional berhasil dihapus"
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
