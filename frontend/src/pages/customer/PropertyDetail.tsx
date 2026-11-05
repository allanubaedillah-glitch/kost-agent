import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  MapPin, Star, ShieldCheck, Check, Clock, Phone, 
  Share2, ChevronRight, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';

export const PropertyDetail: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { navigate } = useRouter();
  const { getProperty, getRoomsForProperty, reviews } = useAppStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const property = getProperty(propertyId);
  const rooms = getRoomsForProperty(propertyId);
  const propReviews = reviews.filter(r => r.propertyId === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header showBack title="Properti Tidak Ditemukan" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <h2 className="text-lg font-bold text-slate-800">Properti Kos Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500">Kos ini mungkin telah ditangguhkan atau ID tidak valid.</p>
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

  const genderBadgeColor =
    property.type === 'putri'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : property.type === 'putra'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  const genderLabel =
    property.type === 'putri'
      ? 'Kos Putri'
      : property.type === 'putra'
      ? 'Kos Putra'
      : 'Kos Campur';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Lihat kos ${property.name} di KostAgent!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan properti kos telah disalin ke clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header showBack title={property.name} />

      <main className="max-w-4xl mx-auto w-full px-4 pt-3 space-y-5">
        {/* IMAGE GALLERY CAROUSEL */}
        <div className="space-y-2">
          <div className="aspect-[16/10] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-200 relative shadow-sm">
            <img
              src={property.images[activeImageIndex] || property.coverImage}
              alt={property.name}
              className="w-full h-full object-cover transition duration-300"
            />
            <button
              onClick={handleShare}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white flex items-center justify-center transition"
              title="Bagikan Kos"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* THUMBNAILS */}
          {property.images.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {property.images.map((img, idx) => (
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

        {/* PROPERTY HEADER & META */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold border ${genderBadgeColor}`}>
              {genderLabel}
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Mitra Terverifikasi KostAgent</span>
            </span>
            <div className="ml-auto flex items-center space-x-1 text-xs font-bold text-slate-800">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{property.rating > 0 ? property.rating : 'Baru'}</span>
              <span className="text-slate-400 text-[11px]">({property.reviewCount} ulasan)</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {property.name}
          </h1>

          <div className="flex items-start space-x-2 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{property.address}, {property.district}, {property.city}</span>
          </div>

          {/* SINKRONISASI REAL-TIME INDICATOR */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
            <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ketersediaan slot terintegrasi langsung via Kost Management</span>
            </span>
            <span className="text-slate-400 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Sinkron: {new Date(property.lastSyncAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
            </span>
          </div>

          {/* OWNER WHATSAPP BUTTON */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${property.ownerContact.phone.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${property.ownerContact.name}, saya melihat kos ${property.name} di KostAgent dan ingin bertanya informasi sewa.`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tanya Pemilik Kos (WA: {property.ownerContact.name})</span>
            </a>
          </div>
        </div>

        {/* DESKRIPSI */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
          <h2 className="text-sm font-bold text-slate-900">Deskripsi Kos</h2>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
            {property.description}
          </p>
        </div>

        {/* FASILITAS BERSAMA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Fasilitas Bersama Properti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {property.facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{fac}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KETENTUAN DAN TATA TERTIB KOS (ADR-009) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Syarat & Ketentuan Sewa</h2>
          <div className="space-y-1.5">
            {property.rulesCheckboxes.map((rule) => (
              <div key={rule.id} className="flex items-center space-x-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  {rule.label} {rule.isRequired && <span className="text-rose-500 font-bold">*Wajib</span>}
                </span>
              </div>
            ))}
          </div>
          {property.rulesNotes && (
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-900">
              <strong className="block font-bold mb-0.5">Tata Tertib Tambahan:</strong>
              {property.rulesNotes}
            </div>
          )}
        </div>

        {/* DAFTAR KAMAR TERSEDIA */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pilihan Tipe Kamar</h2>
              <p className="text-xs text-slate-500">Pilih kamar dan slot penghuni yang diinginkan</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600">
              {rooms.length} Tipe Kamar
            </span>
          </div>

          <div className="space-y-4">
            {rooms.map((room) => {
              const availableSlots = room.totalCapacity - room.occupiedSlots - room.reservedSlots;
              const isAvailable = availableSlots > 0;

              return (
                <div
                  key={room.id}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row gap-4 ${
                    isAvailable
                      ? 'border-slate-200 bg-white hover:border-indigo-300 shadow-xs'
                      : 'border-slate-200 bg-slate-50 opacity-75'
                  }`}
                >
                  {/* ROOM THUMBNAIL */}
                  <div className="sm:w-44 h-32 rounded-xl overflow-hidden bg-slate-100 relative shrink-0">
                    <img
                      src={room.images[0] || property.coverImage}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm">
                      {room.sizeM2} m²
                    </span>
                  </div>

                  {/* ROOM INFO */}
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          room.type === 'bersama' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {room.type === 'bersama' ? 'Kamar Bersama' : 'Kamar Privat'}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900">{room.name}</h3>
                      </div>

                      {/* SLOTS CAPACITY BADGE */}
                      <div className="mt-2 flex items-center space-x-2 text-xs">
                        {isAvailable ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px] flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Tersedia {availableSlots} dari {room.totalCapacity} slot</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[11px]">
                            Slot Penuh
                          </span>
                        )}
                        {room.reservedSlots > 0 && (
                          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold">
                            ({room.reservedSlots} sedang di-hold)
                          </span>
                        )}
                      </div>

                      {/* ROOM FACILITIES */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {room.facilities.slice(0, 4).map((f, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {f}
                          </span>
                        ))}
                        {room.facilities.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-medium">
                            +{room.facilities.length - 4} lainnya
                          </span>
                        )}
                      </div>
                    </div>

                    {/* PRICING AND ACTION */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-sm sm:text-base font-black text-indigo-600">
                          Rp {room.pricePerMonth.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-500"> / slot / bulan</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/room/${room.id}`)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
                        >
                          Detail Kamar
                        </button>
                        <button
                          onClick={() => navigate(`/booking/${room.id}`)}
                          disabled={!isAvailable}
                          className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
                        >
                          <span>Pesan</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* VERIFIED REVIEWS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Ulasan Penghuni Terverifikasi</h2>
              <p className="text-xs text-slate-500">Hanya penghuni yang pernah menyewa di kos ini</p>
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold text-slate-800">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{property.rating > 0 ? property.rating : '0'}</span>
            </div>
          </div>

          {propReviews.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada ulasan untuk kos ini.</p>
          ) : (
            <div className="space-y-3">
              {propReviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{rev.customerName}</span>
                    <div className="flex items-center space-x-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-400 block">
                    {new Date(rev.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
