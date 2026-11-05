import { OwnerUser, OwnerProperty, OwnerRoom, OwnerBooking } from '../types';

export const INITIAL_OWNER_USER: OwnerUser = {
  id: 'own-01',
  name: 'Hj. Ratna Sari',
  email: 'ratna.kemang@gmail.com',
  phone: '081288889999',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  subscriptionPlan: 'Paket Juragan Pro (Tahunan)',
  subscriptionExpiresAt: '2027-10-01T00:00:00Z',
  bankAccount: {
    bankName: 'BCA (Bank Central Asia)',
    accountNumber: '8830192811',
    accountHolder: 'Hj. Ratna Sari (Graha Kemang)',
    qrisUrl: 'https://images.unsplash.com/photo-1595079672139-62c0fecb363b?auto=format&fit=crop&w=400&q=80'
  }
};

export const INITIAL_OWNER_PROPERTIES: OwnerProperty[] = [
  {
    id: 'prop-km-01',
    slug: 'kost-graha-kemang-exclusive',
    name: 'Kost Graha Kemang Exclusive',
    type: 'campur',
    address: 'Jl. Kemang Timur No. 42B, Bangka',
    city: 'Jakarta Selatan',
    district: 'Mampang Prapatan',
    description: 'Kos eksklusif modern di Kemang Timur dengan fasilitas smart card 24 jam dan WiFi cepat.',
    coverImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['WiFi 100 Mbps', 'Parkir Mobil & Motor', 'Dapur Bersama', 'Security 24 Jam', 'Akses Kartu RFID'],
    rulesNotes: 'Gerbang utama 24 jam. Tamu menginap wajib lapor pengelola. Dilarang membawa hewan peliharaan.',
    rulesCheckboxes: [
      { id: 'rule-ktp', label: 'Wajib KTP / NIK Resmi', isRequired: true },
      { id: 'rule-work', label: 'Bukti Kerja / Kartu Mahasiswa', isRequired: true },
      { id: 'rule-emer', label: 'Kontak Darurat Keluarga', isRequired: true }
    ],
    bankAccount: {
      bankName: 'BCA',
      accountNumber: '8830192811',
      accountHolder: 'Hj. Ratna Sari'
    },
    partnershipStatus: 'ACTIVE',
    partnershipEnabled: true,
    partnershipTermsAgreed: true,
    partnershipSubmittedAt: '2026-10-01T08:00:00Z',
    lastSyncAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'prop-km-02',
    slug: 'graha-kemang-residence-2',
    name: 'Graha Kemang Residence 2',
    type: 'putri',
    address: 'Jl. Bangka Raya No. 18, Pela Mampang',
    city: 'Jakarta Selatan',
    district: 'Mampang Prapatan',
    description: 'Unit paviliun kos putri baru siap huni di Bangka Raya. Lingkungan tenang dan sejuk.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['WiFi Cepat', 'Parkir Motor', 'Dapur Bersama', 'Penjaga Kos'],
    rulesNotes: 'Khusus putri. Jam malam 22.30 WIB.',
    rulesCheckboxes: [
      { id: 'rule-ktp-2', label: 'Wajib KTP / NIK Resmi', isRequired: true }
    ],
    bankAccount: {
      bankName: 'BCA',
      accountNumber: '8830192811',
      accountHolder: 'Hj. Ratna Sari'
    },
    partnershipStatus: 'NOT_PARTNERED',
    partnershipEnabled: false,
    partnershipTermsAgreed: false,
    lastSyncAt: new Date().toISOString(),
    createdAt: '2026-10-28T14:00:00Z'
  },
  {
    id: 'prop-km-03',
    slug: 'kost-paviliun-bangka-indah',
    name: 'Kost Paviliun Bangka Indah',
    type: 'campur',
    address: 'Jl. Kemang Barat No. 5, Bangka',
    city: 'Jakarta Selatan',
    district: 'Mampang Prapatan',
    description: 'Properti kos sewa menengah dekat area pusat kuliner Kemang.',
    coverImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    facilities: ['WiFi', 'Parkir Motor', 'Kantin'],
    rulesNotes: 'Tertib dan menjaga ketenangan.',
    rulesCheckboxes: [
      { id: 'rule-ktp-3', label: 'Wajib KTP', isRequired: true }
    ],
    bankAccount: {
      bankName: 'BCA',
      accountNumber: '8830192811',
      accountHolder: 'Hj. Ratna Sari'
    },
    partnershipStatus: 'WAITING_REVIEW',
    partnershipEnabled: true,
    partnershipTermsAgreed: true,
    partnershipSubmittedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    lastSyncAt: new Date().toISOString(),
    createdAt: '2026-10-25T11:00:00Z'
  }
];

