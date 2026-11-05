import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Building2, MapPin, Star, ShieldCheck, 
  Ban, CheckCircle, Search, SlidersHorizontal 
} from 'lucide-react';

export const PropertyMonitoring: React.FC = () => {
  const { properties, rooms, adminToggleSuspendListing } = useAppStore();
  const [keyword, setKeyword] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const filtered = properties.filter((p) => {
    if (keyword && !p.name.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (cityFilter && !p.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    return true;
  });

  const handleToggleSuspend = (propId: string, currentStatus: string) => {
    const isSuspending = currentStatus !== 'SUSPENDED';
    const reason = prompt(
      isSuspending
        ? 'Masukkan alasan penangguhan (suspend) listing kos ini:'
        : 'Masukkan alasan pengaktifan kembali listing kos:',
      isSuspending ? 'Laporan komplain fasilitas tidak sesuai' : 'Pemilik telah memperbarui informasi'
    );

    if (reason) {
      adminToggleSuspendListing(propId, reason);
      alert(`Status properti berhasil diubah menjadi ${isSuspending ? 'SUSPENDED (Ditangguhkan)' : 'ACTIVE (Aktif)'}.`);
    }
  };

  return (
    <AdminLayout activeTab="properties">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-white">Monitoring Katalog Properti Kos</h1>
            <p className="text-xs text-slate-400">
              Pengawasan seluruh listing kos terdaftar dan penegakan kepatuhan platform (UC-KA-13).
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari nama properti..."
                className="bg-transparent text-white focus:outline-none"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none"
            >
              <option value="">Semua Kota</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Bandung">Bandung</option>
              <option value="Yogyakarta">Yogyakarta</option>
            </select>
          </div>
        </div>

        {/* PROPERTIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((prop) => {
            const propRooms = rooms.filter(r => r.propertyId === prop.id);
            const totalCapacity = propRooms.reduce((sum, r) => sum + r.totalCapacity, 0);
            const occupied = propRooms.reduce((sum, r) => sum + r.occupiedSlots, 0);

            const isSuspended = prop.partnershipStatus === 'SUSPENDED';

            return (
              <div
                key={prop.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video relative bg-slate-800">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase backdrop-blur-md ${
                        prop.partnershipStatus === 'ACTIVE'
                          ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800'
                          : prop.partnershipStatus === 'SUSPENDED'
                          ? 'bg-rose-950/90 text-rose-300 border border-rose-800'
                          : 'bg-amber-950/90 text-amber-300 border border-amber-800'
                      }`}>
                        {prop.partnershipStatus}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{prop.rating > 0 ? prop.rating : 'Baru'}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h2 className="font-bold text-white text-sm truncate">{prop.name}</h2>
                    <div className="flex items-center space-x-1 text-slate-400 text-xs">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{prop.district}, {prop.city}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div>
                        <span className="text-[10px] block">Jumlah Tipe Kamar:</span>
                        <span className="font-bold text-slate-200">{propRooms.length} Kamar</span>
                      </div>
                      <div>
                        <span className="text-[10px] block">Total Slot Penghuni:</span>
                        <span className="font-bold text-slate-200">{occupied} / {totalCapacity} Terisi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleToggleSuspend(prop.id, prop.partnershipStatus)}
                    className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
                      isSuspended
                        ? 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800'
                        : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-800/80'
                    }`}
                  >
                    {isSuspended ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Pulihkan & Aktifkan Listing</span>
                      </>
                    ) : (
                      <>
                        <Ban className="w-3.5 h-3.5" />
                        <span>Tangguhkan Listing (Suspend)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
