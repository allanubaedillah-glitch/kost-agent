// Kost Management Backend API Client
// Connects to local Express backend on :4000 or relative /api/v1 on Vercel Serverless

const API_BASE = (import.meta as any).env?.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5174'
    ? 'http://localhost:4000/api/v1' 
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

export const kmApi = {
  // --- AUTH ---
  auth: {
    async register(data: { email: string; password?: string; full_name: string; phone_number: string }) {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password || 'password123',
          full_name: data.full_name,
          phone_number: data.phone_number,
        }),
      });
    },

    async login(email: string, password: string = 'password123') {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },
  },

  // --- PROPERTIES ---
  properties: {
    async getByOwner(ownerId: string) {
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/properties/owner/${ownerId}`);
    },

    async getById(id: string) {
      return fetchJson<{ success: boolean; data: any }>(`${API_BASE}/properties/${id}`);
    },

    async create(data: {
      owner_id: string;
      name: string;
      address: string;
      city: string;
      district?: string;
      description?: string;
      gender_type?: string;
      general_facilities?: string[];
      photos?: string[];
      contact_phone?: string;
      whatsapp_number?: string;
      payment_bank_name?: string;
      payment_account_number?: string;
      payment_account_holder?: string;
      payment_qris_url?: string;
      requirements?: any;
    }) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/properties`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    async update(id: string, data: any) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/properties/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    async updateRequirements(id: string, requirements: any) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/properties/${id}/requirements`, {
        method: 'PUT',
        body: JSON.stringify({ requirements }),
      });
    },
  },

  // --- ROOMS ---
  rooms: {
    async getByProperty(propertyId: string) {
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/rooms/property/${propertyId}`);
    },

    async create(data: {
      property_id: string;
      room_number: string;
      room_type?: string;
      size_sqm?: number;
      facilities?: string[];
      photos?: string[];
      monthly_price: number;
      total_capacity: number;
      status?: string;
    }) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/rooms`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  // --- BOOKINGS (INBOUND) ---
  bookings: {
    async getAll() {
      return fetchJson<{ success: boolean; data: any[] }>(`${API_BASE}/bookings`);
    },

    async decide(inboundId: string, decision: 'ACCEPTED' | 'REJECTED', rejection_reason?: string) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/bookings/${inboundId}/decision`, {
        method: 'POST',
        body: JSON.stringify({ decision, rejection_reason }),
      });
    },

    async confirmRefund(inboundId: string) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/bookings/${inboundId}/confirm-refund`, {
        method: 'POST',
      });
    },

    async confirmCheckIn(inboundId: string) {
      return fetchJson<{ success: boolean; message: string }>(`${API_BASE}/bookings/${inboundId}/confirm-check-in`, {
        method: 'POST',
      });
    },
  },

  // --- PARTNERSHIPS ---
  partnerships: {
    async apply(propertyId: string) {
      return fetchJson<{ success: boolean; message: string; data: any }>(`${API_BASE}/partnerships/apply`, {
        method: 'POST',
        body: JSON.stringify({ property_id: propertyId }),
      });
    },
  },
};
