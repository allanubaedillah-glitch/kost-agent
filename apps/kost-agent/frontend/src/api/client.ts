// KostAgent Backend API Client
// Connects to local Express backend on :3000 or relative /api/v1 on Vercel Serverless

const API_BASE = (import.meta as any).env?.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173'
    ? 'http://localhost:3000/api/v1' 
    : '/api/v1');

export class ApiError extends Error {
  code: string;
  details?: any;
  constructor(message: string, code: string = 'API_ERROR', details?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = json?.error?.message || json?.message || `Request failed with status ${res.status}`;
    const errorCode = json?.error?.code || 'HTTP_ERROR';
    throw new ApiError(errorMsg, errorCode, json?.error?.details);
  }
  return json;
}

export const kaApi = {
  // --- AUTH ---
  auth: {
    async registerCustomer(data: { email: string; password?: string; full_name: string; phone_number: string }) {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/auth/customer/register`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password || 'password123',
          full_name: data.full_name,
          phone_number: data.phone_number,
        }),
      });
    },

    async loginCustomer(email: string, password: string = 'password123') {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/auth/customer/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },

    async loginAdmin(email: string, password: string = 'admin123') {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/auth/admin/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
  },

  // --- LISTINGS ---
  listings: {
    async getAll(params?: { city?: string; gender?: string; min_price?: number; max_price?: number; room_type?: string }) {
      const query = new URLSearchParams();
      if (params?.city) query.append('city', params.city);
      if (params?.gender) query.append('gender', params.gender);
      if (params?.min_price) query.append('min_price', String(params.min_price));
      if (params?.max_price) query.append('max_price', String(params.max_price));
      if (params?.room_type) query.append('room_type', params.room_type);
      
      const qStr = query.toString();
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/listings${qStr ? `?${qStr}` : ''}`);
    },

    async getById(id: string) {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/listings/${id}`);
    },

    async getRoomById(roomId: string) {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/listings/rooms/${roomId}`);
    },
  },

  // --- BOOKINGS ---
  bookings: {
    async create(payload: {
      customer_id: string;
      partner_property_id: string;
      partner_room_id: string;
      slots_count: number;
      duration_months: number;
      start_date: string;
      occupants: Array<{
        name: string;
        phone: string;
        id_card_number?: string;
        emergency_contact?: string;
        custom_answers?: Record<string, any>;
      }>;
      idempotency_key: string;
    }) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/bookings`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    async getById(id: string) {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/bookings/${id}`);
    },

    async getByCustomer(customerId: string) {
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/bookings/customer/${customerId}`);
    },

    async cancel(bookingId: string) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/bookings/${bookingId}/cancel`, {
        method: 'POST',
      });
    },

    async uploadReceipt(file: File) {
      const formData = new FormData();
      formData.append('receipt', file);

      const res = await fetch(`${API_BASE}/bookings/upload-receipt`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new ApiError(json?.error?.message || 'Gagal mengunggah bukti transfer');
      }
      return json as { success: boolean; message: string; data: { url: string; filename: string; size: number } };
    },

    async submitPayment(bookingId: string, data: { receipt_url: string; sender_bank?: string; sender_holder?: string; notes?: string }) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/bookings/${bookingId}/payment`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    async submitRefundAccount(bookingId: string, data: { bank_name: string; account_number: string; account_holder: string }) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/bookings/${bookingId}/refund-account`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  // --- REVIEWS ---
  reviews: {
    async submit(data: { customer_id: string; booking_id: string; rating: number; review_text: string }) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/reviews`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  // --- ADMIN PORTAL ---
  admin: {
    async getAnalytics() {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/admin/analytics`);
    },

    async getListings(status?: string) {
      const q = status ? `?status=${status}` : '';
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/admin/listings${q}`);
    },

    async suspendListing(id: string, reason: string) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/admin/listings/${id}/suspend`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
    },

    async unhideListing(id: string) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/admin/listings/${id}/unhide`, {
        method: 'POST',
      });
    },

    async decidePartnership(propertyId: string, decision: 'APPROVE' | 'REJECT', rejection_reason?: string) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/partnerships/${propertyId}/decision`, {
        method: 'POST',
        body: JSON.stringify({ decision, rejection_reason }),
      });
    },

    async getBookings(status?: string) {
      const q = status ? `?status=${status}` : '';
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/admin/bookings${q}`);
    },

    async getEscalations() {
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/admin/escalations`);
    },

    async getUsers() {
      return fetchJson<{ success: boolean; data: { customers: any[]; admins: any[] } }>(`${API_BASE}/admin/users`);
    },

    async getAuditLogs() {
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/admin/audit-logs`);
    },

    async recordAudit(data: { admin_id: string; booking_id?: string; customer_id?: string; reason: string }) {
      return fetchJson<{ success: boolean; audit_id: string }>(`${API_BASE}/admin/audit/view-customer`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  // --- TESTING / SIMULATION CONTROLS (Option 4-A) ---
  testing: {
    async expireHold(bookingId: string) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/testing/expire-hold/${bookingId}`, {
        method: 'POST',
      });
    },

    async breachSla(bookingId: string) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/testing/breach-sla/${bookingId}`, {
        method: 'POST',
      });
    },

    async getStatus() {
      return fetchJson<{ success: boolean; service: string; data: any }>(`${API_BASE}/testing/status`);
    },
  },
};
