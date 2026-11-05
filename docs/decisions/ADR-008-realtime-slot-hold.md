# ADR-008: Sinkronisasi Real-Time Slot Hold saat PENDING PAYMENT ke Source of Truth

- **Decision ID**: ADR-008
- **Date**: 2026-11-01
- **Context**: Kost Management adalah *Single Source of Truth* untuk status ketersediaan kamar. Saat customer di KostAgent menginisiasi booking dan masuk status `PENDING PAYMENT` (timer 60 menit berjalan), kuota slot kamar harus diamankan.
- **Problem**: Jika penahanan slot (hold) hanya dicatat di database KostAgent, pemilik kos di Kost Management tetap melihat kamar kosong. Jika ada calon penghuni offline (*walk-in*) yang datang, pemilik bisa mendaftarkan orang tersebut ke kamar yang sedang di-hold secara online, memicu insiden double booking fatal.
- **Decision**: Begitu transaksi booking berstatus `PENDING PAYMENT` dibuat di KostAgent, KostAgent secara **real-time memanggil API Kost Management** (`POST /api/v1/rooms/{id}/hold-slots`) untuk mencatat pemesanan sementara dengan durasi kedaluwarsa 60 menit. Jika 60 menit berakhir tanpa bukti transfer, KostAgent memanggil endpoint pelepasan (`POST /api/v1/rooms/{id}/release-slots`).
- **Alternatives**:
  - *Opsi B*: Lazy Hold (slot baru dikirim saat `PAYMENT SUBMITTED`). (Ditolak: menimbulkan jendela kerentanan 60 menit untuk double booking offline vs online).
  - *Opsi C*: Hold berbasis polling. (Ditolak: latensi tinggi dan rentan race condition).
- **Reason**: Menjamin konsistensi data ketersediaan kamar secara deterministik di Source of Truth, melindungi kamar dari alokasi offline selama customer menyelesaikan pembayaran.
- **Impact**: Kost Management menyediakan endpoint reservasi sementara berbatas waktu (hold) dan background scheduler/query check untuk melepaskan reservasi yang kedaluwarsa.
- **Status**: LOCKED
