import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  BookOpenCheck, AlertTriangle, Clock, CheckCircle, 
  XCircle, Phone, FileText, Lock, ExternalLink 
} from 'lucide-react';
import { Booking } from '../../types';

export const BookingMonitoring: React.FC = () => {
  const { bookings, properties } = useAppStore();
  const [filterTab, setFilterTab] = useState<'all' | 'needs_attention' | 'pending_verification' | 'accepted' | 'rejected'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const isOverdue = (b: Booking) => {
    if (b.status !== 'PAYMENT_SUBMITTED' || !b.ownerSlaExpiresAt) return false;
    return new Date(b.ownerSlaExpiresAt).getTime() < Date.now();
  };

  const filtered = bookings.filter((b) => {
    if (filterTab === 'needs_attention') {
      return isOverdue(b);
    }
    if (filterTab === 'pending_verification') {
      return b.status === 'PAYMENT_SUBMITTED';
    }
    if (filterTab === 'accepted') {
      return b.status === 'ACCEPTED' || b.status === 'CHECKED_IN';
    }
    if (filterTab === 'rejected') {
      return b.status === 'REJECTED' || b.status === 'REFUND_PENDING' || b.status === 'REFUND_COMPLETED';
    }
    return true;
  });

  const needsAttentionCount = bookings.filter(isOverdue).length;

  return (
    <AdminLayout activeTab="bookings">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-white">Pemantauan Transaksi & SLA Booking</h1>
            <p className="text-xs text-slate-400">
              Monitoring alokasi slot kamar, eskalasi keterlambatan SLA pemilik kos (ADR-003).
            </p>
          </div>

          {/* TAB FILTERS */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs overflow-x-auto">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
                filterTab === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua ({bookings.length})
            </button>
            <button
              onClick={() => setFilterTab('needs_attention')}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center space-x-1.5 shrink-0 ${
                filterTab === 'needs_attention' ? 'bg-rose-600 text-white shadow-sm' : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Needs Attention ({needsAttentionCount})</span>
            </button>
            <button
              onClick={() => setFilterTab('pending_verification')}
              className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
                filterTab === 'pending_verification' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Menunggu Owner
            </button>
            <button
              onClick={() => setFilterTab('accepted')}
              className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
                filterTab === 'accepted' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Disetujui
            </button>
            <button
              onClick={() => setFilterTab('rejected')}
              className={`px-3 py-1 rounded-lg font-bold transition shrink-0 ${
                filterTab === 'rejected' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ditolak / Refund
            </button>
          </div>
        </div>

        {/* NOTICE: STRICT BUSINESS BOUNDARY */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center space-x-3">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Batas Kewenangan Admin:</strong> Admin bertugas memonitor status transaksi dan mem-follow up pemilik kos jika melewati SLA 24 jam. Admin <strong>dilarang</strong> menyetujui atau menolak pesanan secara sepihak.
          </span>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">ID & Tanggal</th>
                  <th className="p-3">Nama Kos & Kamar</th>
                  <th className="p-3">Data Pemesan</th>
                  <th className="p-3">Total Nominal</th>
                  <th className="p-3">Status & SLA</th>
                  <th className="p-3 rounded-r-xl text-right">Tindakan Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((b) => {
                  const overdue = isOverdue(b);
                  const prop = properties.find(p => p.id === b.propertyId);

                  return (
                    <tr
                      key={b.id}
                      className={`transition ${
                        overdue ? 'bg-rose-950/20 hover:bg-rose-950/30' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="p-3">
                        <span className="font-mono font-bold text-indigo-300 block">{b.id}</span>
                        <span className="text-[11px] text-slate-500">
                          {new Date(b.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="font-bold text-white block">{b.propertyName}</span>
                        <span className="text-slate-400 text-[11px]">
                          {b.roomName} ({b.requestedSlots} Orang)
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="text-slate-200 block font-semibold">{b.customerName}</span>
                        <span className="text-slate-400 text-[11px] font-mono">
                          NIK: {b.occupants[0]?.nik ? b.occupants[0].nik.slice(0, 4) + '************' : '-'}
                        </span>
                      </td>

                      <td className="p-3 font-semibold text-slate-200">
                        Rp {b.totalAmount.toLocaleString('id-ID')}
                      </td>

                      <td className="p-3">
                        <div className="space-y-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase inline-block ${
                            b.status === 'ACCEPTED'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : b.status === 'REJECTED'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : b.status === 'PAYMENT_SUBMITTED'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {b.status}
                          </span>

                          {overdue && (
                            <span className="flex items-center space-x-1 text-[10px] font-bold text-rose-400 animate-pulse">
                              <AlertTriangle className="w-3 h-3" />
                              <span>SLA Overdue (&gt;24 Jam)</span>
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px]"
                          >
                            Detail
                          </button>

                          {overdue && prop && (
                            <a
                              href={`https://wa.me/${prop.ownerContact.phone.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${prop.ownerContact.name}, kami dari Tim Admin KostAgent mendeteksi transaksi ${b.id} di ${b.propertyName} telah melewati SLA 24 jam tanpa verifikasi. Mohon segera periksa aplikasi Kost Management Anda.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center space-x-1"
                              title="Eskalasi Manual ke Owner via WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Hubungi Owner</span>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL DETAIL TRANSAKSI */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-indigo-400 block font-bold">
                    Detail Transaksi Booking
                  </span>
                  <h2 className="text-base font-black text-white">{selectedBooking.id}</h2>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-slate-400 hover:text-white font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Properti Kos:</span>
                  <span className="font-semibold text-white">{selectedBooking.propertyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipe Kamar:</span>
                  <span className="font-semibold">{selectedBooking.roomName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Penyewa:</span>
                  <span className="font-semibold">{selectedBooking.customerName} ({selectedBooking.customerPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jumlah Slot Dipesan:</span>
                  <span className="font-semibold">{selectedBooking.requestedSlots} Orang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rencana Mulai Masuk:</span>
                  <span className="font-semibold">{selectedBooking.checkInDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Nominal Sewa:</span>
                  <span className="font-black text-indigo-400 text-sm">
                    Rp {selectedBooking.totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {selectedBooking.paymentProofUrl && (
                <div className="p-3 bg-slate-800 rounded-xl space-y-2">
                  <span className="text-[11px] font-bold text-slate-300 block">Lampiran Bukti Bayar Customer:</span>
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                    <img
                      src={selectedBooking.paymentProofUrl}
                      alt="Bukti Transfer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
