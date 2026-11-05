# ADR-011: Mekanisme Handshake Kemitraan & Integrasi API Antar-Sistem

- **Decision ID**: ADR-011
- **Date**: 2026-11-01
- **Context**: Pemilik kos di Kost Management mengajukan kosnya untuk dipublikasikan ke KostAgent. Diperlukan alur handshake yang aman namun tidak membebani pengguna non-teknis.
- **Problem**: Meminta pemilik kos membuat akun developer atau menyalin token API secara manual (*copy-paste API Key*) menyulitkan pengguna awam dan memperlambat adopsi.
- **Decision**: Menggunakan **Pre-shared Platform Key / Sistem Handshake Otomatis**:
  1. Kost Management dan KostAgent memiliki kredensial komunikasi sistem internal yang dikonfigurasi melalui *environment variables* (API Key & Shared HMAC Secret).
  2. Saat owner menekan tombol *"Ajukan ke KostAgent"* dan menyetujui S&K, Kost Management secara otomatis mengirim payload pengajuan ke endpoint `POST /api/v1/partnerships/apply` di KostAgent dengan identitas owner dan data kos.
  3. KostAgent mencatat pengajuan dalam antrean review admin.
- **Alternatives**:
  - *Opsi B*: Manual API Key Exchange oleh owner. (Ditolak: UX buruk bagi pemilik kos konvensional).
- **Reason**: Alur pendaftaran mitra instan (1-klik), aman, dan terisolasi pada level server-to-server.
- **Impact**: Mengurangi gesekan pengguna (*zero onboarding friction* bagi owner untuk integrasi) dan menyederhanakan manajemen secret key pada fase MVP.
- **Status**: LOCKED
