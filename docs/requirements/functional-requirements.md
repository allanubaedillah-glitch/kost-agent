# SPESIFIKASI KEBUTUHAN FUNGSIONAL (FUNCTIONAL REQUIREMENTS)
## SISTEM TERPADU: KOST MANAGEMENT & KOSTAGENT
**Pemilik Sistem**: 
- **Kost Management**: UbaedillahProject (SaaS Operasional Pemilik Kos)
- **KostAgent**: PT. AlanGantengBanget (Platform Publik Agregasi & Pemesanan Kos)
**Phase**: Phase 2 — System Analysis  
**Versi**: 2.1.0 — MVP Production Baseline  
**Tanggal Rilis**: 2026-11-01  
**Status**: APPROVED & LOCKED (Berdasarkan Dokumen Revisi v2 & ADR-000 s/d ADR-012)

---

## 1. BATASAN & PRINSIP DASAR SISTEM

### 1.1 Pemisahan Sistem & Kepemilikan Database (ADR-000 & ADR-007)
- **Kost Management** dan **KostAgent** adalah dua produk berbeda dengan database fisik terpisah 100%.
- Kedua sistem dikembangkan dalam struktur **Monorepo Bersih** (`/apps/kost-management` dan `/apps/kost-agent`), masing-masing menggunakan koneksi database terisolasi tanpa foreign key antar-database.
- Komunikasi antar-sistem berlangsung murni menggunakan **REST API** dan **Webhook Event Push** dengan otentikasi Bearer Token & signature hash SHA-256.

### 1.2 Prinsip Source of Truth (Baseline Dokumen)
- **Kost Management adalah Single Source of Truth** untuk data operasional kos, kamar, kapasitas slot, penghuni, harga, dan tunggakan sewa.
- **KostAgent** menyimpan salinan data publikasi (*read-model*) untuk kebutuhan pencarian, katalog, dan penanganan transaksi booking pengguna publik.

### 1.3 Model Transaksi & Kapasitas (ADR-004, ADR-008, ADR-010)
- **Direct Payment**: KostAgent **bukan escrow/wallet**. Pembayaran sewa langsung ditransfer oleh customer ke rekening pemilik kos.
- **Kapasitas Agregat**: Kamar privat maupun bersama dimodelkan dengan kapasitas numerik slot/orang. Ketersediaan dihitung deterministik:
  $$\text{Slot Tersedia} = \text{Kapasitas Efektif} - \text{Penghuni Aktif} - \text{Slot Reservasi Aktif}$$
- **Atomic Multi-Slot Booking**: Pemesanan $N$ slot wajib dialokasikan secara atomik (*All-or-Nothing*). Jika sisa slot $< N$, pemesanan gagal total.
- **Real-Time Hold**: Status `PENDING PAYMENT` di KostAgent langsung memesan slot hold sementara di Kost Management selama 60 menit.

---

## 2. SPESIFIKASI MODUL: KOST MANAGEMENT (OPERASIONAL OWNER)

### 2.1 Pengelolaan Properti Kos (KM-PRP)
- **KM-PRP-001**: Owner dapat mendaftarkan dan memperbarui profil kos (nama kos, alamat lengkap, kota/kabupaten, deskripsi, fasilitas umum, foto properti, kontak WhatsApp).
- **KM-PRP-002**: Owner dapat mengatur ketentuan sewa (*Ketentuan Kos*) menggunakan **Preset Checkboxes** (`[ ] KTP/NIK`, `[ ] KK`, `[ ] Bukti Kerja/Mahasiswa`, `[ ] Kontak Darurat`), **menambahkan custom checkbox dinamis** (label + status wajib), serta kolom catatan bebas tata tertib kos (ADR-009).
- **KM-PRP-003**: Owner dapat mengonfigurasi nomor rekening bank atau barcode QRIS resmi atas nama pemilik kos untuk penerimaan dana booking langsung dari customer.

### 2.2 Pengelolaan Kamar & Kapasitas (KM-ROM)
- **KM-ROM-001**: Owner dapat menambah, mengedit, dan menghapus kamar (nomor/label kamar, tipe kamar privat atau bersama, ukuran kamar, fasilitas kamar, foto kamar, harga sewa bulanan, dan total kapasitas slot).
- **KM-ROM-002**: Sistem mencatat status kamar: `TERSEDIA`, `DIPESAN (HOLD)`, `DITEMPATI (OCCUPIED)`, atau `TIDAK TERSEDIA (MAINTENANCE)`.
- **KM-ROM-003**: Sistem mengelola kuota slot kamar secara dinamis (`total_capacity`, `occupied_slots`, `reserved_slots`) untuk mencegah overbooking (ADR-010).

