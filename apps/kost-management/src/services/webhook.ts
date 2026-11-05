import crypto from "crypto";

export class WebhookSender {
  private static webhookSecret = process.env.WEBHOOK_SECRET || "webhook-secret-key-2026";
  private static kostAgentBaseUrl = process.env.KOST_AGENT_API_URL || "http://localhost:3000/api/v1";

  /**
   * Mengirim event webhook dengan signature HMAC-SHA256 (ADR-005).
   */
  static async sendEvent(endpoint: string, eventType: string, data: any) {
    const payload = {
      event_id: `evt-${crypto.randomUUID()}`,
      event_type: eventType,
      timestamp: new Date().toISOString(),
      data
    };

    const payloadString = JSON.stringify(payload);
    const signature = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(payloadString)
      .digest("hex");

    const targetUrl = `${this.kostAgentBaseUrl}${endpoint}`;

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Signature-SHA256": signature,
          "Authorization": `Bearer ${process.env.PLATFORM_SECRET}`
        },
        body: payloadString
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[WebhookSender] Webhook ${eventType} ke ${targetUrl} mengembalikan HTTP ${response.status}: ${errorText}`);
        return { success: false, status: response.status };
      }

      const result = await response.json();
      return { success: true, result };
    } catch (err: any) {
      console.error(`[WebhookSender] Gagal menghubungi KostAgent (${targetUrl}): ${err.message}`);
      return { success: false, error: err.message };
    }
  }
}
