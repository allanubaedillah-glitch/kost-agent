// Kost Management Types Specification

export type PropertyGenderType = 'campur' | 'putra' | 'putri';

export type PartnershipStatus = 'NOT_PARTNERED' | 'WAITING_REVIEW' | 'ACTIVE' | 'REJECTED';

export interface PropertyRuleCheckbox {
  id: string;
  label: string;
  isRequired: boolean;
}

export interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisUrl?: string;
}

export interface OwnerProperty {
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
  partnershipStatus: PartnershipStatus;
  partnershipEnabled: boolean; // Owner toggle active/deactivate
  partnershipTermsAgreed: boolean;
  partnershipSubmittedAt?: string;
  partnershipRejectionReason?: string;
  lastSyncAt: string;
  createdAt: string;
}

export type RoomType = 'privat' | 'bersama';
export type RoomStatus = 'TERSEDIA' | 'DIPESAN' | 'DITEMPATI' | 'MAINTENANCE';

export interface OwnerRoom {
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
  | 'CHECKED_IN'
  | 'REFUND_PENDING'
  | 'REFUND_COMPLETED'
  | 'CANCELLED';

export interface OccupantData {
  slotIndex: number;
  fullName: string;
  phone: string;
  nik: string;
  emergencyContact: string;
}

export interface RefundAccountInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface OwnerBooking {
  id: string;
  propertyId: string;
  propertyName: string;
  roomId: string;
  roomName: string;
  roomType: RoomType;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  checkInDate: string;
  durationMonths: number;
  requestedSlots: number;
  totalAmount: number;
  occupants: OccupantData[];
  status: BookingStatus;
  paymentProofUrl?: string;
  paymentSubmittedAt?: string;
  ownerSlaExpiresAt?: string;
  checkInDeadline?: string;
  rejectionReason?: string;
  refundAccount?: RefundAccountInfo;
  refundTransferredAt?: string;
  createdAt: string;
}

export interface OwnerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  subscriptionPlan: string;
  subscriptionExpiresAt: string;
  bankAccount: BankAccountInfo;
}
