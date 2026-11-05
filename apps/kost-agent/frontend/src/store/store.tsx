import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  User, Property, Room, Booking, Review, AdminAuditLog, 
  BookingStatus, OccupantData, RefundAccountInfo 
} from '../types';
import { 
  INITIAL_USERS, INITIAL_PROPERTIES, INITIAL_ROOMS, 
  INITIAL_BOOKINGS, INITIAL_REVIEWS, INITIAL_AUDIT_LOGS 
} from '../mock/initialData';
import { kaApi } from '../api/client';

interface AppStoreContextType {
  // Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAsCustomer: () => void;
  loginAsAdmin: () => void;
  loginCustom: (email: string, role: 'customer' | 'admin', name?: string) => Promise<boolean>;
  registerCustomer: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;

  // Data
  properties: Property[];
  rooms: Room[];
  bookings: Booking[];
  reviews: Review[];
  auditLogs: AdminAuditLog[];
  isLoading: boolean;
  refreshData: () => Promise<void>;

  // Customer Queries & Actions
  getProperty: (idOrSlug: string) => Property | undefined;
  getRoomsForProperty: (propertyId: string) => Room[];
  getRoom: (roomId: string) => Room | undefined;
  getBooking: (bookingId: string) => Booking | undefined;
  getCustomerBookings: () => Booking[];
  
  createBooking: (data: {
    property: Property;
    room: Room;
    checkInDate: string;
    durationMonths: number;
    requestedSlots: number;
    occupants: OccupantData[];
  }) => Promise<Booking | null>;

  cancelBooking: (bookingId: string) => Promise<boolean>;
  submitPaymentProof: (bookingId: string, proofUrl: string) => Promise<boolean>;
  submitRefundAccount: (bookingId: string, account: Omit<RefundAccountInfo, 'submittedAt'>) => Promise<boolean>;
  addReview: (propertyId: string, bookingId: string, rating: number, comment: string) => Promise<boolean>;
  simulateCheckIn: (bookingId: string) => boolean;

  // Admin Actions (Strictly Monitoring & Moderation)
  adminApproveListing: (propertyId: string, reason?: string) => Promise<void>;
  adminRejectListing: (propertyId: string, reason: string) => Promise<void>;
  adminToggleSuspendListing: (propertyId: string, reason: string) => Promise<void>;
  adminRecordAuditLog: (action: string, targetType: 'BOOKING' | 'PROPERTY' | 'USER', targetId: string, reason: string) => void;

  // Testing & Fast-Forward Simulation Controls (Option 4-A)
  simulateOwnerAccept: (bookingId: string) => void;
  simulateOwnerReject: (bookingId: string, reason: string) => void;
  simulateOwnerTriggerSlaOverdue: (bookingId: string) => Promise<void>;
  simulateOwnerFinishRefund: (bookingId: string) => void;
  fastForwardExpireHold: (bookingId: string) => Promise<void>;
  fastForwardBreachSla: (bookingId: string) => Promise<void>;
  resetAllData: () => void;
}

const STORAGE_KEY = 'kostagent_state_v1';

const AppStoreContext = createContext<AppStoreContextType | null>(null);

