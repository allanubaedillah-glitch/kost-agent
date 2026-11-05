# ADR-003: Penanganan Eskalasi SLA Verifikasi Pembayaran Pemilik Kos (1x24 Jam)

- **Decision ID**: ADR-003
- **Date**: 2026-11-01
- **Context**: Pemilik kos memiliki batas waktu maksimal 1×24 jam untuk memverifikasi pembayaran yang telah di-submit oleh customer. Dokumen baseline melarang pelepasan slot secara sepihak jika verifikasi terlambat karena customer berpotensi telah benar-benar mentransfer dana.
- **Problem**: Jika 24 jam terlampaui tanpa aksi dari pemilik kos, sistem tidak boleh melakukan auto-cancel, namun status tidak boleh menggantung tanpa pengawasan.
- **Decision**: Booking yang melewati batas waktu verifikasi 1×24 jam tetap mempertahankan status `PAYMENT SUBMITTED` dan slot tetap ditahan, namun sistem secara otomatis memberikan flag/indikator **`NEEDS ATTENTION`** serta menerbitkan peringatan eskalasi pada dashboard Admin KostAgent untuk tindakan follow-up operasional manual (telepon/WhatsApp ke pemilik kos).
- **Alternatives**:
  - *Opsi B*: Auto-reject booking dan kirim perintah refund ke owner. (Ditolak: berisiko merugikan customer yang telah transfer dan owner yang hanya terlambat login).
  - *Opsi C*: Membiarkan status menggantung tanpa alert ke admin. (Ditolak: merusak kepastian customer dan menurunkan reputasi platform).
- **Reason**: Menjaga dana customer tetap aman, mencegah alokasi ganda kamar, sekaligus memberikan visibilitas operasional bagi tim admin KostAgent untuk mengintervensi keterlambatan mitra.
- **Impact**:
  - Kolom `verification_deadline` dicatat saat customer upload bukti bayar (`created_at + 24 hours`).
  - Scheduler/cron job mengecek booking dengan kondisi `status = PAYMENT_SUBMITTED` dan `NOW() > verification_deadline` untuk menaikkan flag eskalasi.
- **Status**: LOCKED
