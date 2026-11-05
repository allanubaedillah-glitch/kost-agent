import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  OwnerUser, OwnerProperty, OwnerRoom, OwnerBooking, 
  RoomStatus, BookingStatus 
} from '../types';
import { 
  INITIAL_OWNER_USER, INITIAL_OWNER_PROPERTIES, 
  INITIAL_OWNER_ROOMS, INITIAL_OWNER_BOOKINGS 
} from '../mock/initialOwnerData';
import { kmApi } from '../api/client';

interface OwnerStoreContextType {
  owner: OwnerUser | null;
  setOwner: (user: OwnerUser | null) => void;
  login: (email: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<OwnerUser>) => void;

  // Property Actions
  properties: OwnerProperty[];
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;
  getProperty: (id: string) => OwnerProperty | undefined;
  addProperty: (data: Omit<OwnerProperty, 'id' | 'createdAt' | 'lastSyncAt' | 'partnershipStatus' | 'partnershipEnabled' | 'partnershipTermsAgreed'>) => Promise<OwnerProperty>;
  updateProperty: (id: string, data: Partial<OwnerProperty>) => Promise<void>;
  submitPartnershipToKostAgent: (propertyId: string) => Promise<void>;
  togglePartnershipActive: (propertyId: string) => Promise<void>;

  // Room Actions
  rooms: OwnerRoom[];
  getRoomsForProperty: (propertyId: string) => OwnerRoom[];
  getRoom: (roomId: string) => OwnerRoom | undefined;
  addRoom: (data: Omit<OwnerRoom, 'id' | 'occupiedSlots' | 'reservedSlots'>) => Promise<OwnerRoom>;
  updateRoom: (id: string, data: Partial<OwnerRoom>) => void;
  updateRoomOperationalStatus: (roomId: string, newStatus: RoomStatus) => void;

  // Booking Actions (Owner Approval Authority)
  bookings: OwnerBooking[];
  getBookingsForProperty: (propertyId: string) => OwnerBooking[];
  getBooking: (bookingId: string) => OwnerBooking | undefined;
  acceptBooking: (bookingId: string) => Promise<void>;
  rejectBooking: (bookingId: string, reason: string) => Promise<void>;
  confirmCheckIn: (bookingId: string) => Promise<void>;
  confirmRefundTransferred: (bookingId: string) => Promise<void>;

  // Sync & Polling (Option 2-A)
  isLoading: boolean;
  refreshData: () => Promise<void>;

  // Dev Simulation Controls
  simulateIncomingBooking: (propertyId: string) => void;
  resetAllOwnerData: () => void;
}

const STORAGE_KEY = 'kost_management_state_v1';

const OwnerStoreContext = createContext<OwnerStoreContextType | null>(null);