function mapBackendProperty(bp: any): Property {
  const photos = Array.isArray(bp.photos) ? bp.photos : (typeof bp.photos === 'string' ? JSON.parse(bp.photos || '[]') : []);
  const facilities = Array.isArray(bp.general_facilities) ? bp.general_facilities : (typeof bp.generalFacilities === 'string' ? JSON.parse(bp.generalFacilities || '[]') : (bp.generalFacilities || []));
  const reqSchema = bp.requirements_schema || (typeof bp.requirementsSchema === 'string' ? JSON.parse(bp.requirementsSchema || '{}') : (bp.requirementsSchema || {}));

  return {
    id: bp.id,
    slug: bp.slug || bp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: bp.name,
    type: (bp.gender_type || bp.genderType || 'MIXED').toLowerCase() === 'female' ? 'putri' : (bp.gender_type || bp.genderType || 'MIXED').toLowerCase() === 'male' ? 'putra' : 'campur',
    address: bp.address,
    city: bp.city,
    district: bp.district || bp.city,
    description: bp.description || '',
    coverImage: photos[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    facilities,
    rulesNotes: bp.termsAndRules || bp.terms_and_rules || reqSchema?.notes || '',
    rulesCheckboxes: reqSchema?.custom_checkboxes?.map((c: any) => ({
      id: c.id,
      label: c.label,
      isRequired: c.is_required || false,
      isPreset: false,
    })) || [],
    bankAccount: {
      bankName: bp.payment_info?.bank_name || bp.paymentBankName || 'BCA',
      accountNumber: bp.payment_info?.account_number || bp.paymentAccountNumber || '8890123456',
      accountHolder: bp.payment_info?.account_holder || bp.paymentAccountHolder || bp.ownerName || 'PEMILIK KOS',
      qrisUrl: bp.payment_info?.qris_url || bp.paymentQrisUrl
    },
    ownerContact: {
      name: bp.ownerName || 'Pemilik Kos',
      phone: bp.ownerPhone || bp.ownerWhatsapp || '081298765432'
    },
    partnershipStatus: (bp.partnershipStatus || 'ACTIVE') as any,
    partnershipRejectionReason: bp.rejectionReason,
    lastSyncAt: bp.lastSyncedAt || bp.updatedAt || new Date().toISOString(),
    rating: bp.avg_rating || bp.avgRating || 4.8,
    reviewCount: bp.total_reviews || bp.totalReviews || 0
  };
}

function mapBackendRoom(br: any, propertyId: string): Room {
  const facs = Array.isArray(br.facilities) ? br.facilities : (typeof br.facilities === 'string' ? JSON.parse(br.facilities || '[]') : []);
  const photos = Array.isArray(br.photos) ? br.photos : (typeof br.photos === 'string' ? JSON.parse(br.photos || '[]') : []);

  return {
    id: br.id,
    propertyId,
    name: `Kamar ${br.room_number || br.roomNumber}`,
    type: (br.room_type || br.roomType) === 'SHARED' ? 'bersama' : 'privat',
    sizeM2: br.size_sqm || br.sizeSqm || 16,
    facilities: facs.length > 0 ? facs : ['AC', 'Kamar Mandi Dalam'],
    pricePerMonth: br.monthly_price || br.monthlyPrice || 750000,
    totalCapacity: br.total_capacity || br.totalCapacity || 1,
    occupiedSlots: br.occupied_slots || br.occupiedSlots || 0,
    reservedSlots: br.reserved_slots || br.reservedSlots || 0,
    status: br.status === 'AVAILABLE' ? 'TERSEDIA' : 'MAINTENANCE',
    images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf']
  };
}

function mapBackendBooking(bb: any): Booking {
  const occs = Array.isArray(bb.occupantsData) ? bb.occupantsData : (typeof bb.occupantsData === 'string' ? JSON.parse(bb.occupantsData || '[]') : []);
  const photos = bb.partnerProperty?.photos ? (Array.isArray(bb.partnerProperty.photos) ? bb.partnerProperty.photos : JSON.parse(bb.partnerProperty.photos)) : [];

  return {
    id: bb.id,
    idempotencyKey: bb.idempotencyKey || bb.id,
    propertyId: bb.partnerPropertyId || bb.partnerProperty?.id,
    propertyName: bb.partnerProperty?.name || 'Kost',
    propertyCity: bb.partnerProperty?.city || 'Jakarta',
    propertyAddress: bb.partnerProperty?.address || '',
    propertyCoverImage: photos[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    roomId: bb.partnerRoomId || bb.partnerRoom?.id,
    roomName: `Kamar ${bb.partnerRoom?.roomNumber || ''}`,
    roomType: bb.partnerRoom?.roomType === 'SHARED' ? 'bersama' : 'privat',
    pricePerSlotMonthly: bb.pricePerSlot || (bb.slotsCount > 0 && bb.durationMonths > 0 ? bb.totalAmount / (bb.slotsCount * bb.durationMonths) : 750000),
    customerId: bb.customerId || bb.customer?.id,
    customerName: bb.customer?.fullName || occs[0]?.name || 'Penyewa',
    customerEmail: bb.customer?.email || 'customer@example.com',
    customerPhone: bb.customer?.phoneNumber || occs[0]?.phone || '081234567890',
    checkInDate: typeof bb.startDate === 'string' ? bb.startDate.slice(0, 10) : new Date(bb.startDate).toISOString().slice(0, 10),
    durationMonths: bb.durationMonths || 1,
    requestedSlots: bb.slotsCount || 1,
    totalAmount: bb.totalAmount,
    occupants: occs.map((occ: any, i: number) => ({
      slotIndex: i + 1,
      fullName: occ.name || occ.fullName || `Penghuni ${i + 1}`,
      phone: occ.phone || '081234567890',
      nik: occ.id_card_number || occ.nik || '3201000000000001',
      emergencyContact: occ.emergency_contact || 'Keluarga',
      ktpUploaded: true,
      workOrStudentCardUploaded: true,
      customRequirementsAnswers: occ.custom_answers || {}
    })),
    status: bb.status as any,
    paymentHoldExpiresAt: typeof bb.paymentDeadline === 'string' ? bb.paymentDeadline : (bb.paymentDeadline ? new Date(bb.paymentDeadline).toISOString() : new Date(Date.now() + 3600000).toISOString()),
    paymentProofUrl: bb.paymentSubmission?.transferReceiptUrl,
    paymentSubmittedAt: bb.paymentSubmission?.submittedAt ? new Date(bb.paymentSubmission.submittedAt).toISOString() : undefined,
    ownerSlaExpiresAt: bb.verificationDeadline ? new Date(bb.verificationDeadline).toISOString() : undefined,
    checkInDeadline: bb.checkInDeadline ? new Date(bb.checkInDeadline).toISOString() : undefined,
    rejectionReason: bb.cancellationReason,
    refundAccount: bb.refundRequest ? {
      bankName: bb.refundRequest.bankName,
      accountNumber: bb.refundRequest.accountNumber,
      accountHolder: bb.refundRequest.accountHolder,
      submittedAt: new Date(bb.refundRequest.requestedAt).toISOString()
    } : undefined,
    refundCompletedAt: bb.refundRequest?.completedAt ? new Date(bb.refundRequest.completedAt).toISOString() : undefined,
    createdAt: typeof bb.createdAt === 'string' ? bb.createdAt : new Date(bb.createdAt).toISOString()
  };
}

export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_props`);
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_rooms`);
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reviews`);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync data from Backend API (http://localhost:3000/api/v1)
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      // 1. Fetch live listings
      const listingsRes = await kaApi.listings.getAll();
      if (listingsRes.success && listingsRes.data && listingsRes.data.length > 0) {
        const fetchedProps: Property[] = [];
        const fetchedRooms: Room[] = [];

        for (const p of listingsRes.data) {
          // Ambil detail kamar untuk tiap properti
          const detailRes = await kaApi.listings.getById(p.id).catch(() => null);
          if (detailRes && detailRes.success && detailRes.data) {
            const mappedProp = mapBackendProperty(detailRes.data);
            fetchedProps.push(mappedProp);
            if (Array.isArray(detailRes.data.rooms)) {
              for (const r of detailRes.data.rooms) {
                fetchedRooms.push(mapBackendRoom(r, mappedProp.id));
              }
            }
          } else {
            fetchedProps.push(mapBackendProperty(p));
          }
        }

        if (fetchedProps.length > 0) {
          setProperties(fetchedProps);
          if (fetchedRooms.length > 0) {
            setRooms(fetchedRooms);
          }
        }
      }

      // 2. Fetch live bookings
      const bookingsRes = await kaApi.admin.getBookings().catch(() => null);
      if (bookingsRes && bookingsRes.success && Array.isArray(bookingsRes.data) && bookingsRes.data.length > 0) {
        const mappedBookings = bookingsRes.data.map(mapBackendBooking);
        setBookings(mappedBookings);
      }

      // 3. Fetch audit logs
      const auditRes = await kaApi.admin.getAuditLogs().catch(() => null);
      if (auditRes && auditRes.success && Array.isArray(auditRes.data) && auditRes.data.length > 0) {
        setAuditLogs(auditRes.data.map(a => ({
          id: a.id,
          adminId: a.adminUserId,
          adminName: a.adminUser?.fullName || 'Admin',
          action: a.action,
          targetType: a.resourceType,
          targetId: a.resourceId,
          reason: a.reason,
          timestamp: a.createdAt
        })));
      }
    } catch (err) {
      console.warn('[AppStore] Backend sync fallback to local cache:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync from backend on initial mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Persist states to LocalStorage on change
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_props`, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_rooms`, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_reviews`, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Auth Helpers
  const loginAsCustomer = () => {
    setCurrentUser(INITIAL_USERS[0]);
  };

  const loginAsAdmin = () => {
    setCurrentUser(INITIAL_USERS[1]);
  };

  const loginCustom = async (email: string, role: 'customer' | 'admin', name?: string): Promise<boolean> => {
    try {
      if (role === 'admin') {
        const res = await kaApi.auth.loginAdmin(email, 'admin123').catch(() => null);
        if (res && res.success && res.data) {
          const u: User = {
            id: res.data.id,
            name: res.data.full_name || 'Admin',
            email: res.data.email,
            phone: '081234567890',
            role: 'admin',
            isVerified: true,
            createdAt: new Date().toISOString()
          };
          setCurrentUser(u);
          return true;
        }
      } else {
        const res = await kaApi.auth.loginCustomer(email, 'password123').catch(() => null);
        if (res && res.success && res.data) {
          const u: User = {
            id: res.data.id,
            name: res.data.full_name,
            email: res.data.email,
            phone: res.data.phone_number || '081234567890',
            role: 'customer',
            isVerified: true,
            createdAt: new Date().toISOString()
          };
          setCurrentUser(u);
          return true;
        }
      }
    } catch (e) {
      // fallback to mock
    }

    const found = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || (email.split('@')[0]),
      email,
      phone: '08123456789',
      role,
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    return true;
  };

  const registerCustomer = async (name: string, email: string, phone: string): Promise<boolean> => {
    try {
      const res = await kaApi.auth.registerCustomer({ email, full_name: name, phone_number: phone }).catch(() => null);
      if (res && res.success && res.data) {
        const newUser: User = {
          id: res.data.id,
          name: res.data.full_name,
          email: res.data.email,
          phone: res.data.phone_number,
          role: 'customer',
          isVerified: true,
          createdAt: new Date().toISOString()
        };
        setCurrentUser(newUser);
        return true;
      }
    } catch (e) {
      // fallback
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Queries
  const getProperty = (idOrSlug: string) => {
    return properties.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  };

  const getRoomsForProperty = (propertyId: string) => {
    return rooms.filter(r => r.propertyId === propertyId);
  };

  const getRoom = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const getBooking = (bookingId: string) => {
    return bookings.find(b => b.id === bookingId);
  };

  const getCustomerBookings = () => {
    if (!currentUser) return [];
    return bookings.filter(b => b.customerId === currentUser.id);
  };

  // Customer Actions
  const createBooking = async (data: {
    property: Property;
    room: Room;
    checkInDate: string;
    durationMonths: number;
    requestedSlots: number;
    occupants: OccupantData[];
  }): Promise<Booking | null> => {
    const targetRoom = rooms.find(r => r.id === data.room.id);
    if (!targetRoom) return null;

    const availableSlots = targetRoom.totalCapacity - targetRoom.occupiedSlots - targetRoom.reservedSlots;
    if (availableSlots < data.requestedSlots) {
      alert('Maaf, kapasitas slot tidak mencukupi untuk jumlah pemesan.');
      return null;
    }

    const idempotencyKey = `idem-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      // Panggil backend API riil (POST /api/v1/bookings -> hold 60m di KM)
      const res = await kaApi.bookings.create({
        customer_id: currentUser?.id || '2343d151-1e54-4218-b3d1-a7589ebfe39d',
        partner_property_id: data.property.id,
        partner_room_id: data.room.id,
        slots_count: data.requestedSlots,
        duration_months: data.durationMonths,
        start_date: data.checkInDate,
        occupants: data.occupants.map(o => ({
          name: o.fullName,
          phone: o.phone,
          id_card_number: o.nik,
          emergency_contact: o.emergencyContact,
          custom_answers: o.customRequirementsAnswers
        })),
        idempotency_key: idempotencyKey
      });

      if (res.success && res.data) {
        // Ambil data lengkap booking yang baru dibuat
        const bkgDetail = await kaApi.bookings.getById(res.data.booking_id);
        if (bkgDetail.success && bkgDetail.data) {
          const mapped = mapBackendBooking(bkgDetail.data);
          setBookings(prev => [mapped, ...prev.filter(b => b.id !== mapped.id)]);
          // Refresh room slots
          setRooms(prev => prev.map(r => r.id === targetRoom.id ? { ...r, reservedSlots: r.reservedSlots + data.requestedSlots } : r));
          return mapped;
        }
      }
    } catch (err: any) {
      console.warn('[AppStore] Backend booking error, fallback to simulated store:', err);
    }

    // Fallback simulation
    setRooms(prevRooms => prevRooms.map(r => {
      if (r.id === targetRoom.id) {
        return {
          ...r,
          reservedSlots: r.reservedSlots + data.requestedSlots
        };
      }
      return r;
    }));

    const totalAmount = data.room.pricePerMonth * data.requestedSlots * data.durationMonths;
    const now = new Date();
    const newBooking: Booking = {
      id: `BKG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      idempotencyKey,
      propertyId: data.property.id,
      propertyName: data.property.name,
      propertyCity: data.property.city,
      propertyAddress: data.property.address,
      propertyCoverImage: data.property.coverImage,
      roomId: data.room.id,
      roomName: data.room.name,
      roomType: data.room.type,
      pricePerSlotMonthly: data.room.pricePerMonth,
      customerId: currentUser?.id || 'usr-customer-guest',
      customerName: currentUser?.name || data.occupants[0]?.fullName || 'Penyewa',
      customerEmail: currentUser?.email || 'customer@example.com',
      customerPhone: currentUser?.phone || data.occupants[0]?.phone || '081234567890',
      checkInDate: data.checkInDate,
      durationMonths: data.durationMonths,
      requestedSlots: data.requestedSlots,
      totalAmount,
      occupants: data.occupants,
      status: 'PENDING_PAYMENT',
      paymentHoldExpiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
      createdAt: now.toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return false;
    if (target.status !== 'PENDING_PAYMENT') {
      alert('Hanya pemesanan dengan status PENDING PAYMENT yang dapat dibatalkan mandiri.');
      return false;
    }

    try {
      await kaApi.bookings.cancel(bookingId);
    } catch (err) {
      console.warn('[AppStore] Backend cancel failed, using local fallback:', err);
    }

    setRooms(prevRooms => prevRooms.map(r => {
      if (r.id === target.roomId) {
        return {
          ...r,
          reservedSlots: Math.max(0, r.reservedSlots - target.requestedSlots)
        };
      }
      return r;
    }));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'CANCELLED' as BookingStatus };
      }
      return b;
    }));

    return true;
  };

  const submitPaymentProof = async (bookingId: string, proofUrl: string): Promise<boolean> => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return false;

    try {
      await kaApi.bookings.submitPayment(bookingId, {
        receipt_url: proofUrl,
        sender_bank: 'Transfer Bank',
        sender_holder: target.customerName,
        notes: 'Bukti pembayaran diunggah via Customer PWA'
      });
    } catch (err) {
      console.warn('[AppStore] Backend payment submission failed, using local fallback:', err);
    }

    const now = new Date();
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'PAYMENT_SUBMITTED' as BookingStatus,
          paymentProofUrl: proofUrl,
          paymentSubmittedAt: now.toISOString(),
          ownerSlaExpiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
        };
      }
      return b;
    }));

    return true;
  };

  const submitRefundAccount = async (bookingId: string, account: Omit<RefundAccountInfo, 'submittedAt'>): Promise<boolean> => {
    try {
      await kaApi.bookings.submitRefundAccount(bookingId, {
        bank_name: account.bankName,
        account_number: account.accountNumber,
        account_holder: account.accountHolder
      });
    } catch (err) {
      console.warn('[AppStore] Backend refund account submit failed, using local fallback:', err);
    }

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REFUND_PENDING' as BookingStatus,
          refundAccount: {
            ...account,
            submittedAt: new Date().toISOString()
          }
        };
      }
      return b;
    }));
    return true;
  };

  const addReview = async (propertyId: string, bookingId: string, rating: number, comment: string): Promise<boolean> => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    try {
      await kaApi.reviews.submit({
        customer_id: currentUser?.id || booking.customerId,
        booking_id: bookingId,
        rating,
        review_text: comment
      });
    } catch (err) {
      console.warn('[AppStore] Backend review submit error, fallback to local:', err);
    }

    const customerNameInitial = currentUser?.name 
      ? currentUser.name.charAt(0) + '***' + currentUser.name.slice(-1) 
      : 'P***a';

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      propertyId,
      bookingId,
      customerName: customerNameInitial,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, reviewId: newReview.id };
      }
      return b;
    }));

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const propReviews = [...reviews.filter(r => r.propertyId === propertyId), newReview];
        const avg = propReviews.reduce((sum, r) => sum + r.rating, 0) / propReviews.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewCount: propReviews.length
        };
      }
      return p;
    }));

    return true;
  };

  const simulateCheckIn = (bookingId: string): boolean => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'CHECKED_IN' as BookingStatus };
      }
      return b;
    }));
    return true;
  };

  // Admin Actions
  const adminApproveListing = async (propertyId: string, reason = 'Listing memenuhi syarat kelayakan publik.') => {
    try {
      await kaApi.admin.decidePartnership(propertyId, 'APPROVE');
    } catch (err) {
      console.warn('[AppStore] Backend approve partnership error:', err);
    }

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, partnershipStatus: 'ACTIVE', lastSyncAt: new Date().toISOString() };
      }
      return p;
    }));
    adminRecordAuditLog('APPROVE_LISTING', 'PROPERTY', propertyId, reason);
  };

  const adminRejectListing = async (propertyId: string, reason: string) => {
    try {
      await kaApi.admin.decidePartnership(propertyId, 'REJECT', reason);
    } catch (err) {
      console.warn('[AppStore] Backend reject partnership error:', err);
    }

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return { ...p, partnershipStatus: 'REJECTED', partnershipRejectionReason: reason };
      }
      return p;
    }));
    adminRecordAuditLog('REJECT_LISTING', 'PROPERTY', propertyId, reason);
  };

  const adminToggleSuspendListing = async (propertyId: string, reason: string) => {
    const current = properties.find(p => p.id === propertyId);
    if (!current) return;

    try {
      if (current.partnershipStatus === 'SUSPENDED') {
        await kaApi.admin.unhideListing(propertyId);
      } else {
        await kaApi.admin.suspendListing(propertyId, reason);
      }
    } catch (err) {
      console.warn('[AppStore] Backend suspend toggle error:', err);
    }

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const nextStatus = p.partnershipStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
        return { ...p, partnershipStatus: nextStatus };
      }
      return p;
    }));
    adminRecordAuditLog('TOGGLE_SUSPEND_LISTING', 'PROPERTY', propertyId, reason);
  };

  const adminRecordAuditLog = (action: string, targetType: 'BOOKING' | 'PROPERTY' | 'USER', targetId: string, reason: string) => {
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}`,
      adminId: currentUser?.id || 'admin-system',
      adminName: currentUser?.name || 'Admin KostAgent',
      action,
      targetType,
      targetId,
      reason,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);

    kaApi.admin.recordAudit({
      admin_id: currentUser?.id || 'admin-system',
      reason,
      resource_type: targetType,
      resource_id: targetId
    } as any).catch(() => {});
  };

  // Fast-Forward & Simulation Controls for Testing (Option 4-A)
  const fastForwardExpireHold = async (bookingId: string) => {
    try {
      const res = await kaApi.testing.expireHold(bookingId);
      if (res.success) {
        await refreshData();
      }
    } catch (err) {
      console.warn('[AppStore] Backend expire hold test failed, fallback local:', err);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'EXPIRED' as BookingStatus } : b));
    }
  };

  const fastForwardBreachSla = async (bookingId: string) => {
    try {
      const res = await kaApi.testing.breachSla(bookingId);
      if (res.success) {
        await refreshData();
      }
    } catch (err) {
      console.warn('[AppStore] Backend breach SLA test failed, fallback local:', err);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, ownerSlaExpiresAt: new Date(Date.now() - 3600000).toISOString() } : b));
    }
  };

  const simulateOwnerAccept = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setRooms(prev => prev.map(r => {
      if (r.id === booking.roomId) {
        return {
          ...r,
          reservedSlots: Math.max(0, r.reservedSlots - booking.requestedSlots),
          occupiedSlots: r.occupiedSlots + booking.requestedSlots
        };
      }
      return r;
    }));

    const now = new Date();
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'ACCEPTED' as BookingStatus,
          checkInDeadline: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()
        };
      }
      return b;
    }));
  };

  const simulateOwnerReject = (bookingId: string, reason: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setRooms(prev => prev.map(r => {
      if (r.id === booking.roomId) {
        return {
          ...r,
          reservedSlots: Math.max(0, r.reservedSlots - booking.requestedSlots)
        };
      }
      return r;
    }));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REJECTED' as BookingStatus,
          rejectionReason: reason || 'Kamar tidak lolos kualifikasi / mutasi belum masuk.'
        };
      }
      return b;
    }));
  };

  const simulateOwnerTriggerSlaOverdue = async (bookingId: string) => {
    await fastForwardBreachSla(bookingId);
  };

  const simulateOwnerFinishRefund = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REFUND_COMPLETED' as BookingStatus,
          refundCompletedAt: new Date().toISOString()
        };
      }
      return b;
    }));
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_USERS[0]);
    setProperties(INITIAL_PROPERTIES);
    setRooms(INITIAL_ROOMS);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    window.location.reload();
  };

  return (
    <AppStoreContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginAsCustomer,
        loginAsAdmin,
        loginCustom,
        registerCustomer,
        logout,
        properties,
        rooms,
        bookings,
        reviews,
        auditLogs,
        isLoading,
        refreshData,
        getProperty,
        getRoomsForProperty,
        getRoom,
        getBooking,
        getCustomerBookings,
        createBooking,
        cancelBooking,
        submitPaymentProof,
        submitRefundAccount,
        addReview,
        simulateCheckIn,
        adminApproveListing,
        adminRejectListing,
        adminToggleSuspendListing,
        adminRecordAuditLog,
        simulateOwnerAccept,
        simulateOwnerReject,
        simulateOwnerTriggerSlaOverdue,
        simulateOwnerFinishRefund,
        fastForwardExpireHold,
        fastForwardBreachSla,
        resetAllData
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return context;
};
