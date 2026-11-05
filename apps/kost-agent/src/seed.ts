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

  // 3. Sinkronisasikan Properti & Kamar dari Kost Management sebagai Listing Aktif Awal
  try {
    const { db: kmDb } = await import("../../kost-management/src/db");
    const kmProperty = await kmDb.property.findFirst({
      include: { rooms: true, owner: true }
    });

    if (kmProperty) {
      const partnerProperty = await db.partnerProperty.create({
        data: {
          kmPropertyId: kmProperty.id,
          ownerName: kmProperty.owner.fullName,
          ownerPhone: kmProperty.owner.phoneNumber,
          ownerWhatsapp: kmProperty.whatsappNumber,
          name: kmProperty.name,
          slug: kmProperty.slug,
          address: kmProperty.address,
          city: kmProperty.city,
          district: kmProperty.district,
          latitude: kmProperty.latitude,
          longitude: kmProperty.longitude,
          description: kmProperty.description,
          genderType: kmProperty.genderType,
          generalFacilities: kmProperty.generalFacilities,
          photos: kmProperty.photos,
          requirementsSchema: kmProperty.requirementsSchema,
          paymentBankName: kmProperty.paymentBankName,
          paymentAccountNumber: kmProperty.paymentAccountNumber,
          paymentAccountHolder: kmProperty.paymentAccountHolder,
          paymentQrisUrl: kmProperty.paymentQrisUrl,
          partnershipStatus: "ACTIVE",
          avgRating: 4.8,
          totalReviews: 12,
          lastSyncedAt: new Date()
        }
      });

      for (const r of kmProperty.rooms) {
        await db.partnerRoom.create({
          data: {
            kmRoomId: r.id,
            partnerPropertyId: partnerProperty.id,
            roomNumber: r.roomNumber,
            roomType: r.roomType,
            sizeSqm: r.sizeSqm,
            facilities: r.facilities,
            photos: r.photos,
            monthlyPrice: r.monthlyPrice,
            totalCapacity: r.totalCapacity,
            occupiedSlots: r.occupiedSlots,
            reservedSlots: r.reservedSlots,
            status: r.status,
            lastSyncedAt: new Date()
          }
        });
      }

      // Tandai juga status di KM sebagai APPROVED
      await kmDb.property.update({
        where: { id: kmProperty.id },
        data: { partnershipStatus: "APPROVED" }
      });

      console.log(`[KostAgent] Properti ${partnerProperty.name} aktif tayang di katalog publik!`);
    }
  } catch (err) {
    console.warn("[KostAgent] Lewati sinkronisasi otomatis dari KM:", err);
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
