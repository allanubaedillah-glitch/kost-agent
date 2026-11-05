import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { PWAInstallBanner } from '../../components/common/PWAInstallBanner';
import { 
  Search, MapPin, Sparkles, ShieldCheck, CreditCard, 
  Users, Star, ArrowRight, CheckCircle2 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const { properties, rooms } = useAppStore();
  const [keyword, setKeyword] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Only show properties with ACTIVE partnership status in public marketplace
  const activeProperties = properties.filter(p => p.partnershipStatus === 'ACTIVE');

  const cities = ['Semua Kota', 'Jakarta Selatan', 'Bandung', 'Yogyakarta'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}&city=${encodeURIComponent(selectedCity)}`);
  };

  const getLowestPrice = (propId: string) => {
    const propRooms = rooms.filter(r => r.propertyId === propId);
    if (propRooms.length === 0) return 0;
    return Math.min(...propRooms.map(r => r.pricePerMonth));
  };

  const getAvailableRoomsCount = (propId: string) => {
    const propRooms = rooms.filter(r => r.propertyId === propId);
    return propRooms.filter(r => (r.totalCapacity - r.occupiedSlots - r.reservedSlots) > 0).length;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <PWAInstallBanner />
      <Header />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white px-4 pt-8 pb-12 shadow-inner">
        <div className="max-w-4xl mx-auto space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Platform Agregasi Kos Terpercaya & Transparan</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Temukan Kamar Impian, <br className="hidden sm:inline" />
            <span className="text-indigo-300">Bayar Langsung ke Pemilik Kos</span>
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl leading-relaxed">
            Ketersediaan slot terintegrasi langsung dengan sistem operasional pemilik (Kost Management). Tanpa markup biaya tersembunyi!
          </p>

          {/* SEARCH BOX */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl max-w-2xl text-slate-800 flex flex-col sm:flex-row gap-2 mt-6"
          >
            <div className="flex-1 flex items-center px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari nama kos, area, atau kampus..."
                className="w-full bg-transparent text-xs sm:text-sm focus:outline-none"
              />
            </div>

            <div className="sm:w-48 flex items-center px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <MapPin className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm focus:outline-none font-medium text-slate-700"
              >
                <option value="">Semua Kota</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Bandung">Bandung</option>
                <option value="Yogyakarta">Yogyakarta</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-indigo-300 flex items-center justify-center space-x-1.5"
            >
              <span>Cari Kos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* QUICK CITIES FILTER PILLS */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 no-scrollbar">
            <span className="text-[11px] text-indigo-300 font-bold shrink-0">Kota Populer:</span>
            {cities.map((city) => {
              const val = city === 'Semua Kota' ? '' : city;
              const isSelected = selectedCity === val;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(val);
                    navigate(`/search?city=${encodeURIComponent(val)}`);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition ${
                    isSelected
                      ? 'bg-white text-indigo-900 font-bold'
                      : 'bg-indigo-800/80 hover:bg-indigo-700/80 text-indigo-200 border border-indigo-700'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION BADGES */}
      <section className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">Direct Payment</h2>
            <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
              Transfer sewa langsung ke rekening resmi pemilik kos.
            </p>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">Slot Real-Time</h2>
            <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
              Sinkronisasi kapasitas otomatis, anti dobel booking.
            </p>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">Privat & Bersama</h2>
            <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
              Pilihan kamar privat atau kamar bersama hemat biaya.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES LISTING */}
      <section className="max-w-4xl mx-auto px-4 mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Rekomendasi Kos Terverifikasi
            </h2>
            <p className="text-xs text-slate-500">
              Listing kemitraan aktif dengan informasi fasilitas lengkap
            </p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeProperties.map((prop) => {
            const lowestPrice = getLowestPrice(prop.id);
            const availableRooms = getAvailableRoomsCount(prop.id);

            const genderBadgeColor =
              prop.type === 'putri'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : prop.type === 'putra'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200';

            const genderLabel =
              prop.type === 'putri'
                ? 'Kos Putri'
                : prop.type === 'putra'
                ? 'Kos Putra'
                : 'Kos Campur';

            return (
              <div
                key={prop.id}
                onClick={() => navigate(`/property/${prop.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col group"
              >
                {/* IMAGE COVER */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={prop.coverImage}
                    alt={prop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold border ${genderBadgeColor} shadow-sm backdrop-blur-sm bg-white/90`}>
                      {genderLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center space-x-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{prop.rating > 0 ? prop.rating : 'Baru'}</span>
                    {prop.reviewCount > 0 && (
                      <span className="text-slate-300 text-[10px]">({prop.reviewCount})</span>
                    )}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center space-x-1 text-slate-400 text-[11px] mb-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{prop.district}, {prop.city}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-indigo-600 transition">
                      {prop.name}
                    </h3>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{availableRooms} tipe kamar tersedia</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Mulai dari</span>
                      <span className="text-sm font-black text-indigo-600">
                        Rp {lowestPrice.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal"> / bln</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition flex items-center">
                      Detail <ArrowRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};
