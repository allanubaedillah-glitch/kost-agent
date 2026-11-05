// KostAgent Types Specification

export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export type PropertyGenderType = 'campur' | 'putra' | 'putri';
export type PartnershipStatus = 'ACTIVE' | 'WAITING_REVIEW' | 'REJECTED' | 'SUSPENDED';

export interface PropertyRuleCheckbox {
  id: string;
  label: string;
  isRequired: boolean;
  isPreset: boolean;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisUrl?: string;
}

export interface OwnerContact {
  name: string;
  phone: string;
  email?: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  type: PropertyGenderType;
  address: string;
  city: string;
  district: string;
  description: string;
  coverImage: string;
  images: string[];
  facilities: string[];
  rulesNotes: string;
  rulesCheckboxes: PropertyRuleCheckbox[];
  bankAccount: BankAccountInfo;
  ownerContact: OwnerContact;
  partnershipStatus: PartnershipStatus;
  partnershipRejectionReason?: string;
  lastSyncAt: string;
  rating: number;
  reviewCount: number;
}

export type RoomType = 'privat' | 'bersama';
export type RoomStatus = 'TERSEDIA' | 'DIPESAN' | 'DITEMPATI' | 'MAINTENANCE';

export interface Room {
  id: string;
  propertyId: string;
  name: string;
  type: RoomType;
  sizeM2: number;
  facilities: string[];
  pricePerMonth: number;
  totalCapacity: number;
  occupiedSlots: number;
  reservedSlots: number;
  status: RoomStatus;
  images: string[];
}

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_SUBMITTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'CHECKED_IN'
  | 'CHECK_IN_OVERDUE'
  | 'REFUND_PENDING'
  | 'REFUND_COMPLETED';

export interface OccupantData {
  slotIndex: number;
  fullName: string;
  phone: string;
  nik: string;
  emergencyContact: string;
  ktpUploaded: boolean;
  workOrStudentCardUploaded: boolean;
  customRequirementsAnswers: Record<string, boolean>;
}

export interface RefundAccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  submittedAt: string;
}

export interface Booking {
  id: string;
  idempotencyKey: string;
  propertyId: string;
  propertyName: string;
  propertyCity: string;
  propertyAddress: string;
  propertyCoverImage: string;
  roomId: string;
  roomName: string;
  roomType: RoomType;
  pricePerSlotMonthly: number;
  
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  checkInDate: string;
  durationMonths: number;
  requestedSlots: number;
  totalAmount: number;
  
  occupants: OccupantData[];
  
  status: BookingStatus;
  paymentHoldExpiresAt: string; // ISO string, 60 minutes countdown
  paymentProofUrl?: string;
  paymentSubmittedAt?: string;
  ownerSlaExpiresAt?: string;   // ISO string, 24 hours SLA
  checkInDeadline?: string;     // ISO string, H+14 check in
  
  rejectionReason?: string;
  refundAccount?: RefundAccountInfo;
  refundCompletedAt?: string;
  
  reviewId?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  bookingId: string;
  customerName: string; // Masked e.g. "Allan G."
  rating: number; // 1 - 5
  comment: string;
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: 'BOOKING' | 'PROPERTY' | 'USER';
  targetId: string;
  reason: string;
  timestamp: string;
}
