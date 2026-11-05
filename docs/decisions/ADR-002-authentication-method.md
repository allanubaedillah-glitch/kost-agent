# ADR-002: Skema Autentikasi Pengguna Calon Penghuni (Customer)

- **Decision ID**: ADR-002
- **Date**: 2026-11-01
- **Context**: KostAgent membutuhkan sistem autentikasi calon penghuni (Customer) untuk menyimpan profil, riwayat pemesanan, dan pengunggahan bukti bayar.
- **Problem**: Solusi OTP WhatsApp atau SMS memerlukan biaya gateway per request dan vendor tambahan, sedangkan OAuth Google memerlukan konfigurasi consent screen dan credentials tambahan pada fase MVP awal.
- **Decision**: Menggunakan autentikasi berbasis **Email + Password** standar dengan token aktivasi/verifikasi email sederhana untuk MVP KostAgent.
- **Alternatives**:
  - *Opsi B*: Email + Password + Google OAuth 2.0. (Ditunda ke rilis lanjutan pasca-MVP).
  - *Opsi C*: Nomor HP + OTP WhatsApp/SMS. (Ditolak: menimbulkan direct operating cost untuk setiap registrasi/login).
- **Reason**: Implementasi cepat, aman dari spam, zero external infrastructure cost, dan arsitektur token/session standar industri (JWT / Secure Cookie).
- **Impact**:
  - Tabel `users` wajib menyimpan `email` (unique index), `password_hash` (Argon2id/Bcrypt), `is_verified` (boolean), dan `verification_token`.
  - Service pengiriman email (SMTP / local mail trap) disiapkan untuk mengirimkan link aktivasi akun.
- **Status**: LOCKED
