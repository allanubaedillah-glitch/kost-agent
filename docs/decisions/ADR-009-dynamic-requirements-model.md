# ADR-009: Model Data Ketentuan Kos: Preset Standard Checkboxes dengan Dukungan Custom Checkboxes Dinamis

- **Decision ID**: ADR-009
- **Date**: 2026-11-01
- **Context**: Setiap kos memiliki syarat administrasi calon penghuni yang berbeda (contoh: Kos A butuh NIK & KTP; Kos B butuh No HP & Surat Mahasiswa). KostAgent harus menampilkan formulir pendaftaran dinamis sesuai ketentuan yang diset oleh owner di Kost Management.
- **Problem**: Membangun visual drag-and-drop schema builder penuh berlebihan (*over-engineering*) untuk MVP, sementara daftar isian hardcoded statis tidak fleksibel terhadap kebutuhan unik tiap pemilik kos.
- **Decision**: 
  1. Kost Management menyediakan **Preset Standard Checkboxes** yang dapat dicentang owner:
     - `[ ] Wajib KTP / Foto Identitas`
     - `[ ] Wajib Kartu Keluarga (KK)`
     - `[ ] Wajib Bukti Status / Pekerjaan / Kartu Mahasiswa`
     - `[ ] Wajib Kontak Darurat`
  2. Owner **dapat menambahkan Custom Checkbox Dinamis** sesuai kebutuhan kosnya (contoh: *"Membawa Kendaraan Mobil"*, *"Membawa Alat Elektronik Berat"*). Tiap custom item menyimpan atribut `{ id, label, is_required }`.
  3. Disertakan satu field teks untuk **Catatan Ketentuan & Tata Tertib Kos**.
  4. KostAgent mengambil struktur JSON ketentuan ini via API dan me-render form input secara dinamis untuk setiap penghuni.
- **Alternatives**:
  - *Opsi B*: Full Dynamic Form Builder dengan JSON Schema arbitrary types. (Ditolak: kompleksitas validasi dan rendering terlalu tinggi untuk MVP).
  - *Opsi C*: Form statis seragam untuk semua kos. (Ditolak: melanggar prinsip bisnis baseline Kost Agent.pdf).
- **Reason**: Menyeimbangkan antara kecepatan implementasi MVP, validasi data yang tangguh dan aman, serta fleksibilitas bagi pemilik kos untuk menambah persyaratan kustom.
- **Impact**: Tabel `properties` di Kost Management menyimpan `requirements_schema` dalam format JSON/array of objects. Form generator di KostAgent merender input field dan validasi berdasarkan array tersebut.
- **Status**: LOCKED
