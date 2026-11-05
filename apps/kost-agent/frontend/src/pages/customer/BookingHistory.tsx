import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  BookOpenCheck, Calendar, ArrowRight, Star, 
  Clock, CheckCircle, XCircle, AlertCircle, MessageSquare 
} from 'lucide-react';
import { BookingStatus as StatusType } from '../../types';

export const BookingHistory: React.FC = () => {
  const { navigate } = useRouter();
  const { getCustomerBookings, addReview, currentUser } = useAppStore();

  const [activeTab, setActiveTab] = useState<'semua' | 'aktif' | 'selesai' | 'batal'>('semua');

  // Modal Review state
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<{
    bookingId: string;
    propertyId: string;
    propertyName: string;
  } | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');

  const customerBookings = getCustomerBookings();

  const filteredBookings = customerBookings.filter((b) => {
    if (activeTab === 'aktif') {
      return b.status === 'PENDING_PAYMENT' || b.status === 'PAYMENT_SUBMITTED';
    }
    if (activeTab === 'selesai') {
      return b.status === 'ACCEPTED' || b.status === 'CHECKED_IN';
    }
    if (activeTab === 'batal') {
      return (
        b.status === 'CANCELLED' ||
        b.status === 'REJECTED' ||
        b.status === 'EXPIRED' ||
        b.status === 'REFUND_PENDING' ||
        b.status === 'REFUND_COMPLETED'
      );
    }
    return true;
  });

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-300 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Menunggu Bayar (60m)</span>
          </span>
        );
      case 'PAYMENT_SUBMITTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-300 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-indigo-600" />
            <span>Menunggu Verifikasi Owner</span>
          </span>
        );
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>Disetujui (Siap Check-in)</span>
          </span>
        );
      case 'CHECKED_IN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-400 flex items-center space-x-1">
            <CheckCircle className="w-3 h-3 text-emerald-700" />
            <span>Checked In</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-300 flex items-center space-x-1">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Ditolak (Isi Refund)</span>
          </span>
        );
      case 'REFUND_PENDING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-50 text-sky-700 border border-sky-300 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-sky-600" />
            <span>Proses Refund</span>
          </span>
        );
      case 'REFUND_COMPLETED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700 border border-slate-300">
            Refund Selesai
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500">
            Dibatalkan
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

  const handleOpenReview = (bookingId: string, propertyId: string, propName: string) => {
    setSelectedBookingForReview({ bookingId, propertyId, propertyName: propName });
    setRating(5);
    setComment('');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReview) return;
    if (!comment.trim()) {
      alert('Mohon tulis komentar ulasan Anda.');
      return;
    }

    addReview(selectedBookingForReview.propertyId, selectedBookingForReview.bookingId, rating, comment);
    alert('Terima kasih! Ulasan Anda berhasil diterbitkan.');
    setSelectedBookingForReview(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header title="Riwayat Pemesanan Kos" />

      <main className="max-w-3xl mx-auto w-full px-4 pt-3 space-y-4">
        {/* TAB FILTER BAR */}
        <div className="flex bg-slate-200/70 p-1 rounded-2xl text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('semua')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'semua' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Semua ({customerBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('aktif')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'aktif' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setActiveTab('selesai')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'selesai' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Disetujui
          </button>
          <button
            onClick={() => setActiveTab('batal')}
            className={`flex-1 py-2 rounded-xl transition ${
              activeTab === 'batal' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Batal / Refund
          </button>
        </div>

        {/* BOOKING LIST */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center space-y-3 border border-slate-100">
            <BookOpenCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">Belum Ada Riwayat Pemesanan</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Anda belum memiliki pemesanan kos dalam kategori ini. Mulai cari kamar kos impian Anda sekarang!
            </p>
            <button
              onClick={() => navigate('/search')}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition"
            >
              Jelajahi Kos
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-md transition space-y-3.5"
              >
                {/* CARD TOP INFO */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] font-extrabold text-slate-500">
                      #{b.id}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(b.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </span>
                  </div>
                  {getStatusBadge(b.status)}
                </div>

                {/* CARD BODY */}
                <div className="flex space-x-3.5">
                  <img
                    src={b.propertyCoverImage}
                    alt={b.propertyName}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{b.propertyName}</h3>
                    <p className="text-xs text-slate-500 truncate">
                      {b.roomName} ({b.requestedSlots} Orang)
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Mulai Masuk: {b.checkInDate} ({b.durationMonths} bln)</span>
                    </div>
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total Biaya Sewa</span>
                    <span className="text-sm font-black text-slate-900">
                      Rp {b.totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* REVIEW BUTTON (ADR-006) */}
                    {(b.status === 'ACCEPTED' || b.status === 'CHECKED_IN') && !b.reviewId && (
                      <button
                        onClick={() => handleOpenReview(b.id, b.propertyId, b.propertyName)}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200 transition flex items-center space-x-1"
                      >
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>Beri Ulasan</span>
                      </button>
                    )}

                    {/* STATUS / ACTION BUTTONS */}
                    {b.status === 'PENDING_PAYMENT' && (
                      <button
                        onClick={() => navigate(`/payment/${b.id}`)}
                        className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm flex items-center space-x-1"
                      >
                        <span>Bayar Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {b.status === 'PAYMENT_SUBMITTED' && (
                      <button
                        onClick={() => navigate(`/booking-status/${b.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1"
                      >
                        <span>Cek Status</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {(b.status === 'ACCEPTED' || b.status === 'CHECKED_IN') && (
                      <button
                        onClick={() => navigate(`/confirmation/${b.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center space-x-1"
                      >
                        <span>Lihat Tiket</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {b.status === 'REJECTED' && (
                      <button
                        onClick={() => navigate(`/booking-status/${b.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center space-x-1"
                      >
                        <span>Input Rekening Refund</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL BERI ULASAN (ADR-006) */}
        {selectedBookingForReview && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="font-bold text-slate-900 text-sm">Beri Ulasan Kos</h3>
                </div>
                <button
                  onClick={() => setSelectedBookingForReview(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Bagikan pengalaman Anda tinggal di <strong>{selectedBookingForReview.propertyName}</strong> untuk membantu pencari kos lain.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* RATING STARS PICKER */}
                <div className="flex items-center justify-center space-x-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Komentar & Pengalaman Anda
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Contoh: Kos sangat bersih, ibu kos ramah, dan WiFi kencang..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-600"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBookingForReview(null)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};
