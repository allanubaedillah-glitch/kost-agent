import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  BedDouble, Plus, Edit3, Users, CheckCircle, 
  Clock, AlertCircle, Wrench 
} from 'lucide-react';
import { RoomStatus } from '../types';

export const RoomManagement: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { navigate } = useRouter();
  const { getProperty, getRoomsForProperty, updateRoomOperationalStatus } = useOwnerStore();

  const property = getProperty(propertyId);
  const rooms = getRoomsForProperty(propertyId);

  if (!property) return null;

  const handleStatusChange = (roomId: string, newStatus: RoomStatus) => {
    updateRoomOperationalStatus(roomId, newStatus);
    alert(`Status operasional kamar berhasil diperbarui menjadi ${newStatus}.`);
  };

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="rooms">
      <div className="space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-slate-900">Pengelolaan Kamar & Status Operasional</h1>
            <p className="text-xs text-slate-500">
              Atur kapasitas slot agregat, tarif bulanan, dan status operasional kamar (KM-ROM).
            </p>
          </div>

          <button
            onClick={() => navigate(`/properties/${propertyId}/rooms/add`)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kamar Baru</span>
          </button>
        </div>

        {/* ROOMS LIST */}
        <div className="space-y-4">
          {rooms.map((room) => {
            const availableSlots = room.totalCapacity - room.occupiedSlots - room.reservedSlots;

            return (
              <div
                key={room.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:border-indigo-200 transition flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* ROOM INFO */}
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative">
                    <img
                      src={room.images[0] || property.coverImage}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white">
                      {room.sizeM2} m²
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        room.type === 'bersama' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {room.type === 'bersama' ? 'Kamar Bersama' : 'Kamar Privat'}
                      </span>
                      <h2 className="font-bold text-slate-900 text-base">{room.name}</h2>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-black text-indigo-600 text-sm">
                        Rp {room.pricePerMonth.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[11px] text-slate-400">/ slot / bulan</span>
                    </div>

                    {/* FACILITIES TAGS */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {room.facilities.slice(0, 4).map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CAPACITY BREAKDOWN & ACTIONS */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  {/* NUMERIC SLOTS (ADR-010) */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center min-w-[170px] space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Status Kapasitas Slot
                    </span>
                    <div className="flex items-center justify-around font-bold text-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Total</span>
                        <span>{room.totalCapacity}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Terisi</span>
                        <span>{room.occupiedSlots}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <div>
                        <span className="text-emerald-600 block text-[10px]">Sisa</span>
                        <span className="text-emerald-600 font-extrabold">{availableSlots}</span>
                      </div>
                    </div>
                  </div>

                  {/* OPERATIONAL STATUS SELECT */}
                  <div className="flex flex-col space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Status Kamar:
                    </span>
                    <select
                      value={room.status}
                      onChange={(e) => handleStatusChange(room.id, e.target.value as RoomStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                        room.status === 'TERSEDIA'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : room.status === 'DIPESAN'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : room.status === 'DITEMPATI'
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="TERSEDIA">TERSEDIA (Buka)</option>
                      <option value="DIPESAN">DIPESAN (Hold)</option>
                      <option value="DITEMPATI">DITEMPATI (Penuh)</option>
                      <option value="MAINTENANCE">MAINTENANCE (Perawatan)</option>
                    </select>
                  </div>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => navigate(`/properties/${propertyId}/rooms/${room.id}`)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Edit Kamar"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PropertyContextLayout>
  );
};
