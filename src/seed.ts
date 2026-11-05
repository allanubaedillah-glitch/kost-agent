import { db } from "./db";

async function main() {
  console.log("[KostAgent] Memulai seeder data platform awal...");

  await db.securityAuditLog.deleteMany();
  await db.review.deleteMany();
  await db.refundRequest.deleteMany();
  await db.paymentSubmission.deleteMany();
  await db.booking.deleteMany();
  await db.partnerRoom.deleteMany();
  await db.partnerProperty.deleteMany();
  await db.adminUser.deleteMany();
  await db.customer.deleteMany();

  // 1. Buat Admin KostAgent (PT. AlanGantengBanget)
  const admin = await db.adminUser.create({
    data: {
      email: "admin@kostagent.com",
      passwordHash: "$2b$10$hashedadminpassword2026",
      fullName: "Super Admin KostAgent",
      role: "SUPERADMIN"
    }
  });

  // 2. Buat Customer: Budi Santoso & Allan
  const customer = await db.customer.create({
    data: {
      email: "budi.santoso@example.com",
      passwordHash: "$2b$10$hashedcustomerpassword2026",
      fullName: "Budi Santoso",
      phoneNumber: "081234567890",
      isVerified: true
    }
  });

  const customerAllan = await db.customer.create({
    data: {
      email: "allan@customer.com",
      passwordHash: "$2b$10$hashedcustomerallan2026",
      fullName: "Allan Prakosa",
      phoneNumber: "081234567891",
      isVerified: true
    }
  });

  // 3. Properti & Kamar Mitra Listing Awal
  try {
    const partnerProperty = await db.partnerProperty.create({
      data: {
        kmPropertyId: "prop-siti-melati-001",
        ownerName: "Hj. Siti Rahmawati",
        ownerPhone: "081298765432",
        ownerWhatsapp: "081298765432",
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
        requirementsSchema: JSON.stringify({
          standard_presets: {
            ktp_required: true,
            kk_required: false,
            proof_of_employment: true,
            emergency_contact: true
          }
        }),
        paymentBankName: "BCA",
        paymentAccountNumber: "8830192831",
        paymentAccountHolder: "Hj. Siti Rahmawati",
        paymentQrisUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126580016ID.CO.QRIS.WWW01189360052300000123455204581253033605802ID5914KOST%20SITI%20MELATI6007JAKARTA6304ABCD",
        partnershipStatus: "ACTIVE",
        avgRating: 4.8,
        totalReviews: 12,
        lastSyncedAt: new Date()
      }
    });

    await db.partnerRoom.create({
      data: {
        kmRoomId: "room-deluxe-001",
        partnerPropertyId: partnerProperty.id,
        roomNumber: "A-101",
        roomType: "DELUXE",
        sizeSqm: 16.0,
        facilities: JSON.stringify(["AC", "Kamar Mandi Dalam", "Water Heater", "Kasur Queen", "Meja Belajar", "Lemari Baju"]),
        photos: JSON.stringify(["https://images.unsplash.com/photo-1598928506311-c55ded91a20c"]),
        monthlyPrice: 1850000,
        totalCapacity: 1,
        occupiedSlots: 0,
        reservedSlots: 0,
        status: "AVAILABLE",
        lastSyncedAt: new Date()
      }
    });

    console.log(`[KostAgent] Properti ${partnerProperty.name} aktif tayang di katalog publik!`);
  } catch (err) {
    console.warn("[KostAgent] Warning pada seed properti:", err);
  }

  console.log(`[KostAgent] Seeder berhasil! Admin ID: ${admin.id}, Customer: ${customer.fullName}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
