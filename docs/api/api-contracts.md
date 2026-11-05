# SPESIFIKASI KONTRAK API (API CONTRACTS)
## SISTEM TERPADU: KOST MANAGEMENT ↔ KOSTAGENT
**Phase**: Phase 2 — System Analysis  
**Versi**: 1.0.0 | **Tanggal**: 2026-11-01  
**Prinsip**: RESTful JSON over HTTPS, Zero Direct DB Access, HMAC-SHA256 Webhooks (ADR-000 & ADR-005)

---

## 1. STANDAR & PROTOKOL KOMUNIKASI

### 1.1 Base URL & Versi
- **Kost Management API**: `http://localhost:4000/api/v1` (Lokal Dev) / `https://km.ubaedillahproject.com/api/v1`
- **KostAgent API**: `http://localhost:3000/api/v1` (Lokal Dev) / `https://api.kostagent.com/api/v1`

### 1.2 Format Envelope Standar

#### Respon Sukses (HTTP 200, 201)
```json
{
  "success": true,
  "message": "Operasi berhasil diproses",
  "data": {}
}
```

#### Respon Galat (HTTP 400, 401, 403, 404, 409, 422, 500)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_STRING",
    "message": "Deskripsi pesan kesalahan yang jelas",
    "details": []
  }
}
```

### 1.3 Otentikasi & Keamanan Antar-Sistem
1. **Server-to-Server REST Call**: Menggunakan header HTTP Authorization:
   `Authorization: Bearer <PLATFORM_SHARED_SECRET>`
2. **Webhook Event Push**: Menggunakan verifikasi tanda tangan digital:
   `X-Signature-SHA256: <HMAC_HEX_DIGEST>`  
   *Komputasi*: `HMAC_SHA256(request_body_string, WEBHOOK_SECRET_KEY)`

---

## 2. KONTRAK API: KOST MANAGEMENT (EXPOSED UNTUK KOSTAGENT)

---

### API-KM-01: Mengambil Skema Ketentuan Dinamis Kos
- **Endpoint**: `GET /api/v1/properties/{property_id}/requirements`
- **Pemanggil**: KostAgent Service
- **Tujuan**: Mengambil aturan formulir pendaftaran dinamis kos (ADR-009).
- **Headers**:
  ```http
  Authorization: Bearer <KM_API_KEY>
  Content-Type: application/json
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "data": {
      "property_id": "prop-uuid-9901",
      "property_name": "Kost Green Living",
      "requirements": {
        "standard_presets": {
          "ktp_required": true,
          "kk_required": false,
          "proof_of_employment": true,
          "emergency_contact": true
        },
        "custom_checkboxes": [
          { "id": "cb_motor", "label": "Membawa Sepeda Motor", "is_required": false },
          { "id": "cb_smoker", "label": "Bukan Perokok Aktif", "is_required": true }
        ],
        "notes": "Dilarang membawa hewan peliharaan. Jam malam pukul 23:00 WIB."
      }
    }
  }
  ```

---

### API-KM-02: Real-Time Slot Hold Kamar (60 Menit)
- **Endpoint**: `POST /api/v1/rooms/{room_id}/hold-slots`
- **Pemanggil**: KostAgent Service
- **Tujuan**: Menahan slot kamar sementara saat booking masuk `PENDING PAYMENT` (ADR-008, UC-KM-05).
- **Request Body**:
  ```json
  {
    "booking_reference_id": "KA-202611-0089",
    "slots_count": 2,
    "idempotency_key": "c3e9821a-637f-4318-b2dc-a979357d1976"
  }
  ```
- **Response 200 OK (Hold Berhasil)**:
  ```json
  {
    "success": true,
    "message": "Slot berhasil ditahan sementara selama 60 menit",
    "data": {
      "reservation_id": "res-uuid-1122",
      "room_id": "room-uuid-4455",
      "slots_held": 2,
      "expires_at": "2026-11-01T09:05:00Z",
      "remaining_available_slots": 0
    }
  }
  ```
- **Response 409 Conflict (Kapasitas Kurang / Fail All)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "INSUFFICIENT_CAPACITY",
      "message": "Slot kamar tidak mencukupi untuk memenuhi seluruh permintaan pemesanan"
    }
  }
  ```

