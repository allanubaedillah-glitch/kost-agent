import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  BookOpenCheck, Clock, CheckCircle, XCircle, 
  ArrowRight, Calendar, User, FileText, AlertTriangle 
} from 'lucide-react';
import { BookingStatus } from '../types';

export const BookingList: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { navigate } = useRouter();
  const { getProperty, getBookingsForProperty, refreshData } = useOwnerStore();

  const property = getProperty(propertyId);
  const bookings = getBookingsForProperty(propertyId);

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  // Smart Client Polling (Option 2-A): Poll every 3s to capture newly incoming bookings from KostAgent
  React.useEffect(() => {
    const poll = setInterval(async () => {
      try {
        await refreshData();
      } catch (e) {
        // ignore
      }
    }, 3000);

    return () => clearInterval(poll);
  }, [refreshData]);

  if (!property) return null;

  const filtered = bookings.filter((b) => {
    if (activeTab === 'pending') return b.status === 'PAYMENT_SUBMITTED';
    if (activeTab === 'accepted') return b.status === 'ACCEPTED' || b.status === 'CHECKED_IN';
    if (activeTab === 'rejected') {
      return b.status === 'REJECTED' || b.status === 'REFUND_PENDING' || b.status === 'REFUND_COMPLETED';
    }
    return true;
  });

  const pendingCount = bookings.filter(b => b.status === 'PAYMENT_SUBMITTED').length;

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'PAYMENT_SUBMITTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-300 flex items-center space-x-1 animate-pulse">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Menunggu Verifikasi (SLA 24 Jam)</span>
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>Disetujui (Menunggu Kedatangan)</span>
          </span>
        );
      case 'CHECKED_IN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-800 border border-indigo-300 flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-indigo-600" />
            <span>Checked In (Penghuni Aktif)</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-800 border border-rose-300 flex items-center space-x-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Ditolak Pemilik</span>
          </span>
        );
      case 'REFUND_PENDING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-50 text-sky-800 border border-sky-300 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-sky-600" />
            <span>Perlu Transfer Refund</span>
          </span>
        );
      case 'REFUND_COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
            Refund Selesai
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="bookings">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-slate-900">Daftar Pemesanan Masuk (KM-BKG)</h1>
            <p className="text-xs text-slate-500">
              Verifikasi transfer sewa penyewa, terima pesanan, atau proses pengembalian dana (refund).
            </p>
          </div>

          {/* TAB FILTERS */}
          <div className="flex bg-slate-200/70 p-1 rounded-2xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Semua ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${
                activeTab === 'pending' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <span>Perlu Verifikasi</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-extrabold">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'accepted' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Disetujui
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'rejected' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Ditolak / Refund
            </button>
          </div>
        </div>

        {/* BOOKINGS LIST */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center space-y-2 border border-slate-200/80">
            <BookOpenCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">Belum Ada Pemesanan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tidak ada riwayat pemesanan dalam kategori ini. Anda dapat menggunakan tombol simulasi di bawah untuk menguji pemesanan masuk.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-200 transition space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-indigo-600 text-xs">
                      #{b.id}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      Disubmit: {new Date(b.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </span>
                  </div>
                  {getStatusBadge(b.status)}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">{b.customerName}</h3>
                    <p className="text-xs text-slate-600">
                      Kamar: <strong className="text-slate-800">{b.roomName}</strong> ({b.requestedSlots} Orang)
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Rencana Masuk: {b.checkInDate} ({b.durationMonths} Bulan)</span>
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-semibold">Total Nominal Sewa</span>
                    <span className="text-base font-black text-slate-900 block">
                      Rp {b.totalAmount.toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => navigate(`/properties/${propertyId}/bookings/${b.id}`)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-xs ml-auto"
                    >
                      <span>Periksa & Tindak Lanjuti</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PropertyContextLayout>
  );
};
