import React, { useState, useMemo } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  Search as SearchIcon, MapPin, SlidersHorizontal, 
  Star, ArrowRight, CheckCircle2, RotateCcw 
} from 'lucide-react';
import { PropertyGenderType, RoomType } from '../../types';

export const Search: React.FC = () => {
  const { navigate } = useRouter();
  const { properties, rooms } = useAppStore();

  // Read URL query params if any
  const urlParams = new URLSearchParams(window.location.search);
  const initialKeyword = urlParams.get('keyword') || '';
  const initialCity = urlParams.get('city') || '';

  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedGender, setSelectedGender] = useState<PropertyGenderType | 'semua'>('semua');
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | 'semua'>('semua');
  const [sortBy, setSortBy] = useState<'termurah' | 'termahal' | 'rating'>('termurah');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Must be ACTIVE in public marketplace
      if (p.partnershipStatus !== 'ACTIVE') return false;

      // Keyword filter
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDistrict = p.district.toLowerCase().includes(q);
        const matchCity = p.city.toLowerCase().includes(q);
        if (!matchName && !matchDistrict && !matchCity) return false;
      }

      // City filter
      if (selectedCity && selectedCity !== 'Semua Kota') {
        if (!p.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      }

      // Gender filter
      if (selectedGender !== 'semua') {
        if (p.type !== selectedGender) return false;
      }

      // Room type filter
      if (selectedRoomType !== 'semua') {
        const propRooms = rooms.filter(r => r.propertyId === p.id);
        const hasType = propRooms.some(r => r.type === selectedRoomType);
        if (!hasType) return false;
      }

      return true;
    }).sort((a, b) => {
      const getMinPrice = (propId: string) => {
        const r = rooms.filter(rm => rm.propertyId === propId);
        return r.length ? Math.min(...r.map(x => x.pricePerMonth)) : 0;
      };

      if (sortBy === 'termurah') {
        return getMinPrice(a.id) - getMinPrice(b.id);
      } else if (sortBy === 'termahal') {
        return getMinPrice(b.id) - getMinPrice(a.id);
      } else {
        return b.rating - a.rating;
      }
    });
  }, [properties, rooms, keyword, selectedCity, selectedGender, selectedRoomType, sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedCity('');
    setSelectedGender('semua');
    setSelectedRoomType('semua');
    setSortBy('termurah');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header showBack title="Cari Kamar Kos" />

      <main className="max-w-4xl mx-auto w-full px-4 pt-4 space-y-4">
        {/* SEARCH AND FILTER BAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <SearchIcon className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari nama kos, area, jalan..."
                className="w-full bg-transparent text-xs sm:text-sm focus:outline-none text-slate-800"
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
          </div>

          {/* CHIP FILTERS */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-bold flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1" /> Filter:
            </span>

            {/* Gender filter */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
              {(['semua', 'campur', 'putra', 'putri'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition ${
                    selectedGender === g
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {g === 'semua' ? 'Semua Tipe' : g}
                </button>
              ))}
            </div>

            {/* Room type filter */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
              {(['semua', 'privat', 'bersama'] as const).map((rt) => (
                <button
                  key={rt}
                  onClick={() => setSelectedRoomType(rt)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition ${
                    selectedRoomType === rt
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {rt === 'semua' ? 'Semua Kamar' : rt === 'privat' ? 'Privat' : 'Kamar Bersama'}
                </button>
              ))}
            </div>

            {/* Sort select */}
            <div className="ml-auto flex items-center space-x-1.5">
              <span className="text-slate-400 text-[11px]">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-100 rounded-lg px-2.5 py-1 text-[11px] font-bold text-slate-700 focus:outline-none"
              >
                <option value="termurah">Harga Termurah</option>
                <option value="termahal">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS COUNT & RESET */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Menampilkan <strong className="text-slate-900">{filteredProperties.length}</strong> properti kos aktif</span>
          {(keyword || selectedCity || selectedGender !== 'semua' || selectedRoomType !== 'semua') && (
            <button
              onClick={resetFilters}
              className="text-indigo-600 font-bold hover:underline flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* PROPERTIES GRID */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center space-y-3 border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SearchIcon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Kos Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tidak ada properti kos yang sesuai dengan kriteria filter Anda. Coba ganti kata kunci atau reset filter.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-100 transition"
            >
              Hapus Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredProperties.map((prop) => {
              const propRooms = rooms.filter(r => r.propertyId === prop.id);
              const lowestPrice = propRooms.length ? Math.min(...propRooms.map(r => r.pricePerMonth)) : 0;
              const availableRooms = propRooms.filter(r => (r.totalCapacity - r.occupiedSlots - r.reservedSlots) > 0).length;

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
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
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
                        Pilih <ArrowRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};