### 2.3 Pengelolaan Penghuni & Catatan Keuangan Internal (KM-OPS)
- **KM-OPS-001**: Owner dapat mengelola daftar penghuni kamar aktif, tanggal mulai masuk, dan tanggal jatuh tempo sewa.
- **KM-OPS-002**: Owner dapat mencatat tagihan, pembayaran sewa penghuni offline/existing, dan memantau status tunggakan sewa. Data ini **bersifat rahasia internal dan tidak dipublikasikan ke KostAgent**.
- **KM-OPS-003**: Owner dapat mencatat pengingat operasional sederhana (jadwal pembersihan, perawatan fasilitas, reminder sewa).

### 2.4 Kemitraan & Integrasi ke KostAgent (KM-INT)
- **KM-INT-001**: Owner dapat memilih unit kos tertentu satu per satu untuk diajukan ke KostAgent melalui tombol 1-klik "Ajukan ke KostAgent" (ADR-011).
- **KM-INT-002**: Owner wajib menyetujui Syarat & Ketentuan integrasi (mekanisme pembayaran langsung, kewajiban verifikasi, dan SLA refund) sebelum pengajuan dikirim.
- **KM-INT-003**: Kost Management memancarkan webhook sinkronisasi otomatis ke KostAgent setiap kali data kamar, harga, fasilitas, atau ketersediaan disimpan (ADR-005).
- **KM-INT-004**: Kost Management menyediakan endpoint reservasi hold slot kamar sementara (`POST /api/v1/rooms/{id}/hold-slots`) berdurasi 60 menit saat customer melakukan booking online (ADR-008).

### 2.5 Penerimaan Pemesanan & Verifikasi Pembayaran (KM-BKG)
- **KM-BKG-001**: Owner menerima notifikasi pemesanan masuk lengkap dengan rincian durasi sewa, data penghuni, dan tautan berkas bukti transfer (`PAYMENT SUBMITTED`).
- **KM-BKG-002**: Owner memiliki batas waktu maksimal 1×24 jam untuk mengambil keputusan: **ACCEPT** (menyetujui sewa dan mengunci slot) atau **REJECT** (menolak sewa dengan alasan tertulis).
- **KM-BKG-003**: Jika ditolak, owner menerima rincian nomor rekening/e-wallet customer untuk pengembalian dana, mentransfer dana manual, dan menekan konfirmasi "Refund Selesai" dalam SLA 1×24 jam (ADR-012).
- **KM-BKG-004**: Owner dapat memverifikasi kedatangan fisik calon penghuni di kos dan mengubah status menjadi `CHECKED-IN / OCCUPIED`.

---

## 3. SPESIFIKASI MODUL: KOSTAGENT (PLATFORM PUBLIK & BOOKING)

### 3.1 Akun & Autentikasi Customer (KA-CUST)
- **KA-CUST-001**: Calon penghuni dapat mendaftar akun menggunakan nama lengkap, alamat email unik, nomor telepon aktif, dan password terenkripsi (Argon2id/Bcrypt) (ADR-002).
- **KA-CUST-002**: Sistem mengirimkan email token verifikasi untuk aktivasi akun baru.
- **KA-CUST-003**: Customer dapat login dan mengelola profil pribadi. Nomor rekening bank **tidak diminta saat registrasi** (hanya diminta jika terjadi alur refund).
- **KA-CUST-004**: Customer dapat mengakses dashboard ringkasan: pencarian kos, status booking aktif, dan riwayat transaksi.

### 3.2 Pencarian, Filter & Detail Kos (KA-LST)
- **KA-LST-001**: Customer dapat mencari kos berdasarkan nama kos, area kecamatan, kabupaten/kota, atau kata kunci umum.
- **KA-LST-002**: Customer dapat memfilter kos berdasarkan rentang harga, tipe kamar (privat/bersama), jenis kos (putra/putri/campur), fasilitas, dan ketersediaan slot.
- **KA-LST-003**: Customer dapat mengurutkan hasil pencarian berdasarkan harga terendah, harga tertinggi, dan rating ulasan.
- **KA-LST-004**: Halaman detail kos menampilkan profil properti, galeri foto, fasilitas, tautan WhatsApp pemilik, label waktu sinkronisasi data terakhir, serta daftar kamar beserta sisa ketersediaan slot real-time.

