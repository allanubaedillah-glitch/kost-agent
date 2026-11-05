# ADR-012: Alur Terstruktur Data Rekening Pengembalian Dana (Refund Flow)

- **Decision ID**: ADR-012
- **Date**: 2026-11-01
- **Context**: Jika pembayaran ditolak oleh owner (`REJECTED`) atau terjadi pembatalan yang sah sesuai klausul denda, dana yang sudah ditransfer customer langsung ke rekening owner harus dikembalikan. KostAgent bukan penampung dana, sehingga pengembalian dana dieksekusi secara manual oleh owner.
- **Problem**: Jika koordinasi refund dilakukan murni lewat WhatsApp tanpa pencatatan sistem, status transaksi akan menggantung dan platform kehilangan transparansi penyelesaian sengketa.
- **Decision**: 
  1. Begitu booking berstatus `REJECTED`, aplikasi KostAgent memunculkan prompt formulir bagi customer: *"Pemesanan ditolak. Masukkan Nama Bank/e-Wallet, Nomor Rekening, dan Atas Nama untuk pengembalian dana."*
  2. Data rekening refund dikirimkan via API ke Kost Management pada detail transaksi terkait.
  3. Owner di Kost Management melihat instruksi pengembalian dana, mentransfer secara perbankan konvensional dalam SLA target 1×24 jam, dan menekan tombol *"Refund Telah Dikirim"* (dengan opsi melampirkan nomor referensi / bukti transfer).
  4. Status pemesanan di kedua sistem diperbarui menjadi `REFUND_COMPLETED`.
- **Alternatives**:
  - *Opsi B*: Koordinasi lepas via chat WhatsApp tanpa form data rekening di aplikasi. (Ditolak: hilangnya rekam jejak sistem).
- **Reason**: Menjamin proses refund tercatat dengan jelas, transparan bagi kedua pihak, dan mencegah sengketa tanpa membebani KostAgent sebagai perantara finansial.
- **Impact**: KostAgent menyediakan endpoint `POST /api/v1/bookings/{id}/refund-account` dan webhook penerusan ke Kost Management.
- **Status**: LOCKED
