import { Property, Room, Booking, Review, User, AdminAuditLog } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-customer-01',
    name: 'Allan Gemilang',
    email: 'allan@kostagent.com',
    phone: '081234567890',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    createdAt: '2026-10-15T08:00:00Z',
  },
  {
    id: 'usr-admin-01',
    name: 'Budi Santoso (Admin Ops)',
    email: 'admin@kostagent.id',
    phone: '081198765432',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    isVerified: true,
    createdAt: '2026-09-01T08:00:00Z',
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-01',
    slug: 'kost-graha-kemang-exclusive',
    name: 'Kost Graha Kemang Exclusive',
    type: 'campur',
    address: 'Jl. Kemang Timur No. 42B, Bangka, Mampang Prapatan',
    city: 'Jakarta Selatan',
    district: 'Mampang Prapatan',
    description: 'Kos eksklusif bernuansa modern minimalis di jantung Kemang. Sangat tenang, aman, bebas banjir, dan dekat dengan berbagai pusat kuliner dan perkantoran TB Simatupang. Dilengkapi fasilitas modern seperti smart door lock dan WiFi 100 Mbps.',
    coverImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: [
      'WiFi Cepat 100 Mbps',
      'Parkir Mobil & Motor Luas',
      'Dapur Bersama Modern',
      'Security & CCTV 24 Jam',
      'Ruang Tamu & Co-working',
      'Mesin Cuci Bersama',
      'Akses Kunci Kartu 24 Jam'
    ],
    rulesNotes: 'Gerbang utama buka 24 jam dengan akses kartu RFID. Dilarang membawa hewan peliharaan. Tamu lawan jenis dilarang menginap.',
    rulesCheckboxes: [
      { id: 'rule-ktp', label: 'Wajib KTP / NIK Resmi', isRequired: true, isPreset: true },
      { id: 'rule-kk', label: 'Kartu Keluarga (KK)', isRequired: false, isPreset: true },
      { id: 'rule-work', label: 'Bukti Kerja / Kartu Mahasiswa Aktif', isRequired: true, isPreset: true },
      { id: 'rule-emer', label: 'Nomor Kontak Darurat Keluarga', isRequired: true, isPreset: true },
      { id: 'rule-dp', label: 'Setuju Pembayaran Langsung ke Rekening Pemilik', isRequired: true, isPreset: false }
    ],
    bankAccount: {
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8830192811',
      accountHolder: 'Hj. Ratna Sari (Graha Kemang)',
      qrisUrl: 'https://images.unsplash.com/photo-1595079672139-62c0fecb363b?auto=format&fit=crop&w=400&q=80'
    },
    ownerContact: {
      name: 'Hj. Ratna Sari',
      phone: '081288889999',
      email: 'ratna.kemang@gmail.com'
    },
    partnershipStatus: 'ACTIVE',
    lastSyncAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    rating: 4.8,
    reviewCount: 18
  },
  {
    id: 'prop-02',
    slug: 'kost-putri-dago-asri-bandung',
    name: 'Kost Putri Dago Asri ITB',
    type: 'putri',
    address: 'Jl. Dago Asri Raya No. 15, Dago, Coblong',
    city: 'Bandung',
    district: 'Coblong',
    description: 'Kos khusus putri yang asri, sejuk, dan aman. Berada di lingkungan perumahan elite Dago Asri, hanya 7 menit jalan kaki ke Kampus ITB Ganesha. Penjagaan ibu kos ramah dan siaga 24 jam.',
    coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: [
      'WiFi Indihome 50 Mbps',
      'Dapur Bersama + Kulkas',
      'Dispenser Air Minum Gratis',
      'Parkir Motor Beratap',
      'Penjaga Kos 24 Jam',
      'Jemuran Luas'
    ],
    rulesNotes: 'Khusus mahasiswi / karyawati wanita. Jam malam pukul 22.30 WIB untuk keamanan bersama. Dilarang merokok.',
    rulesCheckboxes: [
      { id: 'rule-ktp-2', label: 'Wajib KTP / NIK', isRequired: true, isPreset: true },
      { id: 'rule-student-2', label: 'Kartu Tanda Mahasiswa (KTM)', isRequired: true, isPreset: true },
      { id: 'rule-emer-2', label: 'Kontak Darurat Orang Tua / Wali', isRequired: true, isPreset: true }
    ],
    bankAccount: {
      bankName: 'Bank Mandiri',
      accountNumber: '1310088992211',
      accountHolder: 'Ibu Hj. Nining Dago'
    },
    ownerContact: {
      name: 'Ibu Nining',
      phone: '081399887766',
      email: 'nining.dago@gmail.com'
    },
    partnershipStatus: 'ACTIVE',
    lastSyncAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    rating: 4.9,
    reviewCount: 24
  },
  {
    id: 'prop-03',
    slug: 'kost-putra-ugm-kaliurang-living',
    name: 'Kost Putra Kaliurang Living UGM',
    type: 'putra',
    address: 'Jl. Kaliurang KM 5.2, Gang Megatruh No. 8, Caturtunggal, Depok',
    city: 'Yogyakarta',
    district: 'Depok Sleman',
    description: 'Kos putra modern fasilitas hotel dengan harga mahasiswa. Lokasi strategis dekat Kampus UGM, UNY, dan jalan utama Kaliurang. Parkir mobil dan motor sangat leluasa.',
    coverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: [
      'WiFi Biznet 150 Mbps',
      'Parkir Mobil & Motor Sangat Luas',
      'Gym Mini & Meja Pingpong',
      'Kantin & Mini Cafe',
      'Akses Bebas 24 Jam',
      'CCTV Monitoring'
    ],
    rulesNotes: 'Bebas jam malam. Menjaga ketertiban dan toleransi sesama penghuni.',
    rulesCheckboxes: [
      { id: 'rule-ktp-3', label: 'Wajib KTP / NIK', isRequired: true, isPreset: true },
      { id: 'rule-emer-3', label: 'Nomor Kontak Darurat', isRequired: true, isPreset: true }
    ],
    bankAccount: {
      bankName: 'Bank BNI',
      accountNumber: '0459812739',
      accountHolder: 'Bambang Triyono'
    },
    ownerContact: {
      name: 'Pak Bambang Triyono',
      phone: '081804123456',
      email: 'bambang.kaliurang@gmail.com'
    },
    partnershipStatus: 'ACTIVE',
    lastSyncAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    rating: 4.7,
    reviewCount: 12
  },
  {
    id: 'prop-04',
    slug: 'kost-residence-bsd-city',
    name: 'Kost Residence BSD City (Pengajuan Baru)',
    type: 'campur',
    address: 'Jl. Edutown No. B-3, Pagedangan, BSD City',
    city: 'Tangerang Selatan',
    district: 'Pagedangan',
    description: 'Properti kos baru siap huni di dekat Prasetiya Mulya dan ICE BSD. Fasilitas serba baru dengan perabotan kayu jati modern.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: [
      'WiFi Cepat',
      'Parkir Mobil',
      'Dapur Bersama',
      'Kolam Renang Cluster'
    ],
    rulesNotes: 'Tertib dan menjaga kebersihan.',
    rulesCheckboxes: [
      { id: 'rule-ktp-4', label: 'Wajib KTP / NIK', isRequired: true, isPreset: true }
    ],
    bankAccount: {
      bankName: 'BCA',
      accountNumber: '5540192837',
      accountHolder: 'David Sutanto'
    },
    ownerContact: {
      name: 'David Sutanto',
      phone: '081299881122',
      email: 'david.bsd@gmail.com'
    },
    partnershipStatus: 'WAITING_REVIEW',
    lastSyncAt: new Date().toISOString(),
    rating: 0,
    reviewCount: 0
  }
];