### 3.3 Formulir Booking Dinamis & Pemesanan (KA-BKG)
- **KA-BKG-001**: Customer memilih kamar, jumlah slot penghuni yang dipesan, tanggal rencana mulai tinggal, dan durasi sewa (minimal 1 bulan).
- **KA-BKG-002**: Sistem mengambil skema ketentuan kos dari Kost Management via API dan me-render formulir pendaftaran dinamis secara otomatis (preset checkboxes, custom checkboxes, dan input dokumen) (ADR-009).
- **KA-BKG-003**: Customer wajib mengisi lengkap data ketentuan untuk setiap penghuni sejumlah slot yang dipesan (Penghuni 1, Penghuni 2, dst.).
- **KA-BKG-004**: Sistem memvalidasi ketersediaan kapasitas kamar secara real-time ke Kost Management dan mengunci slot kamar (*real-time hold*) selama 60 menit (ADR-008).
- **KA-BKG-005**: Request booking dilindungi `idempotency_key` (UUID v4) untuk mencegah transaksi ganda akibat klik berulang atau refresh halaman.
- **KA-BKG-006**: Status booking diinisiasi sebagai `PENDING PAYMENT`. Customer dapat membatalkan booking secara mandiri pada tahap ini (slot kamar langsung dirilis kembali) (ADR-001).

### 3.4 Pembayaran Direct-to-Owner & Pengunggahan Bukti (KA-PAY)
- **KA-PAY-001**: Sistem menghitung total biaya sewa secara transparan: $\text{Harga per Slot} \times \text{Jumlah Slot} \times \text{Durasi Bulan}$ (ADR-004).
- **KA-PAY-002**: Sistem menampilkan instruksi transfer langsung ke nomor rekening/QRIS pemilik kos beserta countdown timer 60 menit.
- **KA-PAY-003**: Jika batas 60 menit terlampaui tanpa bukti transfer, background worker sistem otomatis mengubah status menjadi `EXPIRED` dan melepaskan hold slot di Kost Management.
- **KA-PAY-004**: Customer mengunggah berkas bukti transfer (JPG/PNG/PDF, maks 3MB) sebelum 60 menit berakhir. Begitu terunggah, status berubah menjadi `PAYMENT SUBMITTED`.
- **KA-PAY-005**: Tombol pembatalan mandiri dikunci seketika saat status `PAYMENT SUBMITTED`. Data pemesanan dan berkas bukti bayar dikirim via API ke Kost Management untuk diverifikasi owner.
- **KA-PAY-006**: Jika status `PAYMENT SUBMITTED` melampaui 1×24 jam tanpa verifikasi owner, booking diberi tanda `NEEDS ATTENTION` pada dashboard admin KostAgent untuk ditindaklanjuti manual (ADR-003).

### 3.5 Alur Penolakan & Pengembalian Dana / Refund (KA-RFD)
- **KA-RFD-001**: Jika owner melakukan `REJECT` pada booking, status di KostAgent berubah menjadi `REJECTED` disertai alasan penolakan dari owner.
- **KA-RFD-002**: Customer diminta mengisi data rekening bank/e-wallet untuk pengembalian dana melalui antarmuka KostAgent.
- **KA-RFD-003**: Data rekening diteruskan via API ke Kost Management untuk dieksekusi transfer manual oleh owner dalam target SLA 1×24 jam (ADR-012).
- **KA-RFD-004**: Setelah owner mengonfirmasi transfer refund, status booking berubah menjadi `REFUND_COMPLETED`.

### 3.6 Check-In & Batas Waktu Kedatangan (KA-CHK)
- **KA-CHK-001**: Ketika booking disetujui owner (`ACCEPTED`), sistem menghitung batas waktu kedatangan fisik: maksimal 14 hari kalender ($Hari + 14$).
- **KA-CHK-002**: Customer dapat menekan tombol "Verifikasi Kedatangan" di KostAgent saat tiba di lokasi atau berkoordinasi via WhatsApp pemilik kos.
- **KA-CHK-003**: Setelah owner mengonfirmasi kedatangan, status booking berubah menjadi `CHECKED IN`.
- **KA-CHK-004**: Jika melewati 14 hari tanpa check-in, status berubah menjadi `CHECK-IN OVERDUE`. Pembatalan/refund pada tahap ini tunduk pada potongan penalti/denda S&K kos.

