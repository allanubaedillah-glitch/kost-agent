-- ==============================================================================
-- KOST MANAGEMENT SUPABASE POSTGRESQL SCHEMA (Proyek Supabase 2)
-- Eksekusi seluruh skrip ini di SQL Editor Supabase untuk Proyek Kost Management
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: owners
CREATE TABLE IF NOT EXISTS owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "subscriptionStatus" TEXT DEFAULT 'ACTIVE',
    "subscriptionExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: properties
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ownerId" UUID NOT NULL REFERENCES owners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    description TEXT,
    "genderType" TEXT DEFAULT 'MIXED',
    "generalFacilities" TEXT NOT NULL, -- JSON String
    photos TEXT NOT NULL, -- JSON String
    "contactPhone" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "requirementsSchema" TEXT NOT NULL, -- JSON String
    "paymentBankName" TEXT NOT NULL,
    "paymentAccountNumber" TEXT NOT NULL,
    "paymentAccountHolder" TEXT NOT NULL,
    "paymentQrisUrl" TEXT,
    "partnershipStatus" TEXT DEFAULT 'NONE',
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties("ownerId");
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);

-- 3. Table: rooms
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "propertyId" UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    "roomNumber" TEXT NOT NULL,
    "roomType" TEXT DEFAULT 'PRIVATE',
    "sizeSqm" DOUBLE PRECISION,
    facilities TEXT NOT NULL, -- JSON String
    photos TEXT NOT NULL, -- JSON String
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "totalCapacity" INTEGER DEFAULT 1,
    "occupiedSlots" INTEGER DEFAULT 0,
    "reservedSlots" INTEGER DEFAULT 0,
    status TEXT DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_property_room_number UNIQUE ("propertyId", "roomNumber")
);

CREATE INDEX IF NOT EXISTS idx_rooms_property ON rooms("propertyId");

-- 4. Table: room_reservations
CREATE TABLE IF NOT EXISTS room_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "roomId" UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    "bookingReferenceId" TEXT NOT NULL,
    "slotsCount" INTEGER NOT NULL,
    status TEXT DEFAULT 'HOLD',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_room_reservations_room ON room_reservations("roomId");
CREATE INDEX IF NOT EXISTS idx_room_reservations_booking ON room_reservations("bookingReferenceId");
CREATE INDEX IF NOT EXISTS idx_room_reservations_expires ON room_reservations("expiresAt");

-- 5. Table: tenants
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "propertyId" UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    "roomId" UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "idCardNumber" TEXT,
    "emergencyContact" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    status TEXT DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tenants_property ON tenants("propertyId");
CREATE INDEX IF NOT EXISTS idx_tenants_room ON tenants("roomId");

-- 6. Table: rent_bills
CREATE TABLE IF NOT EXISTS rent_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "tenantId" UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    "billPeriod" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    status TEXT DEFAULT 'UNPAID',
    "paidAt" TIMESTAMP(3),
    "paymentNotes" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rent_bills_tenant ON rent_bills("tenantId");

-- 7. Table: inbound_bookings
CREATE TABLE IF NOT EXISTS inbound_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "propertyId" UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    "roomId" UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    "kostagentBookingId" TEXT UNIQUE NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "slotsCount" INTEGER NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "occupantsData" TEXT NOT NULL, -- JSON String
    "paymentProofUrl" TEXT NOT NULL,
    status TEXT DEFAULT 'PAYMENT_SUBMITTED',
    "rejectionReason" TEXT,
    "refundBankName" TEXT,
    "refundAccountNumber" TEXT,
    "refundAccountHolder" TEXT,
    "refundStatus" TEXT DEFAULT 'NONE',
    "refundTransferredAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "checkedInAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inbound_bookings_property ON inbound_bookings("propertyId");
CREATE INDEX IF NOT EXISTS idx_inbound_bookings_room ON inbound_bookings("roomId");

