import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { OwnerNavbar } from '../components/OwnerNavbar';
import { 
  Building2, PlusCircle, ArrowRight, MapPin, 
  BedDouble, Users, Handshake, CheckCircle2 
} from 'lucide-react';

export const PropertyList: React.FC = () => {
  const { navigate } = useRouter();
  const { properties, rooms, setSelectedPropertyId } = useOwnerStore();

  const handleSelectProperty = (propId: string) => {
    setSelectedPropertyId(propId);
    navigate(`/properties/${propId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <OwnerNavbar />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Portofolio Properti Kos</h1>
            <p className="text-xs text-slate-500">
              Kelola unit kos Anda secara independen. Kemitraan dan operasional dikonfigurasi per properti.
            </p>
          </div>

          <button
            onClick={() => navigate('/properties/add')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Properti Baru</span>
          </button>
        </div>

        {/* PROPERTY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => {
            const propRooms = rooms.filter(r => r.propertyId === prop.id);
            const totalCapacity = propRooms.reduce((sum, r) => sum + r.totalCapacity, 0);
            const occupied = propRooms.reduce((sum, r) => sum + r.occupiedSlots, 0);
            const reserved = propRooms.reduce((sum, r) => sum + r.reservedSlots, 0);
            const available = totalCapacity - occupied - reserved;

            const isPartnered = prop.partnershipStatus === 'ACTIVE';

            return (
              <div
                key={prop.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-slate-100 relative">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-black/75 text-white backdrop-blur-md">
                        Kos {prop.type}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase backdrop-blur-md shadow-sm ${
                        isPartnered
                          ? 'bg-emerald-600 text-white'
                          : prop.partnershipStatus === 'WAITING_REVIEW'
                          ? 'bg-amber-600 text-white'
                          : prop.partnershipStatus === 'REJECTED'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {isPartnered
                          ? 'Mitra KostAgent Aktif'
                          : prop.partnershipStatus === 'WAITING_REVIEW'
                          ? 'Review Admin'
                          : prop.partnershipStatus === 'REJECTED'
                          ? 'Revisi Listing'
                          : 'Belum Mitra'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h2 className="font-bold text-slate-900 text-base line-clamp-1">{prop.name}</h2>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{prop.district}, {prop.city}</span>
                    </div>

                    {/* METRICS ROW */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">Tipe Kamar:</span>
                        <span className="font-extrabold text-slate-800 text-xs">{propRooms.length} Tipe</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">Slot Tersedia:</span>
                        <span className="font-extrabold text-emerald-600 text-xs">{available} dari {totalCapacity} slot</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSelectProperty(prop.id)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-sm shadow-indigo-100"
                  >
                    <span>Buka Ruang Kerja Properti</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