### 3.7 Ulasan & Rating (KA-REV)
- **KA-REV-001**: Customer yang memiliki riwayat booking berstatus `ACCEPTED`, `CHECKED IN`, atau `COMPLETED` berhak memberikan skor rating (bintang 1–5) dan ulasan teks (ADR-006).
- **KA-REV-002**: Satu transaksi booking hanya dapat menghasilkan tepat satu ulasan (*idempotent review*). Ulasan ditampilkan di halaman detail kos dengan nama yang disamarkan demi privasi.

---

## 4. SPESIFIKASI MODUL: ADMINISTRASI & KEANGGOTAAN

### 4.1 Admin KostAgent (PT. AlanGantengBanget) (KA-ADM)
- **KA-ADM-001**: Admin memverifikasi pengajuan kemitraan kos baru dari owner di Kost Management (kelengkapan foto, kejelasan harga, fasilitas, dan ketentuan).
- **KA-ADM-002**: Admin dapat menyetujui pengajuan (`APPROVED` $\to$ listing publik aktif) atau menolak dengan catatan alasan penolakan (`REJECTED` $\to$ owner dapat memperbaiki dan mengajukan ulang).
- **KA-ADM-003**: Admin dapat menyembunyikan (*suspend / hide*) listing aktif yang bermasalah atau melanggar S&K.
- **KA-ADM-004**: Admin memantau antrean transaksi `NEEDS ATTENTION` (booking `PAYMENT SUBMITTED` yang melewati batas verifikasi 24 jam) untuk di-follow up secara manual ke pemilik kos.
- **KA-ADM-005**: Penegakan prinsip **Minimum Access**: Admin tidak dapat melihat NIK atau dokumen pribadi sensitif customer dalam kondisi normal. Akses investigasi sengketa hanya dapat dibuka melalui pencatatan audit log permanen.

### 4.2 Staff UbaedillahProject (Kost Management SaaS) (KM-STF)
- **KM-STF-001**: Staf memantau status keanggotaan/subscription SaaS para pemilik kos (aktif, mendekati jatuh tempo, kedaluwarsa).
- **KM-STF-002**: Staf melayani bantuan teknis dan customer service bagi pemilik kos.
- **KM-STF-003**: Jika status langganan owner `EXPIRED`, listing kos di KostAgent tidak dihapus permanen, melainkan dibekukan dari pemesanan baru (`EXPIRED`). Saat owner memperpanjang langganan (`RECONNECTED`), listing disinkronkan kembali menjadi aktif.
- **KM-STF-004**: Staf dibatasi secara tegas: **tidak memiliki wewenang memverifikasi pembayaran sewa customer, tidak mengelola kamar owner, dan tidak dapat melihat data dokumen pribadi customer**.

---

## 5. REKAPITULASI STATE MACHINE TRANSAKSI MVP

```text
               [ Customer Booking Inisiasi ]
                             │
                             ▼
                    [ PENDING PAYMENT ] ──────── (Batal mandiri / Timeout 60m)
                             │                               │
                (Upload Bukti Bayar ≤ 60m)                   ▼
                             │                          [ EXPIRED / CANCELLED ]
                             ▼                         (Slot hold otomatis lepas)
                   [ PAYMENT SUBMITTED ]
                             │
                  (Owner Verifikasi ≤ 24 Jam)
                 ┌───────────┴───────────┐
                 ▼                       ▼
            [ REJECTED ]            [ ACCEPTED ]
                 │                       │
         (Input Rekening)          (Check-in ≤ 14 Hari)
                 │                  ┌────┴───────────────┐
                 ▼                  ▼                    ▼
        [ REFUND PENDING ]   [ CHECKED IN ]     [ CHECK-IN OVERDUE ]
                 │                  │                    │
          (Owner Transfer)    (Masa Sewa Habis)   (Koordinasi/Denda)
                 │                  │                    │
                 ▼                  ▼                    ▼
        [ REFUND COMPLETED ]  [ COMPLETED ]          [ REFUND / RESOLVED ]
```

---
Dokumen spesifikasi kebutuhan fungsional ini telah mencakup seluruh kebutuhan bisnis kedua sistem sesuai *Kost Agent.pdf* dan revisi v2 pengguna, serta siap menjadi acuan langsung untuk pembuatan **Use Case Diagram & Spesifikasi**, **Entity Relationship Diagram (ERD)**, dan **API Contract Specification**.
