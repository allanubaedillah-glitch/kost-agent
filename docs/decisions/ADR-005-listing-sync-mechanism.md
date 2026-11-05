# ADR-005: Protokol Sinkronisasi Listing Kamar dari Kost Management ke KostAgent

- **Decision ID**: ADR-005
- **Date**: 2026-11-01
- **Context**: Kost Management adalah *Single Source of Truth* untuk operasional dan ketersediaan kamar. Ketika pemilik mengubah data/status kamar di Kost Management, KostAgent harus menerima pembaruan secara real-time.
- **Problem**: Polling periodik dari KostAgent membebani network dan menghasilkan delay data (*stale window*), sedangkan akses DB langsung dilarang keras oleh prinsip arsitektur.
- **Decision**: Menggunakan mekanisme **Webhook Event Push**. Kost Management mengirimkan payload HTTP POST ke endpoint KostAgent (contoh: `POST /api/v1/webhooks/kost-sync`) segera setelah data disimpan di Kost Management. Payload dilengkapi dengan header `X-Signature-SHA256` (HMAC secret token bersama) untuk otentikasi antar-sistem.
- **Alternatives**:
  - *Opsi B*: Polling periodik per 10-15 menit. (Ditolak: rentan race condition dan stale data).
  - *Opsi C*: Hybrid Webhook + Daily Reconciliation Job. (Bagus untuk phase enterprise, namun webhook push murni dengan retry policy sudah optimal untuk MVP).
- **Reason**: Menghadirkan sinkronisasi near real-time, resource-efficient, dan aman dari request tak terotorisasi.
- **Impact**:
  - KostAgent harus mengekspos endpoint webhook yang memvalidasi header signature HMAC.
  - Tabel `listings` dan `rooms` menyimpan timestamp `last_synced_at`.
  - Jika webhook gagal diproses, KostAgent mengembalikan HTTP 5xx agar Kost Management dapat memicu exponential retry.
- **Status**: LOCKED