-- 8. Table: operational_notes
CREATE TABLE IF NOT EXISTS operational_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "propertyId" UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'REMINDER',
    "targetDate" TIMESTAMP(3),
    "isCompleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notes_property ON operational_notes("propertyId");

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================
INSERT INTO owners (id, email, "passwordHash", "fullName", "phoneNumber", "subscriptionStatus")
VALUES (
    '3e6b7a80-29b0-4b53-a2a2-0345aefa3c08',
    'ibu.siti@example.com',
    'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', -- SHA-256 for password123
    'Hj. Siti Rahmawati',
    '081298765432',
    'ACTIVE'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO properties (
    id, "ownerId", name, slug, address, city, district, latitude, longitude,
    description, "genderType", "generalFacilities", photos, "contactPhone",
    "whatsappNumber", "requirementsSchema", "paymentBankName",
    "paymentAccountNumber", "paymentAccountHolder", "partnershipStatus"
) VALUES (
    'c4e79178-ac73-46a5-b4a4-14fbaeffdead',
    '3e6b7a80-29b0-4b53-a2a2-0345aefa3c08',
    'Kost Siti Melati Indah A',
    'kost-siti-melati-indah-a',
    'Jl. Kyai Tapa No. 12, Grogol Petamburan',
    'Jakarta Barat',
    'Grogol',
    -6.1678,
    106.7892,
    'Kost nyaman, aman, dan strategis dekat kampus Trisakti dan Untar. Dilengkapi fasilitas lengkap.',
    'FEMALE',
    '["Wi-Fi 100 Mbps", "Dapur Bersama", "Parkir Motor", "CCTV 24 Jam", "Kulkas Bersama"]',
    '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"]',
    '081298765432',
    '081298765432',
    '{"standard_presets": {"ktp_required": true, "kk_required": false, "proof_of_employment": true, "emergency_contact": true}, "custom_checkboxes": [{"id": "cb_motor", "label": "Membawa Sepeda Motor", "is_required": false}, {"id": "cb_jam_malam", "label": "Sanggup Mematuhi Jam Malam (22:00 WIB)", "is_required": true}], "notes": "Dilarang membawa tamu lawan jenis ke dalam kamar. Menjaga ketenangan di atas jam 21:00."}',
    'Bank Central Asia (BCA)',
    '8890123456',
    'SITI RAHMAWATI',
    'APPROVED'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO rooms (
    id, "propertyId", "roomNumber", "roomType", "sizeSqm",
    facilities, photos, "monthlyPrice", "totalCapacity", "occupiedSlots", "reservedSlots", status
) VALUES (
    'ae486f51-933b-4312-a88d-a06a25c410e0',
    'c4e79178-ac73-46a5-b4a4-14fbaeffdead',
    '101',
    'PRIVATE',
    16.0,
    '["AC", "Kamar Mandi Dalam", "Kasur Springbed Queen", "Meja Belajar", "Lemari Pakaian"]',
    '["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"]',
    1600000.0,
    1,
    0,
    0,
    'AVAILABLE'
) ON CONFLICT ("propertyId", "roomNumber") DO NOTHING;

INSERT INTO rooms (
    id, "propertyId", "roomNumber", "roomType", "sizeSqm",
    facilities, photos, "monthlyPrice", "totalCapacity", "occupiedSlots", "reservedSlots", status
) VALUES (
    'be486f51-933b-4312-a88d-a06a25c410e1',
    'c4e79178-ac73-46a5-b4a4-14fbaeffdead',
    '102',
    'SHARED',
    28.0,
    '["AC", "Kamar Mandi Dalam", "Kasur Bunk Bed x4", "Loker Pribadi x4", "Wi-Fi"]',
    '["https://images.unsplash.com/photo-1555854877-bab0e564b8d5"]',
    750000.0,
    4,
    2,
    0,
    'AVAILABLE'
) ON CONFLICT ("propertyId", "roomNumber") DO NOTHING;
