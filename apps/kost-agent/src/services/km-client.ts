export class KostManagementClient {
  private static kmBaseUrl = process.env.KOST_MANAGEMENT_API_URL || "http://localhost:4000/api/v1";
  private static platformSecret = process.env.PLATFORM_SECRET || "shared-secret-ubaedillah-alanganteng-2026";

  private static getHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.platformSecret}`
    };
  }

  /**
   * Mengambil ketentuan dinamis kos dari Kost Management (API-KM-01).
   */
  static async fetchRequirements(kmPropertyId: string) {
    const res = await fetch(`${this.kmBaseUrl}/properties/${kmPropertyId}/requirements`, {
      method: "GET",
      headers: this.getHeaders()
    });

    if (!res.ok) {
      throw new Error(`KM_FETCH_REQUIREMENTS_FAILED: ${res.status}`);
    }

    const json: any = await res.json();
    return json.data.requirements;
  }

  /**
   * Mengunci slot kamar secara real-time selama 60 menit (API-KM-02, ADR-008).
   */
  static async holdSlots(params: {
    kmRoomId: string;
    bookingReferenceId: string;
    slotsCount: number;
    idempotencyKey?: string;
  }) {
    const res = await fetch(`${this.kmBaseUrl}/rooms/${params.kmRoomId}/hold-slots`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        booking_reference_id: params.bookingReferenceId,
        slots_count: params.slotsCount,
        idempotency_key: params.idempotencyKey
      })
    });

    const json: any = await res.json();

    if (!res.ok) {
      const err = new Error(json.error?.message || "HOLD_SLOTS_FAILED");
      (err as any).code = json.error?.code || "HOLD_FAILED";
      throw err;
    }

    return json.data;
  }

  /**
   * Melepaskan kuota slot yang sedang di-hold (API-KM-03, ADR-001).
   */
  static async releaseSlots(params: {
    kmRoomId: string;
    bookingReferenceId: string;
    reason?: string;
  }) {
    const res = await fetch(`${this.kmBaseUrl}/rooms/${params.kmRoomId}/release-slots`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        booking_reference_id: params.bookingReferenceId,
        reason: params.reason
      })
    });

    if (!res.ok) {
      const json = await res.json();
      console.warn(`[KMClient] Release slot warning:`, json);
    }

    return true;
  }

  /**
   * Mengirimkan pemesanan & bukti bayar masuk ke Kost Management (API-KM-04).
   */
  static async sendInboundBooking(payload: any) {
    const res = await fetch(`${this.kmBaseUrl}/bookings/inbound`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const json: any = await res.json();
      throw new Error(json.error?.message || "SEND_INBOUND_BOOKING_FAILED");
    }

    return await res.json();
  }

  /**
   * Mengirimkan data rekening refund customer ke Kost Management (API-KM-05, ADR-012).
   */
  static async sendRefundAccount(bookingReferenceId: string, payload: any) {
    const res = await fetch(`${this.kmBaseUrl}/bookings/${bookingReferenceId}/refund-account`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const json: any = await res.json();
      throw new Error(json.error?.message || "SEND_REFUND_ACCOUNT_FAILED");
    }

    return await res.json();
  }
}
