# ADR-001: Kebijakan Pembatalan Mandiri oleh Calon Penghuni (Pre-Verification)

- **Decision ID**: ADR-001
- **Date**: 2026-11-01
- **Context**: Pada alur pemesanan kamar di KostAgent, customer melewati tahap `PENDING PAYMENT` (menunggu pembayaran) dan `PAYMENT SUBMITTED` (bukti transfer sudah diunggah, menunggu verifikasi pemilik). Dibutuhkan kepastian fungsional apakah customer dapat membatalkan booking secara mandiri pada kedua status tersebut.
- **Problem**: Jika customer tidak bisa membatalkan saat `PENDING PAYMENT`, slot terkunci sia-sia selama 60 menit penuh jika customer berubah pikiran. Sebaliknya, jika customer dapat membatalkan sepihak saat `PAYMENT SUBMITTED`, uang yang mungkin sudah ditransfer ke rekening owner akan menciptakan sengketa (dispute) tanpa verifikasi owner.
- **Decision**: 
  1. Customer **diberikan hak fungsional untuk membatalkan booking** secara mandiri saat status masih `PENDING PAYMENT`. Tindakan ini langsung mengubah status booking menjadi `CANCELLED` dan secara instan melepaskan slot reservasi kamar kembali ke publik.
  2. Customer **dilarang membatalkan booking secara mandiri** saat status telah berubah menjadi `PAYMENT SUBMITTED`. Pada tahap ini pembatalan hanya dapat diproses melalui mekanisme penolakan/review oleh pemilik kos (`REJECTED` -> `REFUND`).
- **Alternatives**:
  - *Opsi B*: Mengizinkan pembatalan di kedua status dengan status otomatis `CANCELLED_REFUND_PENDING`. (Ditolak: rentan manipulasi customer yang belum transfer tapi klaim refund).
  - *Opsi C*: Tidak ada tombol batalkan sama sekali; membiarkan timeout 60 menit habis. (Ditolak: menurunkan utilitas ketersediaan kamar bagi customer lain).
- **Reason**: Memberikan pengalaman pengguna yang fleksibel tanpa mengorbankan integritas status pembayaran dan beban operasional pemilik kos.
- **Impact**: 
  - Backend harus menyediakan endpoint `POST /api/v1/bookings/{id}/cancel` dengan guard status `PENDING PAYMENT`.
  - Service alokasi kapasitas harus memicu pelepasan slot kamar secara instan saat pembatalan terjadi.
- **Status**: LOCKED