function mapKmProperty(p: any): OwnerProperty {
  const facs = Array.isArray(p.generalFacilities) ? p.generalFacilities : (typeof p.generalFacilities === 'string' ? JSON.parse(p.generalFacilities || '[]') : []);
  const photos = Array.isArray(p.photos) ? p.photos : (typeof p.photos === 'string' ? JSON.parse(p.photos || '[]') : []);
  const reqs = p.requirementsSchema ? (typeof p.requirementsSchema === 'string' ? JSON.parse(p.requirementsSchema) : p.requirementsSchema) : {};

  return {
    id: p.id,
    slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: p.name,
    type: (p.genderType || 'MIXED').toLowerCase() === 'female' ? 'putri' : (p.genderType || 'MIXED').toLowerCase() === 'male' ? 'putra' : 'campur',
    address: p.address,
    city: p.city,
    district: p.district || p.city,
    description: p.description || '',
    coverImage: photos[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
    facilities: facs,
    rulesNotes: reqs.notes || '',
    rulesCheckboxes: reqs.custom_checkboxes?.map((c: any) => ({
      id: c.id,
      label: c.label,
      isRequired: c.is_required || false
    })) || [],
    bankAccount: {
      bankName: p.paymentBankName || 'BCA',
      accountNumber: p.paymentAccountNumber || '8890123456',
      accountHolder: p.paymentAccountHolder || 'PEMILIK KOS',
      qrisUrl: p.paymentQrisUrl
    },
    partnershipStatus: (p.partnershipStatus === 'APPROVED' ? 'ACTIVE' : p.partnershipStatus === 'NONE' ? 'NOT_PARTNERED' : p.partnershipStatus) as any,
    partnershipEnabled: p.partnershipStatus === 'APPROVED' || p.partnershipStatus === 'WAITING_REVIEW',
    partnershipTermsAgreed: p.partnershipStatus !== 'NONE',
    partnershipSubmittedAt: p.createdAt,
    partnershipRejectionReason: p.rejectionReason,
    lastSyncAt: p.updatedAt || new Date().toISOString(),
    createdAt: p.createdAt || new Date().toISOString()
  };
}

function mapKmRoom(r: any): OwnerRoom {
  const facs = Array.isArray(r.facilities) ? r.facilities : (typeof r.facilities === 'string' ? JSON.parse(r.facilities || '[]') : []);
  const photos = Array.isArray(r.photos) ? r.photos : (typeof r.photos === 'string' ? JSON.parse(r.photos || '[]') : []);

  return {
    id: r.id,
    propertyId: r.propertyId,
    name: `Kamar ${r.roomNumber}`,
    type: r.roomType === 'SHARED' ? 'bersama' : 'privat',
    sizeM2: r.sizeSqm || 16,
    facilities: facs,
    pricePerMonth: r.monthlyPrice,
    totalCapacity: r.totalCapacity,
    occupiedSlots: r.occupiedSlots,
    reservedSlots: r.reservedSlots,
    status: r.status === 'AVAILABLE' ? 'TERSEDIA' : 'MAINTENANCE',
    images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf']
  };
}

function mapKmBooking(b: any): OwnerBooking {
  const occs = Array.isArray(b.occupantsData) ? b.occupantsData : (typeof b.occupantsData === 'string' ? JSON.parse(b.occupantsData || '[]') : []);

  return {
    id: b.id,
    propertyId: b.propertyId,
    propertyName: b.property?.name || 'Kost',
    roomId: b.roomId,
    roomName: `Kamar ${b.room?.roomNumber || ''}`,
    roomType: b.room?.roomType === 'SHARED' ? 'bersama' : 'privat',
    customerId: b.kostagentBookingId || 'cust-01',
    customerName: b.customerName,
    customerPhone: b.customerPhone,
    customerEmail: `${b.customerName.toLowerCase().replace(/ /g, '.')}@gmail.com`,
    checkInDate: typeof b.startDate === 'string' ? b.startDate.slice(0, 10) : new Date(b.startDate).toISOString().slice(0, 10),
    durationMonths: b.durationMonths,
    requestedSlots: b.slotsCount,
    totalAmount: b.totalAmount,
    occupants: occs.map((occ: any, i: number) => ({
      slotIndex: i + 1,
      fullName: occ.name || occ.fullName,
      phone: occ.phone,
      nik: occ.id_card_number || occ.nik || '3201000000000001',
      emergencyContact: occ.emergency_contact || 'Keluarga'
    })),
    status: b.status as any,
    paymentProofUrl: b.paymentProofUrl,
    paymentSubmittedAt: b.createdAt,
    ownerSlaExpiresAt: new Date(new Date(b.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
    checkInDeadline: b.status === 'ACCEPTED' ? new Date(new Date(b.verifiedAt || b.updatedAt).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    rejectionReason: b.rejectionReason,
    refundAccount: b.refundAccountNumber ? {
      bankName: b.refundBankName || 'BCA',
      accountNumber: b.refundAccountNumber,
      accountHolder: b.refundAccountHolder || b.customerName
    } : undefined,
    refundTransferredAt: b.refundTransferredAt ? new Date(b.refundTransferredAt).toISOString() : undefined,
    createdAt: typeof b.createdAt === 'string' ? b.createdAt : new Date(b.createdAt).toISOString()
  };
}

export const OwnerStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [owner, setOwner] = useState<OwnerUser | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_owner`);
    return saved ? JSON.parse(saved) : INITIAL_OWNER_USER;
  });

  const [properties, setProperties] = useState<OwnerProperty[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_props`);
    return saved ? JSON.parse(saved) : INITIAL_OWNER_PROPERTIES;
  });

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(() => {
    return INITIAL_OWNER_PROPERTIES[0].id;
  });

  const [rooms, setRooms] = useState<OwnerRoom[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_rooms`);
    return saved ? JSON.parse(saved) : INITIAL_OWNER_ROOMS;
  });

  const [bookings, setBookings] = useState<OwnerBooking[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_bookings`);
    return saved ? JSON.parse(saved) : INITIAL_OWNER_BOOKINGS;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync data from Backend API (http://localhost:4000/api/v1)
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);

      // 1. Fetch properties for owner
      const ownerId = owner?.id || '2404c6c6-0e0a-470d-bd6e-07207ee8d85d';
      const propRes = await kmApi.properties.getByOwner(ownerId).catch(() => null);
      if (propRes && propRes.success && Array.isArray(propRes.data) && propRes.data.length > 0) {
        const fetchedProps: OwnerProperty[] = [];
        const fetchedRooms: OwnerRoom[] = [];

        for (const p of propRes.data) {
          fetchedProps.push(mapKmProperty(p));
          if (Array.isArray(p.rooms)) {
            for (const r of p.rooms) {
              fetchedRooms.push(mapKmRoom(r));
            }
          }
        }

        setProperties(fetchedProps);
        if (fetchedRooms.length > 0) {
          setRooms(fetchedRooms);
        }
        if (fetchedProps.length > 0 && !fetchedProps.some(p => p.id === selectedPropertyId)) {
          setSelectedPropertyId(fetchedProps[0].id);
        }
      }

      // 2. Fetch inbound bookings
      const bookRes = await kmApi.bookings.getAll().catch(() => null);
      if (bookRes && bookRes.success && Array.isArray(bookRes.data) && bookRes.data.length > 0) {
        setBookings(bookRes.data.map(mapKmBooking));
      }
    } catch (err) {
      console.warn('[OwnerStore] Backend sync fallback to local cache:', err);
    } finally {
      setIsLoading(false);
    }
  }, [owner?.id, selectedPropertyId]);

  // Sync on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_owner`, JSON.stringify(owner));
  }, [owner]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_props`, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_rooms`, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
  }, [bookings]);

  // Auth
  const login = async (email: string) => {
    try {
      const res = await kmApi.auth.login(email).catch(() => null);
      if (res && res.success && res.data) {
        const u: OwnerUser = {
          ...INITIAL_OWNER_USER,
          id: res.data.id,
          name: res.data.full_name,
          email: res.data.email,
          phone: res.data.phone_number
        };
        setOwner(u);
        return true;
      }
    } catch (e) {
      // fallback
    }

    setOwner({
      ...INITIAL_OWNER_USER,
      email: email || INITIAL_OWNER_USER.email
    });
    return true;
  };

  const register = async (name: string, email: string, phone: string) => {
    try {
      const res = await kmApi.auth.register({ email, full_name: name, phone_number: phone }).catch(() => null);
      if (res && res.success && res.data) {
        const u: OwnerUser = {
          ...INITIAL_OWNER_USER,
          id: res.data.id,
          name: res.data.full_name,
          email: res.data.email,
          phone: res.data.phone_number
        };
        setOwner(u);
        return true;
      }
    } catch (e) {
      // fallback
    }

    setOwner({
      ...INITIAL_OWNER_USER,
      id: `own-${Date.now()}`,
      name,
      email,
      phone
    });
    return true;
  };

  const logout = () => {
    setOwner(null);
  };

  const updateProfile = (data: Partial<OwnerUser>) => {
    if (owner) {
      setOwner({ ...owner, ...data });
    }
  };

  // Property Actions
  const getProperty = (id: string) => {
    return properties.find(p => p.id === id);
  };

  const addProperty = async (data: Omit<OwnerProperty, 'id' | 'createdAt' | 'lastSyncAt' | 'partnershipStatus' | 'partnershipEnabled' | 'partnershipTermsAgreed'>): Promise<OwnerProperty> => {
    try {
      const res = await kmApi.properties.create({
        owner_id: owner?.id || '2404c6c6-0e0a-470d-bd6e-07207ee8d85d',
        name: data.name,
        address: data.address,
        city: data.city,
        district: data.district,
        description: data.description,
        gender_type: data.type === 'putri' ? 'FEMALE' : data.type === 'putra' ? 'MALE' : 'MIXED',
        general_facilities: data.facilities,
        photos: data.images,
        contact_phone: data.bankAccount.accountNumber,
        payment_bank_name: data.bankAccount.bankName,
        payment_account_number: data.bankAccount.accountNumber,
        payment_account_holder: data.bankAccount.accountHolder
      });

      if (res.success && res.data) {
        const mapped = mapKmProperty(res.data);
        setProperties(prev => [mapped, ...prev]);
        setSelectedPropertyId(mapped.id);
        return mapped;
      }
    } catch (err) {
      console.warn('[OwnerStore] Backend addProperty failed, using local fallback:', err);
    }

    const newProp: OwnerProperty = {
      ...data,
      id: `prop-km-${Date.now()}`,
      partnershipStatus: 'NOT_PARTNERED',
      partnershipEnabled: false,
      partnershipTermsAgreed: false,
      lastSyncAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    setProperties(prev => [newProp, ...prev]);
    setSelectedPropertyId(newProp.id);
    return newProp;
  };

  const updateProperty = async (id: string, data: Partial<OwnerProperty>) => {
    try {
      await kmApi.properties.update(id, data);
    } catch (err) {
      console.warn('[OwnerStore] Backend updateProperty error:', err);
    }

    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...data, lastSyncAt: new Date().toISOString() };
      }
      return p;
    }));
  };

  const submitPartnershipToKostAgent = async (propertyId: string) => {
    try {
      await kmApi.partnerships.apply(propertyId);
    } catch (err) {
      console.warn('[OwnerStore] Backend apply partnership error:', err);
    }

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        return {
          ...p,
          partnershipStatus: 'WAITING_REVIEW',
          partnershipEnabled: true,
          partnershipTermsAgreed: true,
          partnershipSubmittedAt: new Date().toISOString(),
          lastSyncAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  const togglePartnershipActive = async (propertyId: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const nextState = !p.partnershipEnabled;
        return {
          ...p,
          partnershipEnabled: nextState,
          lastSyncAt: new Date().toISOString()
        };
      }
      return p;
    }));
  };

  // Room Actions
  const getRoomsForProperty = (propertyId: string) => {
    return rooms.filter(r => r.propertyId === propertyId);
  };

  const getRoom = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const addRoom = async (data: Omit<OwnerRoom, 'id' | 'occupiedSlots' | 'reservedSlots'>): Promise<OwnerRoom> => {
    try {
      const res = await kmApi.rooms.create({
        property_id: data.propertyId,
        room_number: data.name.replace(/[^0-9]/g, '') || String(rooms.length + 101),
        room_type: data.type === 'bersama' ? 'SHARED' : 'PRIVATE',
        size_sqm: data.sizeM2,
        facilities: data.facilities,
        photos: data.images,
        monthly_price: data.pricePerMonth,
        total_capacity: data.totalCapacity
      });

      if (res.success && res.data) {
        const mapped = mapKmRoom(res.data);
        setRooms(prev => [...prev, mapped]);
        return mapped;
      }
    } catch (err) {
      console.warn('[OwnerStore] Backend addRoom failed, using local fallback:', err);
    }

    const newRoom: OwnerRoom = {
      ...data,
      id: `rm-km-${Date.now()}`,
      occupiedSlots: 0,
      reservedSlots: 0
    };
    setRooms(prev => [...prev, newRoom]);
    return newRoom;
  };

  const updateRoom = (id: string, data: Partial<OwnerRoom>) => {
    setRooms(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, ...data };
      }
      return r;
    }));
  };

  const updateRoomOperationalStatus = (roomId: string, newStatus: RoomStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return { ...r, status: newStatus };
      }
      return r;
    }));
  };

  // Booking Actions (Owner Approval Authority)
  const getBookingsForProperty = (propertyId: string) => {
    return bookings.filter(b => b.propertyId === propertyId);
  };

  const getBooking = (bookingId: string) => {
    return bookings.find(b => b.id === bookingId);
  };

  const acceptBooking = async (bookingId: string) => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return;

    try {
      await kmApi.bookings.decide(bookingId, 'ACCEPTED');
    } catch (err) {
      console.warn('[OwnerStore] Backend accept booking error, using local fallback:', err);
    }

    setRooms(prev => prev.map(r => {
      if (r.id === target.roomId) {
        return {
          ...r,
          reservedSlots: Math.max(0, r.reservedSlots - target.requestedSlots),
          occupiedSlots: r.occupiedSlots + target.requestedSlots,
          status: 'DITEMPATI'
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

  const rejectBooking = async (bookingId: string, reason: string) => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return;

    try {
      await kmApi.bookings.decide(bookingId, 'REJECTED', reason);
    } catch (err) {
      console.warn('[OwnerStore] Backend reject booking error, using local fallback:', err);
    }

    setRooms(prev => prev.map(r => {
      if (r.id === target.roomId) {
        return {
          ...r,
          reservedSlots: Math.max(0, r.reservedSlots - target.requestedSlots),
          status: r.occupiedSlots > 0 ? 'DITEMPATI' : 'TERSEDIA'
        };
      }
      return r;
    }));

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REJECTED' as BookingStatus,
          rejectionReason: reason || 'Kamar telah terisi secara offline.',
          refundAccount: {
            bankName: 'BCA',
            accountNumber: '1234567890',
            accountHolder: target.customerName
          }
        };
      }
      return b;
    }));
  };

  const confirmCheckIn = async (bookingId: string) => {
    try {
      await kmApi.bookings.confirmCheckIn(bookingId);
    } catch (err) {
      console.warn('[OwnerStore] Backend confirmCheckIn error:', err);
    }

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'CHECKED_IN' as BookingStatus };
      }
      return b;
    }));
  };

  const confirmRefundTransferred = async (bookingId: string) => {
    try {
      await kmApi.bookings.confirmRefund(bookingId);
    } catch (err) {
      console.warn('[OwnerStore] Backend confirmRefund error:', err);
    }

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'REFUND_COMPLETED' as BookingStatus,
          refundTransferredAt: new Date().toISOString()
        };
      }
      return b;
    }));
  };

  // Dev Simulation
  const simulateIncomingBooking = (propertyId: string) => {
    const propRooms = rooms.filter(r => r.propertyId === propertyId);
    if (propRooms.length === 0) {
      alert('Tambahkan kamar terlebih dahulu pada properti ini.');
      return;
    }
    const targetRoom = propRooms[0];
    const newId = `BKG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setRooms(prev => prev.map(r => {
      if (r.id === targetRoom.id) {
        return {
          ...r,
          reservedSlots: r.reservedSlots + 1,
          status: 'DIPESAN'
        };
      }
      return r;
    }));

    const now = new Date();
    const mockBkg: OwnerBooking = {
      id: newId,
      propertyId,
      propertyName: getProperty(propertyId)?.name || 'Kos Mitra',
      roomId: targetRoom.id,
      roomName: targetRoom.name,
      roomType: targetRoom.type,
      customerId: 'usr-sim-01',
      customerName: 'Muhammad Rizky (Penyewa Baru)',
      customerPhone: '081233445566',
      customerEmail: 'rizky.kost@gmail.com',
      checkInDate: '2026-11-25',
      durationMonths: 1,
      requestedSlots: 1,
      totalAmount: targetRoom.pricePerMonth,
      occupants: [
        {
          slotIndex: 1,
          fullName: 'Muhammad Rizky',
          phone: '081233445566',
          nik: '3201998877660005',
          emergencyContact: '081122339900 (Orang Tua)'
        }
      ],
      status: 'PAYMENT_SUBMITTED',
      paymentProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      paymentSubmittedAt: now.toISOString(),
      ownerSlaExpiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: now.toISOString()
    };

    setBookings(prev => [mockBkg, ...prev]);
    alert(`Simulasi pesanan masuk berhasil! Pesanan ${newId} dari KostAgent kini menunggu verifikasi Anda.`);
  };

  const resetAllOwnerData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_owner`);
    localStorage.removeItem(`${STORAGE_KEY}_props`);
    localStorage.removeItem(`${STORAGE_KEY}_rooms`);
    localStorage.removeItem(`${STORAGE_KEY}_bookings`);
    setOwner(INITIAL_OWNER_USER);
    setProperties(INITIAL_OWNER_PROPERTIES);
    setRooms(INITIAL_OWNER_ROOMS);
    setBookings(INITIAL_OWNER_BOOKINGS);
    window.location.reload();
  };

  return (
    <OwnerStoreContext.Provider
      value={{
        owner,
        setOwner,
        login,
        register,
        logout,
        updateProfile,
        properties,
        selectedPropertyId,
        setSelectedPropertyId,
        getProperty,
        addProperty,
        updateProperty,
        submitPartnershipToKostAgent,
        togglePartnershipActive,
        rooms,
        getRoomsForProperty,
        getRoom,
        addRoom,
        updateRoom,
        updateRoomOperationalStatus,
        bookings,
        getBookingsForProperty,
        getBooking,
        acceptBooking,
        rejectBooking,
        confirmCheckIn,
        confirmRefundTransferred,
        isLoading,
        refreshData,
        simulateIncomingBooking,
        resetAllOwnerData
      }}
    >
      {children}
    </OwnerStoreContext.Provider>
  );
};

export const useOwnerStore = () => {
  const context = useContext(OwnerStoreContext);
  if (!context) {
    throw new Error('useOwnerStore must be used within an OwnerStoreProvider');
  }
  return context;
};
