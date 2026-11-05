# KostAgent — Marketplace & Booking Platform (PWA + Admin Portal)

Platform marketplace sewa kost dan pemesanan kamar terintegrasi. Dilengkapi dengan Progressive Web App (PWA) untuk pencari kost (Customer), Admin Monitoring Portal untuk manajemen listing dan SLA, serta REST API Serverless backend.

## 🚀 Fitur Utama

### 1. Customer PWA
- **Katalog & Pencarian**: Filter gender (Putra, Putri, Campur), harga, fasilitas, lokasi.
- **Detail Properti & Kamar**: Informasi foto, fasilitas, kapasitas, syarat sewa.
- **Booking Flow**: Input data penghuni, hitung durasi, simulasi pembayaran, upload struk transfer ke Supabase Storage.
- **Riwayat & Status Pemesanan**: Pelacakan status SLA persetujuan pemilik, timer pembayaran, dan konfirmasi.
- **PWA Experience**: Mobile-first, installable banner, offline caching.

### 2. Admin Monitoring Portal
- **Dashboard Metrik**: Ringkasan total properti mitra, booking aktif, dan monitoring SLA.
- **Property Monitoring**: Pemantauan listing aktif yang tersinkronisasi dari Kost Management.
- **Partnership Monitoring**: Status verifikasi dan evaluasi kemitraan pemilik kost.
- **Booking Monitoring**: Audit trail pemesanan customer dan SLA persetujuan.
- **User Monitoring**: Monitoring customer dan status verifikasi.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React
- **Backend API**: Node.js, Express, TypeScript, Serverless Function (`api/index.ts`)
- **Database**: PostgreSQL (Supabase) via Prisma ORM
- **Storage**: Supabase Storage Bucket (`receipts`)
- **Deployment**: Vercel (`vercel.json`)

## 📦 Skema Database
Skema PostgreSQL Supabase dan seeder data tersedia di:
`supabase/kost_agent_schema.sql`

## ⚙️ Environment Variables
Lihat `.env.example` untuk konfigurasi:
- `DATABASE_URL` / `DIRECT_URL` (Supabase PostgreSQL Connection Pooler)
- `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (Supabase Storage)
- `KOST_MANAGEMENT_API_URL` (URL API Kost Management untuk integrasi sinkronisasi)
