import React, { useState, useEffect } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  BedDouble, Users, CreditCard, Check, 
  ArrowRight, ChevronLeft, AlertCircle 
} from 'lucide-react';
import { RoomType, RoomStatus } from '../types';

export const RoomDetailEdit: React.FC<{ propertyId: string; roomId?: string }> = ({
  propertyId,
  roomId
}) => {
  const { navigate } = useRouter();
  const { getProperty, getRoom, addRoom, updateRoom } = useOwnerStore();

  const property = getProperty(propertyId);
  const existingRoom = roomId ? getRoom(roomId) : undefined;
  const isEditing = Boolean(existingRoom);

  const [name, setName] = useState(existingRoom?.name || '');
  const [type, setType] = useState<RoomType>(existingRoom?.type || 'privat');
  const [totalCapacity, setTotalCapacity] = useState<number>(existingRoom?.totalCapacity || 1);
  const [sizeM2, setSizeM2] = useState<number>(existingRoom?.sizeM2 || 18);
  const [pricePerMonth, setPricePerMonth] = useState<number>(existingRoom?.pricePerMonth || 1500000);
  const [status, setStatus] = useState<RoomStatus>(existingRoom?.status || 'TERSEDIA');

  const standardFacilities = [
    'AC 1 PK', 'Kamar Mandi Dalam', 'Water Heater', 
    'Kasur Springbed', 'Meja Kerja & Kursi', 'Lemari Pakaian', 
    'Smart TV 32"', 'Kulkas Mini', 'Jendela Luar / Balkon'
  ];
  const [facilities, setFacilities] = useState<string[]>(
    existingRoom?.facilities || ['AC 1 PK', 'Kamar Mandi Dalam', 'Kasur Springbed', 'Meja Kerja & Kursi', 'Lemari Pakaian']
  );

  useEffect(() => {
    if (existingRoom) {
      setName(existingRoom.name);
      setType(existingRoom.type);
      setTotalCapacity(existingRoom.totalCapacity);
      setSizeM2(existingRoom.sizeM2);
      setPricePerMonth(existingRoom.pricePerMonth);
      setStatus(existingRoom.status);
      setFacilities(existingRoom.facilities);
    }
  }, [existingRoom]);

  if (!property) return null;

  const toggleFacility = (fac: string) => {
    if (facilities.includes(fac)) {
      setFacilities(facilities.filter(f => f !== fac));
    } else {
      setFacilities([...facilities, fac]);
    }
  };

  const handleTypeChange = (newType: RoomType) => {
    setType(newType);
    if (newType === 'privat') {
      setTotalCapacity(1);
    } else if (totalCapacity < 2) {
      setTotalCapacity(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('Mohon isi nama / label nomor kamar.');
      return;
    }

    if (isEditing && existingRoom) {
      // Validate capacity reduction rule (UC-KM-02): cannot be lower than occupied + reserved
      const activeSlots = existingRoom.occupiedSlots + existingRoom.reservedSlots;
      if (totalCapacity < activeSlots) {
        alert(`Kapasitas total tidak boleh lebih kecil dari jumlah slot yang sedang terisi atau di-hold (${activeSlots} slot).`);
        return;
      }

      updateRoom(existingRoom.id, {
        name,
        type,
        totalCapacity,
        sizeM2,
        pricePerMonth,
        status,
        facilities
      });
      alert('Data kamar berhasil diperbarui!');
    } else {
      await addRoom({
        propertyId,
        name,
        type,
        totalCapacity,
        sizeM2,
        pricePerMonth,
        status,
        facilities,
        images: [property.coverImage]
      });
      alert(`Kamar "${name}" berhasil ditambahkan!`);
    }

    navigate(`/properties/${propertyId}/rooms`);
  };

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="rooms">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button
            onClick={() => navigate(`/properties/${propertyId}/rooms`)}
            className="hover:text-indigo-600 font-semibold flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Kamar</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h1 className="text-xl font-black text-slate-900">
              {isEditing ? `Edit Rincian Kamar: ${existingRoom?.name}` : 'Tambah Kamar Baru'}
            </h1>
            <p className="text-xs text-slate-500">
              Konfigurasi kapasitas numerik slot kamar dan fasilitas kamar (KM-ROM-001).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama / Nomor Kamar *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Deluxe Suite A-101"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tipe Kamar (ADR-004, ADR-010) *
                </label>
                <select
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value as RoomType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="privat">Kamar Privat (1 Orang)</option>
                  <option value="bersama">Kamar Bersama / Shared (Multi-Slot)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Kapasitas Slot *
                </label>
                <input
                  type="number"
                  min={type === 'privat' ? 1 : 2}
                  max={type === 'privat' ? 1 : 8}
                  value={totalCapacity}
                  onChange={(e) => setTotalCapacity(Number(e.target.value))}
                  disabled={type === 'privat'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-indigo-600 disabled:opacity-60"
                  required
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  {type === 'privat' ? 'Kamar privat tetap 1 slot' : 'Jumlah slot ranjang'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Luas Kamar ($m^2$)
                </label>
                <input
                  type="number"
                  min={6}
                  max={100}
                  value={sizeM2}
                  onChange={(e) => setSizeM2(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Status Operasional
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as RoomStatus)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  <option value="TERSEDIA">TERSEDIA</option>
                  <option value="DIPESAN">DIPESAN (Hold)</option>
                  <option value="DITEMPATI">DITEMPATI</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tarif Sewa Bulanan per Slot (Rp) *
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs font-bold text-slate-400 mr-2">Rp</span>
                <input
                  type="number"
                  step={50000}
                  value={pricePerMonth}
                  onChange={(e) => setPricePerMonth(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-bold text-indigo-600 focus:outline-none"
                  required
                />
                <span className="text-xs text-slate-400 shrink-0">/ slot / bulan</span>
              </div>
            </div>

            {/* FASILITAS CHECKBOXES */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700">
                Fasilitas Khusus Kamar Ini
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {standardFacilities.map((fac) => {
                  const isChecked = facilities.includes(fac);
                  return (
                    <label
                      key={fac}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center space-x-2 cursor-pointer transition ${
                        isChecked ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFacility(fac)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{fac}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/properties/${propertyId}/rooms`)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-sm flex items-center space-x-1.5"
              >
                <span>{isEditing ? 'Simpan Perubahan Kamar' : 'Tambahkan Kamar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </PropertyContextLayout>
  );
};
