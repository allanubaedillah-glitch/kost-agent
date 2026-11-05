import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { authRouter } from "./routes/auth";
import { adminRouter } from "./routes/admin";
import { listingRouter } from "./routes/listing";
import { bookingRouter } from "./routes/booking";
import { partnershipRouter } from "./routes/partnership";
import { webhookRouter } from "./routes/webhook";
import { reviewRouter } from "./routes/review";
import { testingRouter } from "./routes/testing";
import { SlaMonitor } from "./services/sla-monitor";

dotenv.config();

const app = express();
const PORT = process.env.KA_PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:4000"],
  credentials: true
}));
app.use(express.json());

// Sajikan folder uploads dan public secara statis untuk akses bukti transfer
const uploadsDir = path.resolve(__dirname, "../public/uploads");
app.use("/uploads", express.static(uploadsDir));
app.use(express.static(path.resolve(__dirname, "../public")));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    service: "KostAgent (PT. AlanGantengBanget)",
    version: "1.2.0",
    timestamp: new Date().toISOString()
  });
});

// Daftarkan Seluruh Router KostAgent
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/partnerships", partnershipRouter);
app.use("/api/v1/webhooks", webhookRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/testing", testingRouter);

// Cron endpoint for Vercel Cron Jobs
app.get("/api/v1/cron/sla-check", async (req: Request, res: Response) => {
  try {
    await SlaMonitor.runChecks();
    res.json({ success: true, message: "SLA check completed", timestamp: new Date().toISOString() });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Background timer: Periksa SLA timeout 60 menit dan SLA verifikasi 24 jam setiap 30 detik (hanya berjalan saat standalone dev/server)
let slaMonitorInterval: NodeJS.Timeout | null = null;
if (!process.env.VERCEL) {
  slaMonitorInterval = setInterval(async () => {
    try {
      await SlaMonitor.runChecks();
    } catch (err) {
      console.error("[SlaMonitor] Error running SLA checks:", err);
    }
  }, 30000);
}

export const server = (!process.env.VERCEL || Boolean(process.env.PORT))
  ? app.listen(PORT, () => {
      console.log(`[KostAgent] Server running on port ${PORT}`);
    })
  : null;

export { slaMonitorInterval };
export default app;
