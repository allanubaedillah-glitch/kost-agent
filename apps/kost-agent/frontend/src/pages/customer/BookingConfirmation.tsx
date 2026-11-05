import React from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  CheckCircle, Calendar, MapPin, Users, Phone, 
  Download, ArrowRight, ShieldCheck, Clock 
} from 'lucide-react';

export const BookingConfirmation: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { navigate } = useRouter();
  const { getBooking, getProperty, simulateCheckIn } = useAppStore();

  const booking = getBooking(bookingId);
  const property = booking ? getProperty(booking.propertyId) : undefined;

  if (!booking || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header showBack title="Tiket Tidak Ditemukan" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xs text-slate-500">Pemesanan tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const handleSimulateArrival = () => {
    simulateCheckIn(booking.id);
    alert('Simulasi Check-In Berhasil! Anda kini berstatus CHECKED IN. Anda dapat memberikan ulasan dan rating di halaman riwayat.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header showBack title="Voucher Konfirmasi Sewa" />

      <main className="max-w-2xl mx-auto w-full px-4 pt-4 space-y-5">
        {/* SUCCESS BADGE */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-slate-900">Konfirmasi Sewa Resmi</h1>
          <p className="text-xs text-slate-500">
            Pembayaran telah diverifikasi pemilik. Tunjukkan voucher ini saat tiba di kos.
          </p>
        </div>

        {/* TICKET / VOUCHER CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
          {/* TICKET HEADER */}
          <div className="bg-indigo-600 text-white p-5 space-y-1 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-200">
                Tiket Sewa KostAgent
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-indigo-950 font-black text-[10px] uppercase">
                {booking.status === 'CHECKED_IN' ? 'CHECKED IN' : 'CONFIRMED'}
              </span>
            </div>
            <h2 className="text-lg font-black">{property.name}</h2>
            <div className="flex items-center space-x-1 text-xs text-indigo-100 opacity-90">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{property.address}, {property.city}</span>
            </div>
          </div>

          {/* TICKET BODY */}
          <div className="p-5 space-y-4 text-xs">
            {/* BOOKING CODE */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Kode Pemesanan
                </span>
                <span className="text-sm font-mono font-black text-indigo-600">
                  {booking.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Tipe Kamar
                </span>
                <span className="font-bold text-slate-800">{booking.roomName}</span>
              </div>
            </div>

            {/* CHECK-IN INFO */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-indigo-600" />
                  <span>Rencana Mulai Masuk</span>
                </span>
                <span className="font-bold text-slate-900 text-xs block mt-1">
                  {booking.checkInDate}
                </span>
                <span className="text-[10px] text-slate-500">Durasi: {booking.durationMonths} Bulan</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Batas Kedatangan (H+14)</span>
                </span>
                <span className="font-bold text-amber-700 text-xs block mt-1">
                  Maksimal 14 Hari
                </span>
                <span className="text-[10px] text-slate-500">Koordinasikan via WhatsApp</span>
              </div>
            </div>

            {/* OCCUPANTS LIST */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 block">
                Daftar Penghuni ({booking.requestedSlots} Orang):
              </span>
              {booking.occupants.map((occ, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {idx + 1}. {occ.fullName}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    WA: {occ.phone}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL PAID */}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-slate-500">Total Biaya Sewa Lunas</span>
              <span className="text-base font-black text-slate-900">
                Rp {booking.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* OWNER CONTACT & ARRIVAL COORDINATION */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Koordinasi Kedatangan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hubungi pemilik kos untuk konfirmasi jam penyerahan kunci kamar dan verifikasi identitas fisik.
          </p>

          <a
            href={`https://wa.me/${property.ownerContact.phone.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${property.ownerContact.name}, saya penyewa kamar ${booking.roomName} (Kode: ${booking.id}) ingin berkoordinasi mengenai rencana jam kedatangan saya.`)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Chat WhatsApp Pemilik Kos ({property.ownerContact.name})</span>
          </a>

          {booking.status === 'ACCEPTED' && (
            <button
              onClick={handleSimulateArrival}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition border border-slate-200"
            >
              Simulasikan Sudah Tiba di Lokasi & Check-In
            </button>
          )}

          <button
            onClick={() => navigate('/history')}
            className="w-full py-2 text-indigo-600 hover:underline font-bold text-xs text-center block"
          >
            Lihat di Riwayat Pemesanan
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