---

### API-KM-03: Pelepasan Slot Hold Kamar (Slot Release)
- **Endpoint**: `POST /api/v1/rooms/{room_id}/release-slots`
- **Pemanggil**: KostAgent Service
- **Tujuan**: Melepaskan slot hold karena pembatalan mandiri pre-payment atau timeout 60 menit habis (ADR-001).
- **Request Body**:
  ```json
  {
    "booking_reference_id": "KA-202611-0089",
    "reason": "CUSTOMER_CANCELLED"
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "message": "Slot kamar berhasil dilepaskan kembali ke publik",
    "data": {
      "room_id": "room-uuid-4455",
      "released_slots": 2,
      "current_available_slots": 2
    }
  }
  ```

---

### API-KM-04: Pengiriman Data Pemesanan & Bukti Bayar Masuk (Inbound Booking)
- **Endpoint**: `POST /api/v1/bookings/inbound`
- **Pemanggil**: KostAgent Service
- **Tujuan**: Meneruskan pemesanan yang telah berstatus `PAYMENT SUBMITTED` agar dapat diverifikasi oleh owner.
- **Request Body**:
  ```json
  {
    "kostagent_booking_id": "KA-202611-0089",
    "property_id": "prop-uuid-9901",
    "room_id": "room-uuid-4455",
    "customer": {
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "081234567890"
    },
    "booking_details": {
      "slots_count": 2,
      "duration_months": 3,
      "start_date": "2026-11-10",
      "end_date": "2027-02-10",
      "total_amount": 4500000.00
    },
    "occupants": [
      {
        "occupant_number": 1,
        "name": "Budi Santoso",
        "phone": "081234567890",
        "id_card_number": "3172019908870001",
        "emergency_contact": "08119876543",
        "custom_answers": {
          "cb_motor": true,
          "cb_smoker": false
        }
      },
      {
        "occupant_number": 2,
        "name": "Andi Pratama",
        "phone": "081298761234",
        "id_card_number": "3172019908870002",
        "emergency_contact": "08119876543",
        "custom_answers": {
          "cb_motor": false,
          "cb_smoker": false
        }
      }
    ],
    "payment_proof": {
      "receipt_url": "https://storage.kostagent.com/receipts/proof-KA-202611-0089.jpg",
      "sender_bank": "BCA",
      "sender_holder": "Budi Santoso",
      "submitted_at": "2026-11-01T08:15:20Z"
    }
  }
  ```
- **Response 201 Created**:
  ```json
  {
    "success": true,
    "message": "Data pemesanan dan bukti pembayaran berhasil diterima untuk diverifikasi owner",
    "data": {
      "inbound_id": "inbound-uuid-8899",
      "verification_deadline": "2026-11-02T08:15:20Z"
    }
  }
  ```

---

### API-KM-05: Pengiriman Data Rekening Pengembalian Dana (Refund Request)
- **Endpoint**: `POST /api/v1/bookings/{kostagent_booking_id}/refund-account`
- **Pemanggil**: KostAgent Service
- **Tujuan**: Meneruskan data rekening customer untuk booking yang ditolak atau dibatalkan berbayar (ADR-012).
- **Request Body**:
  ```json
  {
    "bank_name": "BCA",
    "account_number": "8870192834",
    "account_holder": "Budi Santoso",
    "refund_amount": 4500000.00,
    "reason": "OWNER_REJECTED"
  }
  ```
- **Response 200 OK**:
  ```json
  {
    "success": true,
    "message": "Data rekening refund berhasil disimpan pada antrean transfer pemilik",
    "data": {
      "refund_target_sla": "2026-11-02T09:00:00Z"
    }
  }
  ```

---

