# ADR-006: Aturan Kelayakan Pembuatan Ulasan dan Rating (Review & Rating Eligibility)

- **Decision ID**: ADR-006
- **Date**: 2026-11-01
- **Context**: Calon penghuni membutuhkan transparansi kualitas kos melalui rating dan ulasan. Diperlukan aturan bisnis yang menentukan kapan seorang penyewa sah memberikan ulasan.
- **Problem**: Jika siapa saja boleh review, platform rentan ulasan fiktif (*review bombing*). Jika dibatasi terlalu ketat (misal hanya setelah kontrak sebulan selesai), feedback awal kos baru akan sangat lambat terkumpul.
- **Decision**: Hak fungsional untuk mengirimkan rating dan review diberikan kepada customer yang memiliki riwayat booking dengan status minimal **`ACCEPTED`**, **`CHECKED-IN`**, atau **`COMPLETED`**. Satu booking yang berhasil hanya dapat mengirimkan tepat 1 review (idempotent / one-time per booking ID).
- **Alternatives**:
  - *Opsi A*: Hanya diizinkan setelah status `CHECKED-IN` / `OCCUPIED`. (Sedikit lebih ketat, namun jika ada kendala check-in lambat diverifikasi oleh owner offline, customer kehilangan hak review atas pengalaman bookingnya).
  - *Opsi B*: Langsung setelah `ACCEPTED` saja. (Kurang komprehensif untuk aspek kelayakan fasilitas nyata).
- **Reason**: Menyeimbangkan antara mencegah ulasan fiktif (hanya booking yang sah diverifikasi owner yang boleh ulas) dan fleksibilitas bagi penghuni untuk membagikan pengalaman layanannya.
- **Impact**:
  - Validasi bisnis di service review: Memastikan `booking.customer_id == current_user.id` dan `booking.status IN ('ACCEPTED', 'CHECKED_IN', 'COMPLETED')` dan belum memiliki entri di tabel `reviews`.
- **Status**: LOCKED
