import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  Building2, Users, Check, AlertCircle, ArrowRight, 
  ShieldAlert, Sparkles, BedDouble 
} from 'lucide-react';

export const RoomDetail: React.FC<{ roomId: string }> = ({ roomId }) => {
  const { navigate } = useRouter();
  const { getRoom, getProperty } = useAppStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const room = getRoom(roomId);
  const property = room ? getProperty(room.propertyId) : undefined;

  if (!room || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header showBack title="Kamar Tidak Ditemukan" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <h2 className="text-lg font-bold text-slate-800">Kamar Tidak Ditemukan</h2>
          <button
            onClick={() => navigate('/search')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
          >
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

  const availableSlots = room.totalCapacity - room.occupiedSlots - room.reservedSlots;
  const isAvailable = availableSlots > 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      <Header showBack title={room.name} />

      <main className="max-w-4xl mx-auto w-full px-4 pt-3 space-y-5">
        {/* ROOM IMAGES */}
        <div className="space-y-2">
          <div className="aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-200 relative shadow-sm">
            <img
              src={room.images[activeImageIndex] || property.coverImage}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex items-center space-x-1.5">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                room.type === 'bersama' ? 'bg-amber-500/90 text-white' : 'bg-indigo-600/90 text-white'
              }`}>
                {room.type === 'bersama' ? 'Kamar Bersama' : 'Kamar Privat'}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                Luas {room.sizeM2} m²
              </span>
            </div>
          </div>

          {room.images.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                    activeImageIndex === idx ? 'border-indigo-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ROOM TITLE & PARENT PROPERTY */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div
            onClick={() => navigate(`/property/${property.id}`)}
            className="flex items-center space-x-2 text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            <span>{property.name} ({property.city})</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {room.name}
          </h1>

          {/* KAPASITAS AGREGAT & SLOT BREAKDOWN (ADR-010) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Kapasitas Slot Kamar (Real-Time Source of Truth)</span>
              </span>
              {isAvailable ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Tersedia {availableSlots} Slot
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
                  Kamar Penuh
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Total Slot</span>
                <span className="font-extrabold text-slate-800 text-sm">{room.totalCapacity} orang</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Terisi (Penghuni)</span>
                <span className="font-extrabold text-slate-800 text-sm">{room.occupiedSlots} orang</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Hold Transaksi</span>
                <span className="font-extrabold text-amber-600 text-sm">{room.reservedSlots} orang</span>
              </div>
            </div>
          </div>
        </div>

        {/* ATURAN KAMAR BERSAMA / SHARED ROOM (ADR-004, ADR-010) */}
        {room.type === 'bersama' && (
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs space-y-1.5 shadow-xs">
            <div className="flex items-center space-x-2 font-extrabold text-sm text-amber-950">
              <BedDouble className="w-4 h-4 text-amber-600" />
              <span>Informasi Khusus Kamar Bersama (Shared Room)</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-800">
              Kamar ini disewakan dengan skema per slot ranjang (kapasitas {room.totalCapacity} orang). Anda dapat memesan 1 slot untuk diri sendiri, atau memesan sekaligus beberapa slot (hingga {availableSlots} slot) jika memesan bersama rekan. Harga tercantum di bawah adalah tarif per slot per bulan.
            </p>
          </div>
        )}

        {/* FASILITAS KAMAR */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Fasilitas Kamar Ini</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {room.facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-700">
                <div className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{fac}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto shadow-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
            Tarif Sewa
          </span>
          <span className="text-base sm:text-lg font-black text-indigo-600">
            Rp {room.pricePerMonth.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-slate-500 font-medium"> / slot / bulan</span>
        </div>

        <button
          onClick={() => navigate(`/booking/${room.id}`)}
          disabled={!isAvailable}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>Lanjut Pesan Kamar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
