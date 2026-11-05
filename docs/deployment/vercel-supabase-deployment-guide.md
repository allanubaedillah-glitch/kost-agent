# PANDUAN DEPLOYMENT VERCEL & SUPABASE: KOSTAGENT & KOST MANAGEMENT

Dokumen ini memandu langkah demi langkah (*step-by-step*) untuk men-deploy kedua aplikasi dan database ke cloud secara gratis menggunakan **Vercel** (untuk hosting frontend + serverless backend) dan **Supabase** (untuk database PostgreSQL + cloud storage).

---

## 1. Arsitektur Cloud Production

```
┌──────────────────────────────────────────────┐       ┌──────────────────────────────────────────────┐
│           PROYEK VERCEL 1                    │       │           PROYEK VERCEL 2                    │
│   https://kost-agent.vercel.app              │       │   https://kost-management.vercel.app         │
├──────────────────────────────────────────────┤       ├──────────────────────────────────────────────┤
│ • Customer PWA (Mobile & Desktop)            │       │ • Owner PMS SaaS Dashboard                   │
│ • Admin Monitoring & Moderation Portal       │       │ • Single Source of Truth Property & Rooms    │
│ • Serverless Express API (/api/v1/...)       │       │ • Serverless Express API (/api/v1/...)       │
│ • Vercel Cron (SLA Monitor T+24h)            │       │ • Vercel Cron (Release Hold 60m)             │
└──────────────────────┬───────────────────────┘       └──────────────────────┬───────────────────────┘
                       │                                                      │
                       │ REST / Webhooks (HMAC SHA-256)                       │
                       └──────────────────────────────────────────────────────┘
                                  │                                  │
                                  ▼                                  ▼
               ┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
               │         SUPABASE PROYEK 1            │  │         SUPABASE PROYEK 2            │
               │            (KostAgent)               │  │          (Kost Management)           │
               ├──────────────────────────────────────┤  ├──────────────────────────────────────┤
               │ • PostgreSQL Database                │  │ • PostgreSQL Database                │
               │ • Connection Pooler (Port 6543)      │  │ • Connection Pooler (Port 6543)      │
               │ • Storage Bucket: `receipts` (Public)│  │ • Isolasi Operasional Pemilik        │
               └──────────────────────────────────────┘  └──────────────────────────────────────┘
```

---

## 2. Langkah 1: Setup 2 Proyek di Supabase

### A. Proyek Supabase 1 (KostAgent)
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) dan klik **New Project**.
2. Beri nama: `kost-agent-db`, pilih region terdekat (misal: **Singapore / ap-southeast-1**), dan catat **Database Password** Anda.
3. Setelah proyek aktif, buka menu **SQL Editor** di sisi kiri.
4. Buka file [`supabase/kost_agent_schema.sql`](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/supabase/kost_agent_schema.sql) di project ini, **salin seluruh isinya**, tempelkan ke SQL Editor Supabase, lalu klik **Run**.
   * Skrip ini akan membuat seluruh tabel, indeks, relasi, bucket storage publik `receipts`, kebijakan akses upload, serta data akun default (Admin: `admin@kostagent.com` / `admin123`, Customer: `budi.santoso@example.com` / `password123`).
5. Ambil Connection String:
   * Buka menu **Project Settings** (ikon roda gigi) -> **Database**.
   * Scroll ke bagian **Connection string**:
     * Pilih tab **URI** -> mode **Transaction** (Port 6543): Salin URL ini sebagai `DATABASE_URL`.
     * Pilih mode **Session** / **Direct** (Port 5432): Salin URL ini sebagai `DIRECT_URL`.
   * Buka menu **Project Settings** -> **API**:
     * Salin **Project URL** sebagai `SUPABASE_URL`.
     * Salin **service_role secret** sebagai `SUPABASE_SERVICE_ROLE_KEY`.

---

### B. Proyek Supabase 2 (Kost Management)
1. Di Supabase Dashboard, buat proyek baru: `kost-management-db` (Region Singapore).
2. Buka menu **SQL Editor**.
3. Buka file [`supabase/kost_management_schema.sql`](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/supabase/kost_management_schema.sql) di project ini, **salin seluruh isinya**, tempelkan ke SQL Editor Supabase, lalu klik **Run**.
   * Skrip ini akan membuat tabel operasional kos, kamar, reservasi slot kuota, penyewa, serta data awal Properti **Kost Siti Melati Indah A** beserta 2 kamarnya (Kamar 101 & Kamar 102) milik Owner Ibu Siti (`ibu.siti@example.com` / `password123`).
4. Ambil Connection String:
   * Buka **Project Settings** -> **Database**:
     * Salin Transaction URL (Port 6543) sebagai `DATABASE_URL`.
     * Salin Direct URL (Port 5432) sebagai `DIRECT_URL`.

---

## 3. Langkah 2: Setup 2 Proyek di Vercel

