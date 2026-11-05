import { Router, Request, Response } from "express";
import { db } from "../db";

export const adminRouter = Router();

// GET /api/v1/admin/analytics (Dashboard Ringkasan Operasional KostAgent)
adminRouter.get("/analytics", async (req: Request, res: Response) => {
  try {
    const totalProperties = await db.partnerProperty.count();
    const activeProperties = await db.partnerProperty.count({ where: { partnershipStatus: "ACTIVE" } });
    const pendingProperties = await db.partnerProperty.count({ where: { partnershipStatus: "WAITING_REVIEW" } });
    const suspendedProperties = await db.partnerProperty.count({ where: { partnershipStatus: "SUSPENDED" } });

    const totalRooms = await db.partnerRoom.count();
    const totalBookings = await db.booking.count();
    const completedBookings = await db.booking.count({ where: { status: "ACCEPTED" } });
    const overdueEscalations = await db.booking.count({ where: { isNeedsAttention: true } });

    // Total gross volume dari booking accepted/payment submitted
    const volumeAggregate = await db.booking.aggregate({
      where: {
        status: { in: ["ACCEPTED", "PAYMENT_SUBMITTED", "CHECKED_IN"] }
      },
      _sum: {
        totalAmount: true
      }
    });

    res.json({
      success: true,
      data: {
        properties: {
          total: totalProperties,
          active: activeProperties,
          pending: pendingProperties,
          suspended: suspendedProperties
        },
        rooms: {
          total: totalRooms
        },
        bookings: {
          total: totalBookings,
          completed: completedBookings,
          escalations: overdueEscalations,
          grossVolume: volumeAggregate._sum.totalAmount || 0
        }
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/admin/listings (Daftar seluruh listing mitra kos untuk moderasi)
adminRouter.get("/listings", async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const listings = await db.partnerProperty.findMany({
      where: status && status !== "ALL" ? { partnershipStatus: String(status) } : undefined,
      include: {
        rooms: true,
        _count: {
          select: { bookings: true, reviews: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      data: listings.map((l) => ({
        ...l,
        generalFacilities: JSON.parse(l.generalFacilities || "[]"),
        photos: JSON.parse(l.photos || "[]"),
        requirementsSchema: JSON.parse(l.requirementsSchema || "{}"),
        rooms: l.rooms.map((r) => ({
          ...r,
          facilities: JSON.parse(r.facilities || "[]"),
          photos: JSON.parse(r.photos || "[]")
        }))
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/admin/listings/:id/suspend (Admin Menangguhkan / Menyembunyikan Listing - UC-ADM-01)
adminRouter.post("/listings/:id/suspend", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const property = await db.partnerProperty.findUnique({ where: { id } });
    if (!property) {
      return res.status(404).json({ success: false, error: { code: "PROPERTY_NOT_FOUND", message: "Listing tidak ditemukan" } });
    }

    const updated = await db.partnerProperty.update({
      where: { id },
      data: {
        partnershipStatus: "SUSPENDED",
        rejectionReason: reason || "Listing disembunyikan/ditangguhkan oleh Admin KostAgent"
      }
    });

    res.json({
      success: true,
      message: `Listing ${property.name} telah ditangguhkan (SUSPENDED) dan disembunyikan dari pencarian publik`,
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/admin/listings/:id/unhide (Admin Mengaktifkan Kembali Listing yang Ditangguhkan)
adminRouter.post("/listings/:id/unhide", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const property = await db.partnerProperty.findUnique({ where: { id } });
    if (!property) {
      return res.status(404).json({ success: false, error: { code: "PROPERTY_NOT_FOUND", message: "Listing tidak ditemukan" } });
    }

    const updated = await db.partnerProperty.update({
      where: { id },
      data: {
        partnershipStatus: "ACTIVE",
        rejectionReason: null
      }
    });

    res.json({
      success: true,
      message: `Listing ${property.name} berhasil diaktifkan kembali (ACTIVE) dan tayang ke publik`,
      data: updated
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/admin/escalations (Daftar pelanggaran SLA 24 Jam - ADR-003 & UC-ADM-02)
adminRouter.get("/escalations", async (req: Request, res: Response) => {
  try {
    const escalations = await db.booking.findMany({
      where: {
        isNeedsAttention: true
      },
      include: {
        partnerProperty: true,
        partnerRoom: true,
        paymentSubmission: true
      },
      orderBy: { verificationDeadline: "asc" }
    });

    res.json({
      success: true,
      data: escalations.map((b) => ({
        id: b.id,
        bookingCode: b.bookingCode,
        propertyName: b.partnerProperty.name,
        roomNumber: b.partnerRoom.roomNumber,
        ownerName: b.partnerProperty.ownerName,
        ownerPhone: b.partnerProperty.ownerPhone,
        ownerWhatsapp: b.partnerProperty.ownerWhatsapp,
        totalAmount: b.totalAmount,
        submittedAt: b.paymentSubmission?.submittedAt,
        verificationDeadline: b.verificationDeadline,
        transferReceiptUrl: b.paymentSubmission?.transferReceiptUrl
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// POST /api/v1/admin/audit/view-customer (Minimum Access Principle Audit Log - ADR-007)
adminRouter.post("/audit/view-customer", async (req: Request, res: Response) => {
  try {
    const { admin_id, booking_id, customer_id, reason } = req.body;

    if (!admin_id || !reason) {
      return res.status(400).json({
        success: false,
        error: { code: "MISSING_REASON", message: "Alasan pembukaan data pribadi customer wajib dicatat untuk audit log" }
      });
    }

    const log = await db.securityAuditLog.create({
      data: {
        adminUserId: admin_id,
        action: "VIEW_UNMASKED_CUSTOMER_INFO",
        resourceType: booking_id ? "BOOKING" : "CUSTOMER",
        resourceId: booking_id || customer_id || "UNKNOWN",
        reason,
        ipAddress: req.ip || "127.0.0.1"
      }
    });

    res.json({
      success: true,
      message: "Akses data unmasked berhasil dicatat dalam Security Audit Log",
      audit_id: log.id
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/admin/bookings (Monitoring Seluruh Booking & SLA)
adminRouter.get("/bookings", async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const bookings = await db.booking.findMany({
      where: status && status !== "ALL" ? { status: String(status) } : undefined,
      include: {
        customer: {
          select: { id: true, fullName: true, email: true, phoneNumber: true }
        },
        partnerProperty: {
          select: { id: true, name: true, city: true, ownerName: true, ownerPhone: true, ownerWhatsapp: true }
        },
        partnerRoom: {
          select: { id: true, roomNumber: true, roomType: true }
        },
        paymentSubmission: true,
        refundRequest: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      data: bookings.map((b) => ({
        ...b,
        occupantsData: JSON.parse(b.occupantsData || "[]")
      }))
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/admin/users (Monitoring Pengguna: Customer & Admin)
adminRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const customers = await db.customer.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        isVerified: true,
        createdAt: true,
        _count: {
          select: { bookings: true, reviews: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const admins = await db.adminUser.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({
      success: true,
      data: {
        customers,
        admins
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});

// GET /api/v1/admin/audit-logs (Monitoring Security Audit Logs)
adminRouter.get("/audit-logs", async (req: Request, res: Response) => {
  try {
    const logs = await db.securityAuditLog.findMany({
      include: {
        adminUser: {
          select: { fullName: true, email: true, role: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });

    res.json({
      success: true,
      data: logs
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: { code: "SERVER_ERROR", message: err.message } });
  }
});
