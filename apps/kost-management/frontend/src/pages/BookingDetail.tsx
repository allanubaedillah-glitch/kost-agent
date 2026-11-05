import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  CheckCircle, XCircle, Clock, Calendar, Users, 
  CreditCard, Phone, FileText, ChevronLeft, AlertCircle, 
  ArrowRight, ShieldCheck 
} from 'lucide-react';

export const BookingDetail: React.FC<{ propertyId: string; bookingId: string }> = ({
  propertyId,
  bookingId
}) => {
  const { navigate } = useRouter();
  const { getBooking, acceptBooking, rejectBooking, confirmCheckIn, confirmRefundTransferred, refreshData } = useOwnerStore();

  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Smart Client Polling (Option 2-A): Poll every 3s to capture refund account submission or status update
  React.useEffect(() => {
    const poll = setInterval(async () => {
      try {
        await refreshData();
      } catch (e) {}
    }, 3000);
    return () => clearInterval(poll);
  }, [refreshData]);

  const booking = getBooking(bookingId);

  if (!booking) {
    return (
      <PropertyContextLayout propertyId={propertyId} activeSubTab="bookings">
        <div className="p-10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-sm font-bold text-slate-800">Pemesanan Tidak Ditemukan</h2>
          <button
            onClick={() => navigate(`/properties/${propertyId}/bookings`)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
          >
            Kembali ke Daftar Pemesanan
          </button>
        </div>
      </PropertyContextLayout>
    );
  }

  const handleAccept = () => {
    if (confirm(`Apakah Anda yakin telah memeriksa mutasi rekening dan menerima pemesanan ${booking.id}? Slot kamar akan resmi dikunci menjadi penghuni aktif.`)) {
      acceptBooking(booking.id);
      alert('Pemesanan DITERIMA (ACCEPTED)! Status kamar diperbarui dan webhook diteruskan ke KostAgent.');
    }
  };

  const handleReject = () => {
    const reason = prompt('Masukkan alasan penolakan pemesanan (akan diteruskan ke calon penghuni):', 'Dana mutasi belum masuk / Kamar telah tersewa offline.');
    if (reason && reason.trim()) {
      rejectBooking(booking.id, reason.trim());
      alert('Pemesanan DITOLAK (REJECTED). Slot kamar otomatis dilepaskan kembali dan alur pengembalian dana dibuka.');
    }
  };

  const handleConfirmRefund = () => {
    if (confirm('Konfirmasi bahwa Anda telah mentransfer pengembalian dana sesuai rincian rekening customer?')) {
      confirmRefundTransferred(booking.id);
      alert('Konfirmasi refund selesai tercatat!');
    }
  };

  const handleCheckInArrival = () => {
    confirmCheckIn(booking.id);
    alert('Penghuni telah berhasil check-in di lokasi kos!');
  };

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="bookings">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TOP BACK */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button
            onClick={() => navigate(`/properties/${propertyId}/bookings`)}
            className="hover:text-indigo-600 font-semibold flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Pemesanan</span>
          </button>
          <span>/</span>
          <span className="font-bold text-slate-800">Detail #{booking.id}</span>
        </div>

        {/* DECISION ACTION CALLOUT (IF PAYMENT_SUBMITTED) */}
        {booking.status === 'PAYMENT_SUBMITTED' && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white p-5 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                Verifikasi Bukti Pembayaran (SLA 24 Jam)
              </span>
              <h2 className="text-lg font-black">Keputusan Pemilik Kos Diperlukan</h2>
              <p className="text-xs text-amber-100 max-w-xl">
                Periksa bukti bayar dan mutasi rekening Anda. Penerimaan akan mengunci slot kamar secara permanen.
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm transition flex items-center space-x-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>REJECT (Tolak)</span>
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition flex items-center space-x-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>ACCEPT (Terima Sewa)</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT 2 COLS: OCCUPANTS & BOOKING SPECS */}
          <div className="md:col-span-2 space-y-5">
            {/* OCCUPANTS CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Identitas Calon Penghuni ({booking.requestedSlots} Orang)</span>
              </h2>

              <div className="space-y-3">
                {booking.occupants.map((occ, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        Penghuni #{idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-400">Slot {idx + 1}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Nama Lengkap:</span>
                        <span className="font-bold text-slate-900 text-xs">{occ.fullName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Nomor WhatsApp:</span>
                        <span className="font-mono text-slate-900">{occ.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Nomor Induk Kependudukan (NIK):</span>
                        <span className="font-mono text-slate-900 font-bold">{occ.nik}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Kontak Darurat:</span>
                        <span className="text-slate-900">{occ.emergencyContact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SPECS & DURATION CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs text-xs">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Rincian Kamar & Durasi Sewa</span>
              </h2>

              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Tipe Kamar:</span>
                  <span className="font-bold text-slate-900">{booking.roomName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Kategori Kamar:</span>
                  <span className="font-bold uppercase text-indigo-600">{booking.roomType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Tanggal Mulai Masuk:</span>
                  <span className="font-bold text-slate-900">{booking.checkInDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Durasi Sewa:</span>
                  <span className="font-bold text-slate-900">{booking.durationMonths} Bulan</span>
                </div>
              </div>
            </div>

            {/* REFUND RESOLUTION SECTION (IF REJECTED) */}
            {(booking.status === 'REJECTED' || booking.status === 'REFUND_PENDING' || booking.status === 'REFUND_COMPLETED') && (
              <div className="bg-white rounded-3xl border border-rose-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm border-b border-rose-100 pb-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Penyelesaian Pengembalian Dana (Refund Flow - ADR-012)</span>
                </div>

                <div className="p-3 bg-rose-50 rounded-2xl text-xs text-rose-900 space-y-1">
                  <span className="font-bold block">Alasan Penolakan:</span>
                  <p>{booking.rejectionReason}</p>
                </div>

                {booking.refundAccount ? (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-slate-800 block">
                      Rekening Tujuan Transfer Balik (Customer):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Bank:</span>
                        <span className="font-bold text-slate-900">{booking.refundAccount.bankName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Nomor Rekening:</span>
                        <span className="font-bold text-indigo-600">{booking.refundAccount.accountNumber}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Atas Nama:</span>
                        <span className="font-bold text-slate-900">{booking.refundAccount.accountHolder}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-sm font-black text-slate-900 border-t border-slate-200">
                      <span>Nominal Wajib Dikembalikan:</span>
                      <span className="text-rose-600">Rp {booking.totalAmount.toLocaleString('id-ID')}</span>
                    </div>

                    {booking.status === 'REFUND_PENDING' && (
                      <button
                        onClick={handleConfirmRefund}
                        className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                      >
                        Konfirmasi Refund Telah Ditransfer (SLA 1x24 Jam Selesai)
                      </button>
                    )}

                    {booking.status === 'REFUND_COMPLETED' && (
                      <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl text-center font-bold text-xs border border-emerald-200">
                        ✓ Refund telah diselesaikan oleh pemilik kos
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    Menunggu calon penghuni mengisi formulir rekening refund di aplikasi KostAgent...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COL: PAYMENT PROOF & ACTIONS */}
          <div className="space-y-5">
            {/* PAYMENT PROOF PREVIEW */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3 shadow-xs text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Bukti Transfer Sewa</span>
              </h3>

              {booking.paymentProofUrl ? (
                <div className="space-y-2">
                  <div 
                    onClick={() => setIsZoomOpen(true)}
                    className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-zoom-in relative group"
                  >
                    <img
                      src={booking.paymentProofUrl}
                      alt="Struk Transfer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[11px] font-bold">
                      Klik untuk Memperbesar
                    </div>
                  </div>

                  {/* MODAL ZOOM */}
                  {isZoomOpen && (
                    <div 
                      onClick={() => setIsZoomOpen(false)}
                      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
                    >
                      <div className="max-w-2xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 relative">
                        <img src={booking.paymentProofUrl} alt="Zoom Struk Transfer" className="max-h-[80vh] w-auto mx-auto object-contain rounded-xl" />
                        <button 
                          onClick={() => setIsZoomOpen(false)}
                          className="mt-2 w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                        >
                          Tutup Pratinjau
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 space-y-0.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Tagihan:</span>
                    <span className="text-base font-black text-indigo-600">
                      Rp {booking.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 italic">Belum ada bukti pembayaran yang diunggah.</p>
              )}
            </div>

            {/* CONTACT CUSTOMER ACTION */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-2.5 shadow-xs text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Koordinasi WhatsApp</h3>
              <p className="text-slate-500 text-[11px]">Hubungi calon penghuni langsung jika memerlukan klarifikasi data.</p>
              <a
                href={`https://wa.me/${booking.customerPhone.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${booking.customerName}, kami dari pengelola kos ${booking.propertyName} ingin mengonfirmasi pemesanan Anda (${booking.id}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold flex items-center justify-center space-x-1.5 transition border border-emerald-200"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hubungi {booking.customerName}</span>
              </a>

              {booking.status === 'ACCEPTED' && (
                <button
                  onClick={handleCheckInArrival}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition"
                >
                  Konfirmasi Check-In (Tiba di Kos)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PropertyContextLayout>
  );
};
