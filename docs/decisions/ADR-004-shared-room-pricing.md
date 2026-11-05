# ADR-004: Rumus Kalkulasi Biaya Pemesanan Kamar Bersama (Shared Room)

- **Decision ID**: ADR-004
- **Date**: 2026-11-01
- **Context**: Kamar kos dapat bertipe privat maupun bersama (*shared room*), dengan kapasitas berbasis slot/orang. Calon penghuni dapat memesan lebih dari satu slot sekaligus dalam satu booking untuk rombongan/teman.
- **Problem**: Diperlukan aturan matematis standar untuk menghitung total tagihan booking multi-slot kamar bersama.
- **Decision**: Menggunakan rumus deterministik berbasis slot:
  $$\text{Total Biaya Sewa} = \text{Harga per Slot per Bulan} \times \text{Jumlah Slot yang Dipesan} \times \text{Durasi Sewa (Bulan)}$$
- **Alternatives**:
  - *Opsi B*: Harga flat per kamar tidak peduli berapa slot yang diambil (hanya berlaku jika tipe kamar privat).
  - *Opsi C*: Dynamic pricing kalkulasi penuh dari Kost Management API per hitungan. (Ditolak untuk MVP karena memperlambat checkout dan mempersulit estimasi transparansi di UI).
- **Reason**: Rumus ini adil bagi pengguna kamar berbagi (hanya membayar slot yang digunakan) dan konsisten dengan model alokasi slot di database.
- **Impact**:
  - Validasi harga wajib dijalankan di server-side KostAgent: mengalikan harga unit slot dengan kuantitas slot dan durasi sewa yang dipilih customer.
- **Status**: LOCKED