## 3. KONTRAK WEBHOOK: KOSTAGENT (EXPOSED UNTUK KOST MANAGEMENT)

---

### WH-KA-01: Webhook Sinkronisasi Data Properti & Kamar (Kost Sync)
- **Endpoint**: `POST /api/v1/webhooks/kost-sync`
- **Pemicu**: Owner menyimpan perubahan kos/kamar/kapasitas di Kost Management (ADR-005).
- **Headers**:
  ```http
  Content-Type: application/json
  X-Signature-SHA256: 7d8f3b... (HMAC)
  ```
- **Payload Body**:
  ```json
  {
    "event_id": "evt-uuid-7711",
    "event_type": "PROPERTY_UPDATED",
    "timestamp": "2026-11-01T08:00:00Z",
    "data": {
      "property_id": "prop-uuid-9901",
      "name": "Kost Green Living",
      "city": "Jakarta Barat",
      "rooms": [
        {
          "room_id": "room-uuid-4455",
          "room_number": "A-12",
          "room_type": "SHARED",
          "monthly_price": 750000.00,
          "total_capacity": 4,
          "occupied_slots": 2,
          "reserved_slots": 0,
          "status": "AVAILABLE"
        }
      ]
    }
  }
  ```
- **Response 200 OK**:
  ```json
  { "success": true, "message": "Event webhook berhasil diproses" }
  ```

---

### WH-KA-02: Webhook Keputusan Verifikasi Pemilik (ACCEPT / REJECT)
- **Endpoint**: `POST /api/v1/webhooks/booking-decision`
- **Pemicu**: Owner menekan tombol ACCEPT atau REJECT di Kost Management.
- **Payload Body**:
  ```json
  {
    "event_id": "evt-uuid-7712",
    "event_type": "BOOKING_VERIFIED",
    "timestamp": "2026-11-01T08:45:00Z",
    "data": {
      "kostagent_booking_id": "KA-202611-0089",
      "decision": "ACCEPTED",
      "rejection_reason": null,
      "verified_at": "2026-11-01T08:45:00Z"
    }
  }
  ```
- **Response 200 OK**:
  ```json
  { "success": true, "message": "Status pemesanan berhasil diperbarui menjadi ACCEPTED" }
  ```

---

### WH-KA-03: Webhook Konfirmasi Refund Ditransfer
- **Endpoint**: `POST /api/v1/webhooks/refund-completed`
- **Pemicu**: Owner menekan konfirmasi transfer pengembalian dana selesai di Kost Management.
- **Payload Body**:
  ```json
  {
    "event_id": "evt-uuid-7713",
    "event_type": "REFUND_COMPLETED",
    "timestamp": "2026-11-01T10:00:00Z",
    "data": {
      "kostagent_booking_id": "KA-202611-0089",
      "transferred_at": "2026-11-01T10:00:00Z"
    }
  }
  ```
- **Response 200 OK**:
  ```json
  { "success": true, "message": "Status booking diperbarui menjadi REFUND_COMPLETED" }
  ```

---

### WH-KA-04: Webhook Konfirmasi Check-In Penghuni
- **Endpoint**: `POST /api/v1/webhooks/check-in-confirmed`
- **Pemicu**: Owner mengonfirmasi kedatangan fisik penghuni di Kost Management.
- **Payload Body**:
  ```json
  {
    "event_id": "evt-uuid-7714",
    "event_type": "CHECK_IN_CONFIRMED",
    "timestamp": "2026-11-05T14:30:00Z",
    "data": {
      "kostagent_booking_id": "KA-202611-0089",
      "checked_in_at": "2026-11-05T14:30:00Z"
    }
  }
  ```
- **Response 200 OK**:
  ```json
  { "success": true, "message": "Status booking berhasil diperbarui menjadi CHECKED_IN" }
  ```

---

Spesifikasi kontrak REST API dan Webhook ini mendefinisikan jembatan komunikasi antar-sistem secara komprehensif, aman, dan siap langsung diimplementasikan pada kode backend.
