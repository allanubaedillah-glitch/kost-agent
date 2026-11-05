# Platform Kost: KostAgent & Kost Management

Proyek integrasi sistem terpadu antara:
1. **KostAgent** — Platform publik marketplace dan booking sewa kamar kos (PWA Customer & Portal Monitoring Admin).
2. **Kost Management** — Property Management System (PMS) operasional pemilik kos (SaaS UbaedillahProject).

---

## 1. Panduan Menjalankan Frontend KostAgent (Step 1)

Frontend KostAgent berjalan pada port **5173**.

```bash
npm run ka:frontend
```
Akses di browser:
- **Customer PWA**: `http://localhost:5173/`
- **Admin Portal**: `http://localhost:5173/admin`

---

## 2. Panduan Menjalankan Frontend Kost Management (Step 2)

Frontend Kost Management berjalan pada port **5174**.

```bash
npm run km:frontend
```
Akses di browser:
- **Kost Management Owner PMS**: `http://localhost:5174/` (atau `http://localhost:5174/login`)

---

## 3. Fitur Utama Kost Management (Step 2)

### A. Alur Navigasi Owner
1. **Login & Register**: `/login` dan `/register` (Simulasi akun pemilik kos Hj. Ratna Sari).
2. **Executive Dashboard**: `/dashboard` (Portofolio okupansi kamar, pemesanan masuk, dan ringkasan omzet sewa langsung).
3. **Property List**: `/properties` (Pengelolaan multi-properti).
4. **Add Property**: `/properties/add` (Form pendaftaran kos baru dengan fasilitas, rekening direct payment, dan ketentuan kos dinamis ADR-009).
5. **Property Context Navigation (4 Bagian Sejajar)**:
   - **Overview**: `/properties/:id` (Ringkasan unit, kapasitas slot, dan ketentuan).
   - **Rooms**: `/properties/:id/rooms` (Manajemen slot privat/bersama dan status operasional: `TERSEDIA`, `DIPESAN`, `DITEMPATI`, `MAINTENANCE`).
   - **Room Add / Edit**: `/properties/:id/rooms/add` dan `/properties/:id/rooms/:roomId` (Konfigurasi kapasitas numerik slot kamar).
   - **Bookings**: `/properties/:id/bookings` (Daftar pemesanan masuk dengan tab filter status).
   - **Booking Detail (Keputusan Owner)**: `/properties/:id/bookings/:bookingId` (Review berkas bukti bayar m-banking, countdown SLA 24 jam, tombol **ACCEPT** untuk mengunci slot kamar, tombol **REJECT** untuk menolak dan mengeksekusi refund ADR-012, serta konfirmasi check-in kedatangan fisik).
   - **Partnership**: `/properties/:id/partnership` (Pengajuan kemitraan kos ke KostAgent per properti, toggle aktif/nonaktif pemesanan online).
   - **Partnership Terms**: `/properties/:id/partnership/terms` (Syarat & Ketentuan kemitraan integrasi: direct payment, SLA review 24 jam, SLA refund 24 jam).
6. **Owner Profile**: `/profile` (Profil pemilik, paket SaaS Juragan Pro aktif s/d 2027, dan rekening bank penerima sewa).

### B. Owner PMS Simulator
Tersedia widget mengambang **`🧪 Owner PMS Simulator`** di pojok kanan bawah:
- **Simulasikan Pesanan Masuk (Payment Submitted)**: Mengirimkan pesanan baru dari KostAgent ke properti terkait secara instan untuk menguji alur verifikasi.
- **Switch Properti Cepat**: Berpindah antar unit properti kos.
- **Reset Data Mock Owner**: Mengembalikan seluruh data operasional ke kondisi awal.