### A. Deploy Proyek 1: KostAgent (`kost-agent.vercel.app`)
1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik **Add New...** -> **Project**.
2. Sambungkan dengan repository Git Anda (GitHub/GitLab).
3. Pada halaman **Configure Project**:
   * **Project Name**: `kost-agent`
   * **Root Directory**: Klik **Edit** dan pilih folder `apps/kost-agent`.
   * **Framework Preset**: Pilih **Other** (karena build diatur oleh `vercel.json`).
   * **Build and Output Settings**:
     * Build Command: Biarkan default (`npm run build:vercel` sudah otomatis dibaca dari `vercel.json`).
     * Output Directory: `frontend/dist`.
4. Buka accordion **Environment Variables** dan tambahkan variabel berikut:
   * `DATABASE_URL`: *[Transaction Connection Pooler URL dari Supabase Proyek 1]*
   * `DIRECT_URL`: *[Direct Connection URL dari Supabase Proyek 1]*
   * `SUPABASE_URL`: *[Project URL Supabase Proyek 1]*
   * `SUPABASE_SERVICE_ROLE_KEY`: *[Service Role Secret Supabase Proyek 1]*
   * `SUPABASE_STORAGE_BUCKET`: `receipts`
   * `KOST_MANAGEMENT_API_URL`: `https://[NAMA-PROYEK-KM-ANDA].vercel.app/api/v1` *(bisa diisi sementara dan di-update setelah proyek 2 selesai di-deploy)*
   * `HMAC_WEBHOOK_SECRET`: `super-secret-hmac-sha256-key-golden-tiket-2026`
5. Klik **Deploy**.

---

### B. Deploy Proyek 2: Kost Management (`kost-management.vercel.app`)
1. Di Vercel Dashboard, klik **Add New...** -> **Project**.
2. Pilih repository yang sama.
3. Pada halaman **Configure Project**:
   * **Project Name**: `kost-management`
   * **Root Directory**: Klik **Edit** dan pilih folder `apps/kost-management`.
   * **Framework Preset**: Pilih **Other**.
   * **Output Directory**: `frontend/dist`.
4. Buka accordion **Environment Variables** dan tambahkan variabel berikut:
   * `DATABASE_URL`: *[Transaction Connection Pooler URL dari Supabase Proyek 2]*
   * `DIRECT_URL`: *[Direct Connection URL dari Supabase Proyek 2]*
   * `KOST_AGENT_API_URL`: `https://[NAMA-PROYEK-KA-ANDA].vercel.app/api/v1`
   * `HMAC_WEBHOOK_SECRET`: `super-secret-hmac-sha256-key-golden-tiket-2026`
5. Klik **Deploy**.

---

## 4. Langkah 3: Menghubungkan URL API Antar Proyek

Setelah kedua proyek Vercel selesai dibuat:
1. Catat domain yang diberikan Vercel untuk masing-masing proyek:
   * KostAgent: misal `https://kost-agent-production.vercel.app`
   * Kost Management: misal `https://kost-management-production.vercel.app`
2. Masuk ke **Vercel KostAgent** -> **Settings** -> **Environment Variables**:
   * Perbarui nilai `KOST_MANAGEMENT_API_URL` menjadi `https://kost-management-production.vercel.app/api/v1`.
   * Lakukan *Redeploy*.
3. Masuk ke **Vercel Kost Management** -> **Settings** -> **Environment Variables**:
   * Perbarui nilai `KOST_AGENT_API_URL` menjadi `https://kost-agent-production.vercel.app/api/v1`.
   * Lakukan *Redeploy*.

---

## 5. Fitur yang Sudah Disesuaikan Otomatis untuk Vercel & Supabase

| Komponen | Penyesuaian Vercel & Supabase |
|---|---|
| **Serverless Express** | File [`apps/kost-agent/api/index.ts`](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/apps/kost-agent/api/index.ts) dan [`apps/kost-management/api/index.ts`](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/apps/kost-management/api/index.ts) mengekspor Express `app` sebagai handler Vercel Serverless Function. |
| **Prisma PostgreSQL** | Skema Prisma telah dikonfigurasi untuk PostgreSQL dengan koneksi ganda (`DATABASE_URL` untuk transaction pooler & `DIRECT_URL` untuk session migration). |
| **Cloud Storage Bukti Bayar** | File bukti pembayaran diunggah langsung ke **Supabase Storage Bucket (`receipts`)** dan menghasilkan tautan publik persisten (bukan lagi file lokal sementara). |
| **Vercel Cron Jobs** | Konfigurasi [`vercel.json`](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/apps/kost-agent/vercel.json) mencakup Cron Job otomatis setiap 1 menit untuk SLA Monitor (`/api/v1/cron/sla-check`) dan Pembersihan Hold Kamar (`/api/v1/cron/cleanup-holds`). |
| **Dynamic Frontend API** | Frontend mendeteksi domain secara otomatis (`/api/v1` di Vercel cloud dan `localhost:3000`/`localhost:4000` saat development lokal). |
