# ADR-007: Struktur Repositori Monorepo Dual-Service dengan Isolasi Database Penuh

- **Decision ID**: ADR-007
- **Date**: 2026-11-01
- **Context**: Sistem terdiri dari dua produk berbeda milik entitas berbeda: Kost Management (SaaS operasional pemilik kos oleh UbaedillahProject) dan KostAgent (platform publik agregasi & booking oleh PT. AlanGantengBanget). Keduanya tidak boleh berbagi database langsung dan hanya berkomunikasi via API.
- **Problem**: Mengelola dua repositori terpisah oleh pengembang individu memperlambat alur integrasi lokal dan pengujian end-to-end, namun menggabungkan database melanggar prinsip kepemilikan data sistem.
- **Decision**: Menggunakan struktur **Monorepo Bersih** dalam satu workspace dengan pemisahan direktori aplikasi yang tegas:
  - `/apps/kost-management`: Aplikasi backend, web dashboard, dan database internal operasional owner.
  - `/apps/kost-agent`: Aplikasi backend, web portal publik, dan database platform publik KostAgent.
  Masing-masing aplikasi memiliki database file/koneksi terpisah (misal dua file database SQLite/koneksi terpisah), konfigurasi environment terpisah, dan berkomunikasi murni melalui HTTP REST API / Webhook.
- **Alternatives**:
  - *Opsi B*: Repositori terpisah untuk masing-masing sistem. (Ditolak: overhead manajemen repo berlebih untuk pengerjaan solo dev).
  - *Opsi C*: Single backend/single DB dengan pemisahan role. (Ditolak: melanggar prinsip non-negotiable arsitektur baseline).
- **Reason**: Memberikan kemudahan setup pengembangan lokal, automasi pengujian API antar-sistem secara terpadu, sekaligus mempertahankan kemandirian arsitektur dan isolasi data 100%.
- **Impact**: Root workspace akan menaungi dua folder aplikasi independen di `/apps`. Tidak ada foreign key atau relasi langsung antara database Kost Management dan database KostAgent.
- **Status**: LOCKED
