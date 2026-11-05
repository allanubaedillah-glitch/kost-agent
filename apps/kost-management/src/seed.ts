import { db } from "./db";

async function main() {
  console.log("[Kost Management] Memulai seeder data operasional awal...");

  // Hapus data lama jika ada
  await db.inboundBooking.deleteMany();
  await db.roomReservation.deleteMany();
  await db.rentBill.deleteMany();
  await db.tenant.deleteMany();
  await db.room.deleteMany();
  await db.operationalNote.deleteMany();
  await db.property.deleteMany();
  await db.owner.deleteMany();

  // 1. Buat Owner Ibu Siti
  const owner = await db.owner.create({
    data: {
      email: "ibu.siti@example.com",
      passwordHash: "$2b$10$hashedpasswordforexamplepurposeonly",
      fullName: "Hj. Siti Rahmawati",
      phoneNumber: "081298765432",
      subscriptionStatus: "ACTIVE",
      subscriptionExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
  });

  // 2. Buat Properti: Kost Siti A
  const property = await db.property.create({
    data: {
      ownerId: owner.id,
      name: "Kost Siti Melati Indah A",
      slug: "kost-siti-melati-indah-a",
      address: "Jl. Kyai Tapa No. 12, Grogol Petamburan",
      city: "Jakarta Barat",
      district: "Grogol",
      latitude: -6.1678,
      longitude: 106.7892,
      description: "Kost nyaman, aman, dan strategis dekat kampus Trisakti dan Untar. Dilengkapi fasilitas lengkap.",
      genderType: "FEMALE",
      generalFacilities: JSON.stringify(["Wi-Fi 100 Mbps", "Dapur Bersama", "Parkir Motor", "CCTV 24 Jam", "Kulkas Bersama"]),
      photos: JSON.stringify(["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]),
      contactPhone: "081298765432",
      whatsappNumber: "081298765432",
      requirementsSchema: JSON.stringify({
        standard_presets: {
          ktp_required: true,
          kk_required: false,
          proof_of_employment: true,
          emergency_contact: true
        },
        custom_checkboxes: [
          { id: "cb_motor", label: "Membawa Sepeda Motor", is_required: false },
          { id: "cb_jam_malam", label: "Sanggup Mematuhi Jam Malam (22:00 WIB)", is_required: true }
        ],
        notes: "Dilarang membawa tamu lawan jenis ke dalam kamar. Menjaga ketenangan di atas jam 21:00."
      }),
      paymentBankName: "Bank Central Asia (BCA)",
      paymentAccountNumber: "8890123456",
      paymentAccountHolder: "SITI RAHMAWATI",
      partnershipStatus: "NONE"
    }
  });

  // 3. Buat Kamar Privat (Kamar 101)
  await db.room.create({
    data: {
      propertyId: property.id,
      roomNumber: "101",
      roomType: "PRIVATE",
      sizeSqm: 16.0,
      facilities: JSON.stringify(["AC", "Kamar Mandi Dalam", "Kasur Springbed Queen", "Meja Belajar", "Lemari Pakaian"]),
      photos: JSON.stringify(["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"]),
      monthlyPrice: 1600000.0,
      totalCapacity: 1,
      occupiedSlots: 0,
      reservedSlots: 0,
      status: "AVAILABLE"
    }
  });

  // 4. Buat Kamar Bersama (Kamar 102 - 4 Slot)
  const sharedRoom = await db.room.create({
    data: {
      propertyId: property.id,
      roomNumber: "102",
      roomType: "SHARED",
      sizeSqm: 28.0,
      facilities: JSON.stringify(["AC", "Kamar Mandi Dalam", "Kasur Bunk Bed x4", "Loker Pribadi x4", "Wi-Fi"]),
      photos: JSON.stringify(["https://images.unsplash.com/photo-1555854877-bab0e564b8d5"]),
      monthlyPrice: 750000.0, // Tarif per slot per bulan
      totalCapacity: 4,
      occupiedSlots: 2, // Sudah terisi 2 penghuni offline
      reservedSlots: 0,
      status: "AVAILABLE"
    }
  });

  // 5. Catat 2 Penghuni Eksisting di Kamar 102
  await db.tenant.create({
    data: {
      propertyId: property.id,
      roomId: sharedRoom.id,
      fullName: "Rina Oktaviani",
      phoneNumber: "081311223344",
      idCardNumber: "3201019908870001",
      startDate: new Date("2026-09-01"),
      dueDate: new Date("2026-12-01"),
      monthlyRent: 750000.0,
      status: "ACTIVE"
    }
  });

  await db.tenant.create({
    data: {
      propertyId: property.id,
      roomId: sharedRoom.id,
      fullName: "Dewi Lestari",
      phoneNumber: "081355667788",
      idCardNumber: "3201019908870002",
      startDate: new Date("2026-10-01"),
      dueDate: new Date("2026-11-01"),
      monthlyRent: 750000.0,
      status: "ACTIVE"
    }
  });

  console.log(`[Kost Management] Seeder berhasil! ID Properti: ${property.id}, Kamar Shared: ${sharedRoom.id}`);
  console.log(`[Kost Management] Ketersediaan Kamar 102: Total=${sharedRoom.totalCapacity}, Terisi=2, Sisa Slot=2`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