export const INITIAL_ROOMS: Room[] = [
  // Rooms for Graha Kemang (prop-01)
  {
    id: 'rm-01',
    propertyId: 'prop-01',
    name: 'Deluxe Suite A-101 (Privat)',
    type: 'privat',
    sizeM2: 20,
    facilities: ['AC Daikin 1 PK', 'Kamar Mandi Dalam + Water Heater', 'Kasur Queen Bed', 'Meja Kerja & Ergonomic Chair', 'Smart TV 32"', 'Lemari 3 Pintu', 'Kulkas Mini'],
    pricePerMonth: 2750000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rm-02',
    propertyId: 'prop-01',
    name: 'Standard Private A-102 (Privat)',
    type: 'privat',
    sizeM2: 16,
    facilities: ['AC Sharp 0.5 PK', 'Kamar Mandi Luar Bersih', 'Kasur Single Bed 120x200', 'Meja Kerja', 'Lemari Pakaian'],
    pricePerMonth: 1950000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 1, // Currently held by demo booking!
    status: 'TERSEDIA',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rm-03',
    propertyId: 'prop-01',
    name: 'Twin Sharing Room B-201 (Kamar Bersama)',
    type: 'bersama',
    sizeM2: 28,
    facilities: ['AC Daikin 1.5 PK', 'Kamar Mandi Dalam', '2 Ranjang Single Terpisah', '2 Set Meja Belajar', '2 Lemari Pribadi Terkunci'],
    pricePerMonth: 1250000, // Rp 1.250.000 / slot per bulan
    totalCapacity: 2,
    occupiedSlots: 1,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Rooms for Dago ITB (prop-02)
  {
    id: 'rm-04',
    propertyId: 'prop-02',
    name: 'Kamar Mawar 01 (Privat Balkon)',
    type: 'privat',
    sizeM2: 18,
    facilities: ['Jendela Besar & Balkon Dago', 'Kamar Mandi Dalam', 'Kasur Springbed', 'Meja Belajar Luas', 'Lemari', 'Kipas Angin / Udara Sejuk Dago'],
    pricePerMonth: 1600000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'rm-05',
    propertyId: 'prop-02',
    name: 'Kamar Melati Quad 02 (Bersama 4 Slot)',
    type: 'bersama',
    sizeM2: 36,
    facilities: ['4 Bed Susun Kokoh', '2 Kamar Mandi Dalam', '4 Meja Belajar', 'Loker Kunci Pribadi'],
    pricePerMonth: 850000, // Rp 850.000 / slot per bulan
    totalCapacity: 4,
    occupiedSlots: 2,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Rooms for Kaliurang UGM (prop-03)
  {
    id: 'rm-06',
    propertyId: 'prop-03',
    name: 'Kamar Executive 101 (Privat)',
    type: 'privat',
    sizeM2: 18,
    facilities: ['AC LG 1 PK', 'Kamar Mandi Dalam + Water Heater', 'Kasur Springbed 160x200', 'Meja Komputer & Kursi Gaming', 'Lemari 2 Pintu'],
    pricePerMonth: 1500000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BKG-2026-9001',
    idempotencyKey: 'idem-bkg-9001',
    propertyId: 'prop-01',
    propertyName: 'Kost Graha Kemang Exclusive',
    propertyCity: 'Jakarta Selatan',
    propertyAddress: 'Jl. Kemang Timur No. 42B, Bangka',
    propertyCoverImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    roomId: 'rm-02',
    roomName: 'Standard Private A-102 (Privat)',
    roomType: 'privat',
    pricePerSlotMonthly: 1950000,
    customerId: 'usr-customer-01',
    customerName: 'Allan Gemilang',
    customerEmail: 'allan@kostagent.com',
    customerPhone: '081234567890',
    checkInDate: '2026-11-15',
    durationMonths: 1,
    requestedSlots: 1,
    totalAmount: 1950000,
    occupants: [
      {
        slotIndex: 1,
        fullName: 'Allan Gemilang',
        phone: '081234567890',
        nik: '3201234567890001',
        emergencyContact: '081122334455 (Ibu Kandung)',
        ktpUploaded: true,
        workOrStudentCardUploaded: true,
        customRequirementsAnswers: {
          'rule-dp': true
        }
      }
    ],
    status: 'PENDING_PAYMENT',
    paymentHoldExpiresAt: new Date(Date.now() + 1000 * 60 * 48).toISOString(), // 48 mins remaining
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString()
  },
  {
    id: 'BKG-2026-8802',
    idempotencyKey: 'idem-bkg-8802',
    propertyId: 'prop-02',
    propertyName: 'Kost Putri Dago Asri ITB',
    propertyCity: 'Bandung',
    propertyAddress: 'Jl. Dago Asri Raya No. 15, Dago',
    propertyCoverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    roomId: 'rm-04',
    roomName: 'Kamar Mawar 01 (Privat Balkon)',
    roomType: 'privat',
    pricePerSlotMonthly: 1600000,
    customerId: 'usr-customer-01',
    customerName: 'Allan Gemilang',
    customerEmail: 'allan@kostagent.com',
    customerPhone: '081234567890',
    checkInDate: '2026-11-20',
    durationMonths: 3,
    requestedSlots: 1,
    totalAmount: 4800000,
    occupants: [
      {
        slotIndex: 1,
        fullName: 'Siti Sarah (Adik Allan)',
        phone: '081299001122',
        nik: '3201887766550002',
        emergencyContact: '081234567890 (Kakak)',
        ktpUploaded: true,
        workOrStudentCardUploaded: true,
        customRequirementsAnswers: {}
      }
    ],
    status: 'PAYMENT_SUBMITTED',
    paymentHoldExpiresAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    paymentSubmittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    ownerSlaExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 19).toISOString(), // 19 hours left
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
  },
  {
    id: 'BKG-2026-7703',
    idempotencyKey: 'idem-bkg-7703',
    propertyId: 'prop-03',
    propertyName: 'Kost Putra Kaliurang Living UGM',
    propertyCity: 'Yogyakarta',
    propertyAddress: 'Jl. Kaliurang KM 5.2, Gang Megatruh No. 8',
    propertyCoverImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80',
    roomId: 'rm-06',
    roomName: 'Kamar Executive 101 (Privat)',
    roomType: 'privat',
    pricePerSlotMonthly: 1500000,
    customerId: 'usr-customer-01',
    customerName: 'Allan Gemilang',
    customerEmail: 'allan@kostagent.com',
    customerPhone: '081234567890',
    checkInDate: '2026-11-10',
    durationMonths: 2,
    requestedSlots: 1,
    totalAmount: 3000000,
    occupants: [
      {
        slotIndex: 1,
        fullName: 'Allan Gemilang',
        phone: '081234567890',
        nik: '3201234567890001',
        emergencyContact: '081122334455',
        ktpUploaded: true,
        workOrStudentCardUploaded: true,
        customRequirementsAnswers: {}
      }
    ],
    status: 'ACCEPTED',
    paymentHoldExpiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    paymentSubmittedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    ownerSlaExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    checkInDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days left to check in (H+14)
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    propertyId: 'prop-01',
    bookingId: 'bkg-hist-01',
    customerName: 'A***n G.',
    rating: 5,
    comment: 'Tempatnya sangat bersih dan nyaman! Fasilitas smart key dan WiFi benar-benar kencang untuk kerja WFH. Ibu kosnya juga sangat kooperatif.',
    createdAt: '2026-10-20T10:15:00Z'
  },
  {
    id: 'rev-02',
    propertyId: 'prop-01',
    bookingId: 'bkg-hist-02',
    customerName: 'D***y P.',
    rating: 5,
    comment: 'Parkir mobil aman dan luas banget. Lokasi strategis dekat cafe Kemang.',
    createdAt: '2026-10-18T14:20:00Z'
  },
  {
    id: 'rev-03',
    propertyId: 'prop-02',
    bookingId: 'bkg-hist-03',
    customerName: 'A***a N.',
    rating: 5,
    comment: 'Jalan kaki ke kampus ITB cuma 5 menit lewat gerbang belakang. Sangat aman untuk mahasiswi!',
    createdAt: '2026-10-22T08:30:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-01',
    adminId: 'usr-admin-01',
    adminName: 'Budi Santoso',
    action: 'APPROVE_LISTING',
    targetType: 'PROPERTY',
    targetId: 'prop-01',
    reason: 'Dokumen kelayakan foto kos, nomor kontak owner, dan fasilitas telah diverifikasi valid.',
    timestamp: '2026-10-01T09:30:00Z'
  }
];
