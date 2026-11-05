-- ==============================================================================
-- KOSTAGENT SUPABASE POSTGRESQL SCHEMA (Proyek Supabase 1)
-- Eksekusi seluruh skrip ini di SQL Editor Supabase untuk Proyek KostAgent
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: customers
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isVerified" BOOLEAN DEFAULT false,
    "verificationToken" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: admin_users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    role TEXT DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: partner_properties
CREATE TABLE IF NOT EXISTS partner_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "kmPropertyId" TEXT UNIQUE NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerPhone" TEXT NOT NULL,
    "ownerWhatsapp" TEXT NOT NULL,
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
    "termsAndRules" TEXT,
    "requirementsSchema" TEXT NOT NULL, -- JSON String
    "paymentBankName" TEXT NOT NULL,
    "paymentAccountNumber" TEXT NOT NULL,
    "paymentAccountHolder" TEXT NOT NULL,
    "paymentQrisUrl" TEXT,
    "partnershipStatus" TEXT DEFAULT 'WAITING_REVIEW',
    "rejectionReason" TEXT,
    "avgRating" DOUBLE PRECISION DEFAULT 0.0,
    "totalReviews" INTEGER DEFAULT 0,
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_partner_properties_city ON partner_properties(city);
CREATE INDEX IF NOT EXISTS idx_partner_properties_status ON partner_properties("partnershipStatus");

-- 4. Table: partner_rooms
CREATE TABLE IF NOT EXISTS partner_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "kmRoomId" TEXT UNIQUE NOT NULL,
    "partnerPropertyId" UUID NOT NULL REFERENCES partner_properties(id) ON DELETE CASCADE,
    "roomNumber" TEXT NOT NULL,
    "roomType" TEXT DEFAULT 'PRIVATE',
    "sizeSqm" DOUBLE PRECISION,
    facilities TEXT NOT NULL, -- JSON String
    photos TEXT NOT NULL, -- JSON String
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "totalCapacity" INTEGER NOT NULL,
    "occupiedSlots" INTEGER DEFAULT 0,
    "reservedSlots" INTEGER DEFAULT 0,
    status TEXT DEFAULT 'AVAILABLE',
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_partner_rooms_property ON partner_rooms("partnerPropertyId");

-- 5. Table: bookings
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "bookingCode" TEXT UNIQUE NOT NULL,
    "customerId" UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    "partnerPropertyId" UUID NOT NULL REFERENCES partner_properties(id) ON DELETE CASCADE,
    "partnerRoomId" UUID NOT NULL REFERENCES partner_rooms(id) ON DELETE CASCADE,
    "slotsCount" INTEGER NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "pricePerSlot" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "occupantsData" TEXT NOT NULL, -- JSON String
    status TEXT DEFAULT 'PENDING_PAYMENT',
    "cancellationReason" TEXT,
    "paymentDeadline" TIMESTAMP(3) NOT NULL,
    "verificationDeadline" TIMESTAMP(3),
    "checkInDeadline" TIMESTAMP(3),
    "isNeedsAttention" BOOLEAN DEFAULT false,
    "idempotencyKey" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings("customerId");
CREATE INDEX IF NOT EXISTS idx_bookings_property ON bookings("partnerPropertyId");
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_needs_attention ON bookings("isNeedsAttention");

-- 6. Table: payment_submissions
CREATE TABLE IF NOT EXISTS payment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "bookingId" UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    "transferReceiptUrl" TEXT NOT NULL,
    "senderBankName" TEXT,
    "senderAccountHolder" TEXT,
    "submissionNotes" TEXT,
    "submittedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- 7. Table: refund_requests
CREATE TABLE IF NOT EXISTS refund_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "bookingId" UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountHolder" TEXT NOT NULL,
    "refundAmount" DOUBLE PRECISION NOT NULL,
    "penaltyDeduction" DOUBLE PRECISION DEFAULT 0.0,
    status TEXT DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- 8. Table: reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "bookingId" UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    "customerId" UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    "partnerPropertyId" UUID NOT NULL REFERENCES partner_properties(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL,
    "reviewText" TEXT NOT NULL,
    "isPublished" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_customer ON reviews("customerId");
CREATE INDEX IF NOT EXISTS idx_reviews_property ON reviews("partnerPropertyId");

-- 9. Table: security_audit_logs
CREATE TABLE IF NOT EXISTS security_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "adminUserId" UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    reason TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON security_audit_logs("adminUserId");

-- 10. Supabase Storage Bucket ('receipts')
-- Buat bucket publik untuk menyimpan struk pembayaran transfer
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan Storage agar file dapat dibaca secara publik
CREATE POLICY "Public Read Receipts" ON storage.objects
FOR SELECT USING (bucket_id = 'receipts');

CREATE POLICY "Allow Upload Receipts" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'receipts');

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================
INSERT INTO admin_users (id, email, "passwordHash", "fullName", role)
VALUES (
    '2343d151-1e54-4218-b3d1-a7589ebfe39d',
    'admin@kostagent.com',
    '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', -- SHA-256 for admin123
    'Super Admin KostAgent',
    'SUPERADMIN'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (id, email, "passwordHash", "fullName", "phoneNumber", "isVerified")
VALUES (
    'd9c42b0f-ced8-4405-9d70-b200f8ed0e33',
    'budi.santoso@example.com',
    'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', -- SHA-256 for password123
    'Budi Santoso',
    '081234567890',
    true
) ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (id, email, "passwordHash", "fullName", "phoneNumber", "isVerified")
VALUES (
    'e9b42b0f-ced8-4405-9d70-b200f8ed0e44',
    'allan@customer.com',
    'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    'Allan Prakosa',
    '081234567891',
    true
) ON CONFLICT (email) DO NOTHING;
