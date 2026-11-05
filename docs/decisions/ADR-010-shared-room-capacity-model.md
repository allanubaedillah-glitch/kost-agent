# ADR-010: Model Kapasitas Kamar Bersama: Agregasi Numerik Berbasis Slot

- **Decision ID**: ADR-010
- **Date**: 2026-11-01
- **Context**: Sistem mendukung tipe kamar privat dan kamar bersama (*shared room*). Satuan kapasitas adalah orang/slot.
- **Problem**: Memodelkan setiap ranjang fisik (Bed A, Bed B, Bed C) sebagai entitas tabel terpisah menambah kompleksitas relasi database dan memerlukan UI layout visual denah kamar saat checkout.
- **Decision**: Menggunakan model **Kapasitas Numerik Agregat**. Tabel `rooms` menyimpan kolom integer:
  - `total_capacity` (Kapasitas efektif, misal 4)
  - `occupied_slots` (Jumlah slot yang dihuni aktif, misal 2)
  - `reserved_slots` (Jumlah slot yang sedang di-hold transaksi aktif, misal 1)
  Ketersediaan slot dihitung langsung:
  $$\text{available\_slots} = \text{total\_capacity} - \text{occupied\_slots} - \text{reserved\_slots}$$
  Customer memesan kuantitas slot di kamar tersebut. Penempatan kasur/ranjang fisik mana yang ditempati diserahkan secara alami saat kedatangan fisik (*check-in*).
- **Alternatives**:
  - *Opsi B*: Sub-entitas tabel `room_slots` (tiap kasur memiliki ID, label, dan status tersendiri). (Ditolak: memperumit database dan UI tanpa nilai tambah esensial untuk MVP).
- **Reason**: Skema database ringkas, transaksi penahanan slot sangat cepat dan minim deadlock, query ketersediaan dapat diindeks secara efisien.
- **Impact**: Multi-slot booking hanya memerlukan operasi aritmatika atomic `UPDATE rooms SET reserved_slots = reserved_slots + N WHERE id = ? AND (total_capacity - occupied_slots - reserved_slots) >= N`.
- **Status**: LOCKED
