# DOKUMEN ARSITEKTUR SISTEM (SYSTEM ARCHITECTURE SPECIFICATION)
## SISTEM TERPADU: KOST MANAGEMENT & KOSTAGENT
**Phase**: Phase 2 — System Analysis  
**Versi**: 1.0.0 | **Tanggal**: 2026-11-01  
**Referensi**: [ADR-000 s/d ADR-012](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/docs/decisions/README.md) & [functional-requirements.md](file:///e:/Allan/Kuliah/Kuliah%20Sem%203/Integrasi%20Sistem/Golden%20Tiket/kost-agent/docs/requirements/functional-requirements.md)

---

## 1. TOPOLOGI & MONOREPO DUAL-SERVICE (ADR-007)

Kedua sistem hidup dalam satu repositori kerja (*monorepo*) namun beroperasi sebagai dua aplikasi mandiri dengan database dan konfigurasi independen:

```text
kost-agent/ (Monorepo Root)
├── apps/
│   ├── kost-management/            # Aplikasi SaaS Operasional Pemilik Kos (UbaedillahProject)
│   │   ├── src/                    # Backend API & Frontend Dashboard Owner
│   │   ├── prisma/                 # Schema & Migrasi DB Kost Management (kost_management.db)
│   │   ├── .env                    # PORT=4000, DB_URL, PLATFORM_SECRET
│   │   └── package.json
│   │
│   └── kost-agent/                 # Platform Publik Agregasi & Booking (PT. AlanGantengBanget)
│       ├── src/                    # Backend API & Portal Publik Customer/Admin
│       ├── prisma/                 # Schema & Migrasi DB KostAgent (kost_agent.db)
│       ├── .env                    # PORT=3000, DB_URL, PLATFORM_SECRET
│       └── package.json
│
├── docs/                           # Dokumentasi Arsitektur, DB, API, Keputusan Teknis
└── package.json                    # Workspace scripts (pnpm / npm workspaces)
```

```mermaid
flowchart TD
    subgraph ClientLayer["Client Access Layer"]
        BrowserCustomer["Browser Calon Penghuni (KostAgent Web)"]
        BrowserAdmin["Browser Admin (KostAgent Admin Portal)"]
        BrowserOwner["Browser Pemilik Kos (Kost Management Web)"]
        BrowserStaff["Browser Staff (Kost Management SaaS Admin)"]
    end

    subgraph PlatformKostAgent["Platform KostAgent (:3000) - PT. AlanGantengBanget"]
        KA_Web["KostAgent Frontend & SSR"]
        KA_API["KostAgent Core API Engine"]
        KA_Worker["Countdown & SLA Expiry Worker"]
        KA_DB[("Database KostAgent\nkost_agent.db")]
    end

    subgraph ServiceKostManagement["Kost Management (:4000) - UbaedillahProject"]
        KM_Web["Kost Management Owner Dashboard"]
        KM_API["Kost Management Core API"]
        KM_SyncEngine["Sync & Webhook Ingestion Engine"]
        KM_DB[("Database Kost Management\nkost_management.db")]
    end

    BrowserCustomer --> KA_Web
    BrowserAdmin --> KA_Web
    KA_Web --> KA_API
    KA_API --> KA_DB
    KA_Worker --> KA_DB

    BrowserOwner --> KM_Web
    BrowserStaff --> KM_Web
    KM_Web --> KM_API
    KM_API --> KM_DB
    KM_SyncEngine --> KM_DB

    KA_API <== "REST API over HTTPS (Bearer Token)" ==> KM_API
    KM_API -.->|"Webhook Event Push (HMAC-SHA256)"| KA_API
```

---

## 2. SEQUENCE DIAGRAMS (ALUR BISNIS UTAMA)

### 2.1 Alur Inisiasi Booking & Real-Time Hold Kamar (ADR-008)

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Calon Penghuni
    participant KA as KostAgent Service
    participant KM as Kost Management API
    participant DB_KM as DB Kost Management

    Customer->>KA: Pilih Kamar, 2 Slot, Isi Form Dinamis, Klik Submit
    activate KA
    KA->>KM: POST /api/v1/rooms/{id}/hold-slots (slots=2, timeout=60m)
    activate KM
    KM->>DB_KM: SELECT FOR UPDATE rooms WHERE id = ?
    alt Kapasitas Tersedia >= 2 Slot
        KM->>DB_KM: UPDATE rooms SET reserved_slots = reserved_slots + 2
        KM->>DB_KM: INSERT room_reservations (status=HOLD, expires_at=NOW+60m)
        KM-->>KA: 200 OK (reservation_id, expires_at)
        KA->>KA: Simpan Booking (status=PENDING_PAYMENT, deadline=NOW+60m)
        KA-->>Customer: Tampilkan Instruksi Transfer Owner & Timer 60 Menit
    else Sisa Slot < 2 Slot (Fail All)
        KM-->>KA: 409 Conflict (INSUFFICIENT_CAPACITY)
        deactivate KM
        KA-->>Customer: Galat: "Slot kamar tidak lagi mencukupi"
    end
    deactivate KA
```

### 2.2 Alur Pembayaran Direct to Owner & Verifikasi Owner

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Calon Penghuni
    participant Bank as Perbankan Owner
    participant KA as KostAgent Service
    participant KM as Kost Management API
    actor Owner as Pemilik Kos

    Customer->>Bank: Transfer dana sewa langsung ke rekening Owner
    Customer->>KA: Unggah bukti transfer (sebelum 60 menit)
    activate KA
    KA->>KA: Ubah status menjadi PAYMENT_SUBMITTED (kunci tombol batal)
    KA->>KM: POST /api/v1/bookings/inbound (data booking & bukti transfer)
    activate KM
    KM->>Owner: Notifikasi booking & bukti transfer masuk (SLA 24 jam)
    deactivate KM
    deactivate KA

    alt Owner Menyetujui (ACCEPT)
        Owner->>KM: Klik tombol ACCEPT
        activate KM
        KM->>KM: Pindahkan slot dari reserved_slots ke occupied_slots
        KM-->>KA: Webhook: BOOKING_VERIFIED (decision=ACCEPTED)
        deactivate KM
        activate KA
        KA->>KA: Update status ACCEPTED, set tenggat check-in H+14
        KA-->>Customer: Notifikasi pemesanan diterima & petunjuk check-in
        deactivate KA
    else Owner Menolak (REJECT)
        Owner->>KM: Klik tombol REJECT (isi alasan penolakan)
        activate KM
        KM->>KM: Lepas slot kamar (reserved_slots - 2)
        KM-->>KA: Webhook: BOOKING_VERIFIED (decision=REJECTED)
        deactivate KM
        activate KA
        KA->>KA: Update status REJECTED
        KA-->>Customer: Tampilkan prompt input nomor rekening refund
        Customer->>KA: Kirim nomor rekening bank/e-wallet
        KA->>KM: POST /api/v1/bookings/{id}/refund-account
        activate KM
        KM->>Owner: Instruksi transfer balik dana (target SLA 24 jam)
        Owner->>Bank: Transfer refund manual ke rekening Customer
        Owner->>KM: Klik "Refund Selesai"
        KM-->>KA: Webhook: REFUND_COMPLETED
        deactivate KM
        KA-->>Customer: Konfirmasi dana telah dikembalikan oleh pemilik
        deactivate KA
    end
```

---

## 3. STACK TEKNOLOGI REKOMENDASI UNTUK MVP (SOLO DEV FRIENDLY)

Untuk memaksimalkan produktivitas pengerjaan individu, meminimalkan kompleksitas infrastruktur, dan menjamin performa tinggi:

1. **Runtime & Bahasa**: **Node.js (v20+ LTS) dengan TypeScript**.  
   *Alasan*: Type-safety penuh antara frontend dan backend, ekosistem npm kaya, parsing JSON skema dinamis sangat cepat.
2. **Framework Backend**: **Fastify** atau **Express.js** dengan struktur modular.
3. **Database & ORM**: **Prisma ORM** dengan **SQLite (Lokal Dev)** atau **PostgreSQL**.
   *Alasan*: Prisma menghasilkan type-safe database client otomatis, file migration declarative, dan sangat mudah mengelola dua skema terpisah (`km_db` dan `ka_db`).
4. **Validasi Skema**: **Zod**.  
   *Alasan*: Validasi runtime yang selaras dengan TypeScript types untuk kontrak API, form dinamis, dan webhook validation.
5. **Frontend UI**: **Next.js (App Router)** atau **Vite + React + Tailwind CSS**.  
   *Alasan*: Komponen antarmuka modern, responsif, dan ringan untuk dashboard pemilik maupun portal publik pencari kos.
6. **Task Scheduling / Timers**: **Node-Cron** atau in-process lightweight scheduler untuk monitoring deadline 60 menit dan SLA verifikasi 24 jam.

Dokumen arsitektur sistem ini memformalkan integrasi menyeluruh antar-modul dan siap dilanjutkan ke tahap **Perancangan Wireframe / UI-UX Flow** sebelum masuk ke fase implementasi kode.