export const INITIAL_OWNER_ROOMS: OwnerRoom[] = [
  // Rooms for prop-km-01
  {
    id: 'rm-km-01',
    propertyId: 'prop-km-01',
    name: 'Deluxe Suite A-101 (Privat)',
    type: 'privat',
    sizeM2: 20,
    facilities: ['AC Daikin 1 PK', 'Kamar Mandi Dalam + Water Heater', 'Queen Bed', 'Smart TV', 'Meja Kerja'],
    pricePerMonth: 2750000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'rm-km-02',
    propertyId: 'prop-km-01',
    name: 'Standard Private A-102 (Privat)',
    type: 'privat',
    sizeM2: 16,
    facilities: ['AC Sharp 0.5 PK', 'Kamar Mandi Luar Bersih', 'Single Bed', 'Meja Kerja', 'Lemari'],
    pricePerMonth: 1950000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 1, // Currently held by booking!
    status: 'DIPESAN',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'rm-km-03',
    propertyId: 'prop-km-01',
    name: 'Twin Sharing Room B-201 (Kamar Bersama)',
    type: 'bersama',
    sizeM2: 28,
    facilities: ['AC Daikin 1.5 PK', 'Kamar Mandi Dalam', '2 Single Beds', '2 Meja Belajar', '2 Lemari Kunci'],
    pricePerMonth: 1250000,
    totalCapacity: 2,
    occupiedSlots: 1,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80']
  },

  // Rooms for prop-km-02
  {
    id: 'rm-km-04',
    propertyId: 'prop-km-02',
    name: 'Kamar Melati 01 (Privat)',
    type: 'privat',
    sizeM2: 15,
    facilities: ['AC', 'Kamar Mandi Dalam', 'Single Bed', 'Meja', 'Lemari'],
    pricePerMonth: 1800000,
    totalCapacity: 1,
    occupiedSlots: 0,
    reservedSlots: 0,
    status: 'TERSEDIA',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80']
  },
  {
    id: 'rm-km-05',
    propertyId: 'prop-km-02',
    name: 'Kamar Melati 02 (Privat)',
    type: 'privat',
    sizeM2: 15,
    facilities: ['AC', 'Kamar Mandi Dalam', 'Single Bed', 'Meja', 'Lemari'],
    pricePerMonth: 1800000,
    totalCapacity: 1,
    occupiedSlots: 1,
    reservedSlots: 0,
    status: 'DITEMPATI',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80']
  }
];

export const INITIAL_OWNER_BOOKINGS: OwnerBooking[] = [
  {
    id: 'BKG-2026-8802',
    propertyId: 'prop-km-01',
    propertyName: 'Kost Graha Kemang Exclusive',
    roomId: 'rm-km-02',
    roomName: 'Standard Private A-102 (Privat)',
    roomType: 'privat',
    customerId: 'usr-customer-01',
    customerName: 'Allan Gemilang',
    customerPhone: '081234567890',
    customerEmail: 'allan@kostagent.com',
    checkInDate: '2026-11-20',
    durationMonths: 1,
    requestedSlots: 1,
    totalAmount: 1950000,
    occupants: [
      {
        slotIndex: 1,
        fullName: 'Allan Gemilang',
        phone: '081234567890',
        nik: '3201234567890001',
        emergencyContact: '081122334455'
      }
    ],
    status: 'PAYMENT_SUBMITTED',
    paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    paymentSubmittedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    ownerSlaExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(), // 20 hours left
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 'BKG-2026-7703',
    propertyId: 'prop-km-01',
    propertyName: 'Kost Graha Kemang Exclusive',
    roomId: 'rm-km-03',
    roomName: 'Twin Sharing Room B-201 (Kamar Bersama)',
    roomType: 'bersama',
    customerId: 'usr-customer-03',
    customerName: 'Dimas Prasetyo',
    customerPhone: '081377889900',
    customerEmail: 'dimas.p@gmail.com',
    checkInDate: '2026-11-10',
    durationMonths: 3,
    requestedSlots: 1,
    totalAmount: 3750000,
    occupants: [
      {
        slotIndex: 1,
        fullName: 'Dimas Prasetyo',
        phone: '081377889900',
        nik: '3171098877660003',
        emergencyContact: '081233445566'
      }
    ],
    status: 'ACCEPTED',
    paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    paymentSubmittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    checkInDeadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString()
  }
];
