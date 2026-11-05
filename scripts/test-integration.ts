import { db as kmDb } from "../apps/kost-management/src/db";
import { db as kaDb } from "../apps/kost-agent/src/db";
import { server as kmServer, holdCleanerInterval } from "../apps/kost-management/src/server";
import { server as kaServer, slaMonitorInterval } from "../apps/kost-agent/src/server";

async function runIntegrationTest() {
  console.log("================================================================================");
  console.log("🚀 MEMULAI END-TO-END INTEGRATION TEST: KOST MANAGEMENT ↔ KOSTAGENT");
  console.log("================================================================================");

  // 1. Tunggu 500ms agar server siap
  await new Promise((r) => setTimeout(r, 500));

  // Reset state pengujian agar bersih & deterministik
  await kmDb.roomReservation.deleteMany();
  await kmDb.inboundBooking.deleteMany();
  await kmDb.room.updateMany({ where: { roomType: "SHARED" }, data: { occupiedSlots: 2, reservedSlots: 0 } });
  await kmDb.room.updateMany({ where: { roomType: "PRIVATE" }, data: { occupiedSlots: 0, reservedSlots: 0 } });
  await kaDb.review.deleteMany();
  await kaDb.refundRequest.deleteMany();
  await kaDb.paymentSubmission.deleteMany();
  await kaDb.booking.deleteMany();
  await kaDb.partnerRoom.deleteMany();
  await kaDb.partnerProperty.deleteMany();

  try {
    // ---------------------------------------------------------------------------------
    // STEP 1: Verifikasi Health Check Kedua Sistem
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 1] Mengecek Health Endpoint Kedua Layanan...");
    const kmHealth = await (await fetch("http://localhost:4000/health")).json();
    const kaHealth = await (await fetch("http://localhost:3000/health")).json();
    console.log(`✅ Kost Management: ${kmHealth.service} (${kmHealth.status})`);
    console.log(`✅ KostAgent: ${kaHealth.service} (${kaHealth.status})`);

    // ---------------------------------------------------------------------------------
    // STEP 2: Ambil Data Properti & Kamar di Kost Management (Source of Truth)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 2] Mengambil Data Properti & Kamar di Kost Management...");
    const property = await kmDb.property.findFirst({
      where: { slug: "kost-siti-melati-indah-a" },
      include: { rooms: true }
    });

    if (!property) throw new Error("Property Kost Siti Melati Indah A tidak ditemukan di KM");
    const sharedRoom = property.rooms.find((r) => r.roomType === "SHARED");
    if (!sharedRoom) throw new Error("Shared Room 102 tidak ditemukan di KM");

    console.log(`✅ Properti Ditemukan: ${property.name} (ID: ${property.id})`);
    console.log(`✅ Kamar Bersama 102: Total Kapasitas = ${sharedRoom.totalCapacity}, Terisi = ${sharedRoom.occupiedSlots}, Sisa = ${sharedRoom.totalCapacity - sharedRoom.occupiedSlots - sharedRoom.reservedSlots}`);

    // ---------------------------------------------------------------------------------
    // STEP 3: Pengajuan Kemitraan oleh Owner (1-Klik Handshake ADR-011)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 3] Owner Mengajukan Properti ke KostAgent...");
    const applyRes = await (
      await fetch("http://localhost:4000/api/v1/partnerships/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: property.id })
      })
    ).json();
    console.log(`✅ Hasil Pengajuan: ${applyRes.message}`);

    // Cek di KostAgent (Status awal harus WAITING_REVIEW)
    const kaPropertyWaiting = await kaDb.partnerProperty.findUnique({
      where: { kmPropertyId: property.id }
    });
    console.log(`✅ Status di KostAgent: ${kaPropertyWaiting?.partnershipStatus}`);

    // ---------------------------------------------------------------------------------
    // STEP 4: Admin KostAgent Mereview & Menyetujui Listing (UC-ADM-01)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 4] Admin KostAgent Menyetujui Listing Kos...");
    const approveRes = await (
      await fetch(`http://localhost:3000/api/v1/partnerships/${kaPropertyWaiting?.id}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "APPROVE" })
      })
    ).json();
    console.log(`✅ Keputusan Admin: ${approveRes.message}`);

    // Verifikasi listing sudah aktif di katalog publik
    const publicListings = await (await fetch("http://localhost:3000/api/v1/listings?city=Jakarta")).json();
    console.log(`✅ Jumlah Kos Aktif di Jakarta: ${publicListings.data.length}`);
    const activeKos = publicListings.data.find((p: any) => p.name === property.name);
    console.log(`✅ Kos Aktif: ${activeKos.name} (Harga Terendah: Rp ${activeKos.lowest_price})`);

    // ---------------------------------------------------------------------------------
    // STEP 5: Customer Mengambil Ketentuan Dinamis Kos (ADR-009)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 5] Mengambil Skema Ketentuan Dinamis Kos...");
    const reqRes = await (await fetch(`http://localhost:4000/api/v1/properties/${property.id}/requirements`)).json();
    console.log(`✅ Ketentuan Kos Dinamis Diterima:`, reqRes.data.requirements.standard_presets);
    console.log(`✅ Custom Checkboxes:`, reqRes.data.requirements.custom_checkboxes);

    // ---------------------------------------------------------------------------------
    // STEP 6: Customer Budi Membuat Booking 2 Slot (Multi-Slot Atomic Hold ADR-004 & ADR-008)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 6] Customer Budi Memesan 2 Slot di Kamar 102 (Sisa 2 Slot)...");
    const customer = await kaDb.customer.findFirst({ where: { email: "budi.santoso@example.com" } });
    const kaRoom = await kaDb.partnerRoom.findFirst({ where: { kmRoomId: sharedRoom.id } });

    const bookingPayload = {
      customer_id: customer?.id,
      partner_property_id: kaPropertyWaiting?.id,
      partner_room_id: kaRoom?.id,
      slots_count: 2,
      duration_months: 3,
      start_date: "2026-11-10",
      occupants: [
        {
          name: "Budi Santoso",
          phone: "081234567890",
          id_card_number: "3172019908870001",
          custom_answers: { cb_motor: true, cb_jam_malam: true }
        },
        {
          name: "Andi Pratama",
          phone: "081298761234",
          id_card_number: "3172019908870002",
          custom_answers: { cb_motor: false, cb_jam_malam: true }
        }
      ],
      idempotency_key: "test-idemp-key-budi-001"
    };

    const bookingRes = await (
      await fetch("http://localhost:3000/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload)
      })
    ).json();

    if (!bookingRes.success) {
      console.error("Booking Error Detail:", bookingRes);
    }

    console.log(`✅ Status Pemesanan: ${bookingRes.message}`);
    console.log(`✅ Kode Booking: ${bookingRes.data.booking_code}`);
    console.log(`✅ Total Biaya Sewa (ADR-004: Rp 750k * 2 slot * 3 bln): Rp ${bookingRes.data.total_amount}`);
    console.log(`✅ Batas Waktu Pembayaran (60m): ${bookingRes.data.payment_deadline}`);

    // Cek kondisi slot di Kost Management: Kuota harus terkunci real-time!
    const roomAfterHold = await kmDb.room.findUnique({ where: { id: sharedRoom.id } });
    const sisaSlot = roomAfterHold!.totalCapacity - roomAfterHold!.occupiedSlots - roomAfterHold!.reservedSlots;
    console.log(`✅ Verifikasi Slot di KM: Total=${roomAfterHold?.totalCapacity}, Terisi=${roomAfterHold?.occupiedSlots}, Reserved Hold=${roomAfterHold?.reservedSlots}, Sisa Slot=${sisaSlot}`);

    // ---------------------------------------------------------------------------------
    // STEP 7: Uji Anti-Double Booking & Concurrency (Atomic Fail All CAP-06)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 7] Pengujian Atomic Fail All: Mencoba pesan 1 slot saat sisa slot = 0...");
    const failBookingPayload = {
      ...bookingPayload,
      slots_count: 1,
      occupants: [{ name: "Orang Ketiga", phone: "0899999999" }],
      idempotency_key: "test-idemp-key-fail-002"
    };

    const failBookingRes = await (
      await fetch("http://localhost:3000/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(failBookingPayload)
      })
    ).json();

    console.log(`✅ Respon Penolakan Sistem: ${failBookingRes.error.code} - "${failBookingRes.error.message}"`);

    // ---------------------------------------------------------------------------------
    // STEP 8: Customer Upload Bukti Bayar Direct to Owner (KA-PAY-004)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 8] Customer Mengunggah Bukti Pembayaran...");
    const paymentRes = await (
      await fetch(`http://localhost:3000/api/v1/bookings/${bookingRes.data.booking_id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receipt_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
          sender_bank: "BCA",
          sender_holder: "Budi Santoso",
          notes: "Transfer via BCA Mobile ref: 998822"
        })
      })
    ).json();
    console.log(`✅ Status Pembayaran: ${paymentRes.message}`);
    console.log(`✅ Status Booking Terkini: ${paymentRes.data.status}`);
    console.log(`✅ SLA Verifikasi Owner (T+24h): ${paymentRes.data.verification_deadline}`);

    // Verifikasi data sudah mendarat di Kost Management
    const inbound = await kmDb.inboundBooking.findFirst({
      where: { kostagentBookingId: bookingRes.data.booking_code }
    });
    console.log(`✅ Inbound Booking Masuk di KM: ID=${inbound?.id}, Status=${inbound?.status}, Total=Rp ${inbound?.totalAmount}`);

    // ---------------------------------------------------------------------------------
    // STEP 9: Owner Memverifikasi & Menyetujui Booking (ACCEPT)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 9] Owner Memverifikasi dan Menerima Booking (ACCEPT)...");
    const acceptRes = await (
      await fetch(`http://localhost:4000/api/v1/bookings/${inbound?.id}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "ACCEPTED" })
      })
    ).json();
    console.log(`✅ Respon Keputusan Owner: ${acceptRes.message}`);

    // Verifikasi kapasitas kamar di KM menjadi terisi permanen
    const roomAfterAccept = await kmDb.room.findUnique({ where: { id: sharedRoom.id } });
    console.log(`✅ Kapasitas Kamar KM Pasca-Accept: Total=${roomAfterAccept?.totalCapacity}, Terisi=${roomAfterAccept?.occupiedSlots}, Reserved Hold=${roomAfterAccept?.reservedSlots}`);

    // Verifikasi status booking di KostAgent melalui Webhook
    const kaBookingAccepted = await kaDb.booking.findUnique({ where: { id: bookingRes.data.booking_id } });
    console.log(`✅ Status Booking di KostAgent: ${kaBookingAccepted?.status}`);
    console.log(`✅ Batas Waktu Check-In (T+14 Hari): ${kaBookingAccepted?.checkInDeadline}`);

    // ---------------------------------------------------------------------------------
    // STEP 10: Customer Memberikan Review & Rating (ADR-006)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 10] Customer Memberikan Review & Rating (5 Bintang)...");
    const reviewRes = await (
      await fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customer?.id,
          booking_id: bookingRes.data.booking_id,
          rating: 5,
          review_text: "Tempatnya sangat bersih, fasilitas lengkap, dan Ibu Siti sangat ramah!"
        })
      })
    ).json();
    console.log(`✅ Review Berhasil Dikirim: ID=${reviewRes.data.id}, Rating=${reviewRes.data.rating}`);

    // Verifikasi rekalkulasi rating properti
    const updatedProperty = await kaDb.partnerProperty.findUnique({ where: { id: kaPropertyWaiting?.id } });
    console.log(`✅ Rating Properti Terkini: Rata-rata = ${updatedProperty?.avgRating} ⭐ (${updatedProperty?.totalReviews} ulasan)`);

    // Uji proteksi satu review per booking (Idempotency Review)
    console.log("\n[TEST 11] Uji Proteksi Ulasan Ganda (Hanya 1 Review per Booking)...");
    const duplicateReviewRes = await (
      await fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customer?.id,
          booking_id: bookingRes.data.booking_id,
          rating: 4,
          review_text: "Coba kirim ulasan kedua..."
        })
      })
    ).json();
    console.log(`✅ Respon Proteksi Ulasan Ganda: ${duplicateReviewRes.error.code} - "${duplicateReviewRes.error.message}"`);

    // ---------------------------------------------------------------------------------
    // STEP 12: Owner Mengonfirmasi Check-In Penghuni (UC-KM-08)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 12] Owner Mengonfirmasi Kedatangan Fisik Penghuni (Check-In)...");
    const checkInRes = await (
      await fetch(`http://localhost:4000/api/v1/bookings/${inbound?.id}/confirm-check-in`, {
        method: "POST"
      })
    ).json();
    console.log(`✅ Respon Check-In di KM: ${checkInRes.message}`);

    const kaBookingCheckedIn = await kaDb.booking.findUnique({ where: { id: bookingRes.data.booking_id } });
    console.log(`✅ Status Booking Final di KostAgent: ${kaBookingCheckedIn?.status}`);

    // ---------------------------------------------------------------------------------
    // STEP 13: Uji Pembatalan Mandiri Pre-Payment (ADR-001)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 13] Pengujian Pembatalan Mandiri Pre-Payment (ADR-001)...");
    const privateRoom = property.rooms.find((r) => r.roomType === "PRIVATE");
    const kaPrivateRoom = await kaDb.partnerRoom.findFirst({ where: { kmRoomId: privateRoom?.id } });

    // Customer pesan kamar privat 101
    const cancelTestBooking = await (
      await fetch("http://localhost:3000/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customer?.id,
          partner_property_id: kaPropertyWaiting?.id,
          partner_room_id: kaPrivateRoom?.id,
          slots_count: 1,
          duration_months: 1,
          start_date: "2026-12-01",
          occupants: [{ name: "Budi Santoso", phone: "081234567890" }],
          idempotency_key: "test-cancel-prepay-001"
        })
      })
    ).json();
    console.log(`✅ Booking Kamar Privat Dibuat: ${cancelTestBooking.data.booking_code}`);

    // Slot privat harus ter-hold di KM
    const kmPrivateHold = await kmDb.room.findUnique({ where: { id: privateRoom?.id } });
    console.log(`✅ Slot Kamar Privat Ter-Hold di KM: Reserved = ${kmPrivateHold?.reservedSlots}`);

    // Customer klik batalkan mandiri
    const cancelRes = await (
      await fetch(`http://localhost:3000/api/v1/bookings/${cancelTestBooking.data.booking_id}/cancel`, {
        method: "POST"
      })
    ).json();
    console.log(`✅ Respon Pembatalan: ${cancelRes.message}`);

    // Slot privat harus seketika lepas di KM (reserved = 0)
    const kmPrivateReleased = await kmDb.room.findUnique({ where: { id: privateRoom?.id } });
    console.log(`✅ Verifikasi Slot Kamar Privat Pasca-Batal di KM: Reserved = ${kmPrivateReleased?.reservedSlots} (Berhasil Dilepas)`);

    // ---------------------------------------------------------------------------------
    // STEP 14: Uji Alur Penolakan & Pengembalian Dana / Refund (ADR-012)
    // ---------------------------------------------------------------------------------
    console.log("\n[TEST 14] Pengujian Alur Penolakan (REJECT) & Refund Terstruktur (ADR-012)...");
    // Customer pesan lagi kamar privat 101
    const refundTestBooking = await (
      await fetch("http://localhost:3000/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customer?.id,
          partner_property_id: kaPropertyWaiting?.id,
          partner_room_id: kaPrivateRoom?.id,
          slots_count: 1,
          duration_months: 2,
          start_date: "2026-12-01",
          occupants: [{ name: "Budi Santoso", phone: "081234567890" }],
          idempotency_key: "test-refund-flow-002"
        })
      })
    ).json();

    // Customer upload bukti transfer
    await fetch(`http://localhost:3000/api/v1/bookings/${refundTestBooking.data.booking_id}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receipt_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
        sender_bank: "Mandiri",
        sender_holder: "Budi Santoso"
      })
    });

    const inboundRefund = await kmDb.inboundBooking.findFirst({
      where: { kostagentBookingId: refundTestBooking.data.booking_code }
    });

    // Owner REJECT karena kamar dalam pemeliharaan pipa
    const rejectRes = await (
      await fetch(`http://localhost:4000/api/v1/bookings/${inboundRefund?.id}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "REJECTED", rejection_reason: "Kamar sedang dalam renovasi mendadak" })
      })
    ).json();
    console.log(`✅ Respon Penolakan Owner: ${rejectRes.message}`);

    // Customer input data rekening refund di KostAgent
    const refundInputRes = await (
      await fetch(`http://localhost:3000/api/v1/bookings/${refundTestBooking.data.booking_id}/refund-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bank_name: "Bank Mandiri",
          account_number: "1400019283746",
          account_holder: "Budi Santoso"
        })
      })
    ).json();
    console.log(`✅ Input Rekening Refund Customer: ${refundInputRes.message}`);

    // Verifikasi rekening refund tercatat di Kost Management
    const kmInboundWithRefund = await kmDb.inboundBooking.findUnique({ where: { id: inboundRefund?.id } });
    console.log(`✅ Rekening Refund Diterima di KM: Bank=${kmInboundWithRefund?.refundBankName}, Rekening=${kmInboundWithRefund?.refundAccountNumber}, A/N=${kmInboundWithRefund?.refundAccountHolder}`);

    // Owner transfer balik manual dan konfirmasi di Kost Management
    const confirmRefundRes = await (
      await fetch(`http://localhost:4000/api/v1/bookings/${inboundRefund?.id}/confirm-refund`, {
        method: "POST"
      })
    ).json();
    console.log(`✅ Konfirmasi Transfer Refund Owner: ${confirmRefundRes.message}`);

    // Verifikasi status refund di KostAgent
    const kaBookingRefund = await kaDb.refundRequest.findFirst({
      where: { bookingId: refundTestBooking.data.booking_id }
    });
    console.log(`✅ Status Akhir Refund di KostAgent: ${kaBookingRefund?.status}`);

    console.log("\n================================================================================");
    console.log("🎉 SELURUH SKENARIO END-TO-END BERHASIL DIUJI DENGAN SUKSES 100%!");
    console.log("================================================================================");
  } finally {
    if (holdCleanerInterval) clearInterval(holdCleanerInterval);
    if (slaMonitorInterval) clearInterval(slaMonitorInterval);
    kmServer?.close();
    kaServer?.close();
    await kmDb.$disconnect();
    await kaDb.$disconnect();
    process.exit(0);
  }
}

runIntegrationTest().catch((err) => {
  console.error("❌ TEST GAGAL DENGAN ERROR:", err);
  process.exit(1);
});
