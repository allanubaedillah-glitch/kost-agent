import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
const BUCKET_NAME = process.env.SUPABASE_STORAGE_BUCKET || "receipts";

let supabase: any = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export class StorageService {
  /**
   * Upload file bukti pembayaran ke Supabase Storage Bucket ('receipts').
   * Jika kredensial Supabase tidak ada (mode offline/dev lokal), fallback ke local public/uploads.
   */
  static async uploadReceipt(file: Express.Multer.File): Promise<string> {
    // 1. Jika Supabase Storage aktif (Production Vercel + Supabase)
    if (supabase) {
      const ext = path.extname(file.originalname) || ".png";
      const fileName = `receipt-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      
      let fileBuffer: Buffer;
      if (file.buffer) {
        fileBuffer = file.buffer;
      } else if (file.path && fs.existsSync(file.path)) {
        fileBuffer = fs.readFileSync(file.path);
      } else {
        throw new Error("File buffer bukti transfer tidak ditemukan");
      }

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype || "image/png",
          upsert: true
        });

      if (error) {
        console.error("[StorageService] Gagal upload ke Supabase Storage:", error);
        throw new Error(`Gagal upload bukti bayar ke Supabase: ${error.message}`);
      }

      // Ambil Public URL dari Supabase Bucket
      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

      // Bersihkan file sementara jika ada
      if (file.path && fs.existsSync(file.path)) {
        try { fs.unlinkSync(file.path); } catch (e) {}
      }

      console.log(`[StorageService] Berhasil upload ke Supabase Bucket: ${publicUrlData.publicUrl}`);
      return publicUrlData.publicUrl;
    }

    // 2. Fallback: Local Uploads (Local Development)
    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/uploads/${file.filename}`;
  }
}
