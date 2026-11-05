import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { propertyRouter } from "./routes/property";
import { roomRouter } from "./routes/room";
import { tenantRouter } from "./routes/tenant";
import { billRouter } from "./routes/bill";
import { notesRouter } from "./routes/notes";
import { partnershipRouter } from "./routes/partnership";
import { bookingRouter } from "./routes/booking";
import { SlotManager } from "./services/slot-manager";

dotenv.config();

const app = express();
const PORT = process.env.KM_PORT || 4000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:4000"],
  credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    service: "Kost Management (UbaedillahProject)",
    version: "1.1.0",
    timestamp: new Date().toISOString()
  });
});

// Daftarkan Seluruh Router Modul Operasional & Integrasi
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/tenants", tenantRouter);
app.use("/api/v1/bills", billRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/partnerships", partnershipRouter);
app.use("/api/v1/bookings", bookingRouter);

// Cron endpoint for Vercel Cron Jobs
app.get("/api/v1/cron/cleanup-holds", async (req: Request, res: Response) => {
  try {
    await SlotManager.cleanupExpiredHolds();
    res.json({ success: true, message: "Expired holds cleaned up successfully", timestamp: new Date().toISOString() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Background timer: Periksa & rilis hold kedaluwarsa setiap 60 detik (hanya saat standalone dev/server)
let holdCleanerInterval: NodeJS.Timeout | null = null;
if (!process.env.VERCEL) {
  holdCleanerInterval = setInterval(async () => {
    try {
      await SlotManager.cleanupExpiredHolds();
    } catch (err) {
      console.error("[CleanupWorker] Error membersihkan expired holds:", err);
    }
  }, 60000);
}

export const server = !process.env.VERCEL
  ? app.listen(PORT, () => {
      console.log(`[Kost Management] Server running on port ${PORT}`);
    })
  : null;

export { holdCleanerInterval };
export default app;
