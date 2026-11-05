# ADR-000: Arsitektur Sistem Baseline dan Batasan Ekosistem (Baseline dari Dokumen Kost Agent)

- **Decision ID**: ADR-000
- **Date**: 2026-11-01
- **Context**: Integrasi antara sistem operasional kos dan platform agregasi/pencarian publik.
- **Problem**: Menghubungkan dua entitas bisnis yang berbeda (Kost Management milik UbaedillahProject dan KostAgent milik PT. AlanGantengBanget) tanpa saling mengikat arsitektur internal atau membahayakan data operasional sensitif.
- **Decision**:
  1. **Pemisahan Kepemilikan & Database**: Database Kost Management dan KostAgent terpisah 100%. Tidak ada koneksi database langsung antar sistem.
  2. **Jembatan API**: Komunikasi hanya melalui REST API dan Webhook yang aman. Integrasi bersifat opsional bagi pemilik kos.
  3. **Source of Truth**: Kost Management adalah *Single Source of Truth* untuk ketersediaan kamar, operasional, dan data fasilitas kamar.
  4. **Metode Pembayaran**: KostAgent bukan escrow / payment wallet. Pembayaran sewa langsung ditujukan ke nomor rekening/kanal pemilik kos. Bukti bayar diunggah di KostAgent dan diverifikasi oleh pemilik kos di Kost Management.
  5. **Unit Alokasi Kapasitas**: Kapasitas dihitung berdasarkan unit **slot/orang**. Mendukung kamar privat dan kamar bersama.
  6. **Multi-Slot Atomic Allocation**: Jika customer memesan $N$ slot, semua $N$ slot harus dialokasikan secara atomik. Jika kuota tidak mencukupi, seluruh pemesanan ditolak (*FAIL ALL*).
  7. **Timeout Pembayaran**: Dibatasi 60 menit sejak booking dibuat hingga upload bukti transfer.
  8. **Batas Verifikasi Owner**: Maksimal 1×24 jam sejak bukti diunggah.
  9. **Batas Check-In**: Maksimal 14 hari kalender sejak pemesanan disetujui owner.
  10. **Refund**: Dikelola dan dieksekusi secara manual oleh pemilik kos.
  11. **Prinsip Minimum Access**: Admin KostAgent tidak memiliki akses bebas ke dokumen sensitif customer kecuali terdapat sengketa aktif yang tercatat di audit log.
  12. **Scope MVP**: Operator/staf terpisah untuk owner kos ditiadakan (ditunda ke Next Patch).
- **Reason**: Baseline resmi dari dokumen master *Kost Agent.pdf* yang disetujui para pemangku kepentingan.
- **Impact**: Menjadi fondasi seluruh perancangan Functional Requirements, Use Cases, ERD, dan API Contracts.
- **Status**: LOCKED
