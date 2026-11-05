import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  Building2, BedDouble, BookOpenCheck, Handshake, 
  Users, CheckCircle2, AlertTriangle, ArrowRight, 
  CreditCard, ShieldCheck 
} from 'lucide-react';

export const PropertyOverview: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { navigate } = useRouter();
  const { getProperty, getRoomsForProperty, getBookingsForProperty } = useOwnerStore();

  const property = getProperty(propertyId);
  const rooms = getRoomsForProperty(propertyId);
  const bookings = getBookingsForProperty(propertyId);

  if (!property) return null;

  const totalCapacity = rooms.reduce((sum, r) => sum + r.totalCapacity, 0);
  const occupiedSlots = rooms.reduce((sum, r) => sum + r.occupiedSlots, 0);
  const reservedSlots = rooms.reduce((sum, r) => sum + r.reservedSlots, 0);
  const availableSlots = totalCapacity - occupiedSlots - reservedSlots;

  const pendingBookings = bookings.filter(b => b.status === 'PAYMENT_SUBMITTED');
  const occupancyRate = totalCapacity > 0 ? Math.round((occupiedSlots / totalCapacity) * 100) : 0;

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="overview">
      <div className="space-y-6">
        {/* KPI OVERVIEW FOR THIS PROPERTY */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tipe Kamar
            </span>
            <div className="text-2xl font-black text-slate-900">{rooms.length} Tipe</div>
            <span className="text-[11px] text-slate-500">Unit operasional</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tingkat Okupansi
            </span>
            <div className="text-2xl font-black text-emerald-600">{occupancyRate}%</div>
            <span className="text-[11px] text-slate-500">{occupiedSlots} / {totalCapacity} slot terisi</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Slot Tersedia
            </span>
            <div className="text-2xl font-black text-indigo-600">{availableSlots} Slot</div>
            <span className="text-[11px] text-amber-600 font-semibold">{reservedSlots} slot di-hold</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Menunggu Keputusan
            </span>
            <div className="text-2xl font-black text-amber-600">{pendingBookings.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">Perlu diverifikasi</span>
          </div>
        </div>

        {/* PROPERTY DETAILS & SETTINGS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT 2 COLS: ROOMS & CAPACITY SNAPSHOT */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <BedDouble className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-sm font-bold text-slate-900">Kamar & Kapasitas Slot</h2>
                </div>
                <button
                  onClick={() => navigate(`/properties/${propertyId}/rooms`)}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                >
                  <span>Kelola Kamar Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {rooms.map((rm) => {
                  const rmAvail = rm.totalCapacity - rm.occupiedSlots - rm.reservedSlots;
                  return (
                    <div
                      key={rm.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            rm.type === 'bersama' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {rm.type}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{rm.name}</span>
                        </div>
                        <span className="text-slate-500 text-[11px] block mt-0.5">
                          Rp {rm.pricePerMonth.toLocaleString('id-ID')}/slot/bln • Luas {rm.sizeM2} m²
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-slate-800 text-xs block">
                          {rm.occupiedSlots} Terisi • {rmAvail} Kosong
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-block mt-0.5 ${
                          rm.status === 'TERSEDIA'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rm.status === 'DIPESAN'
                            ? 'bg-amber-100 text-amber-800'
                            : rm.status === 'DITEMPATI'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {rm.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PENDING BOOKINGS SNAPSHOT */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <BookOpenCheck className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-sm font-bold text-slate-900">Pemesanan Masuk Terbaru</h2>
                </div>
                <button
                  onClick={() => navigate(`/properties/${propertyId}/bookings`)}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                >
                  <span>Semua Pemesanan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {pendingBookings.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">
                  Tidak ada pemesanan baru yang menunggu verifikasi saat ini.
                </p>
              ) : (
                <div className="space-y-3">
                  {pendingBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-amber-900 block">{b.id}</span>
                        <span className="font-bold text-slate-900">{b.customerName}</span>
                        <span className="text-slate-500 block text-[11px]">{b.roomName} ({b.durationMonths} bln)</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="font-black text-slate-900 block">
                          Rp {b.totalAmount.toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={() => navigate(`/properties/${propertyId}/bookings/${b.id}`)}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs"
                        >
                          Verifikasi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COL: BANK & RULES */}
          <div className="space-y-5">
            {/* REKENING PEMBAYARAN */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3 shadow-xs text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>Rekening Direct Payment</span>
              </h3>
              <div className="space-y-1 text-slate-600">
                <span className="text-slate-400 block text-[10px] font-semibold">Tujuan Transfer:</span>
                <span className="font-black text-slate-900 text-sm block">
                  {property.bankAccount.bankName} - {property.bankAccount.accountNumber}
                </span>
                <span className="text-slate-700 font-medium block">
                  a.n. {property.bankAccount.accountHolder}
                </span>
              </div>
            </div>

            {/* KETENTUAN SEWA */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3 shadow-xs text-xs">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Ketentuan Kos Dinamis (ADR-009)</span>
              </h3>
              <div className="space-y-1.5">
                {property.rulesCheckboxes.map((r) => (
                  <div key={r.id} className="flex items-center space-x-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
              {property.rulesNotes && (
                <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 mt-2">
                  <strong className="block text-slate-800">Tata Tertib:</strong>
                  {property.rulesNotes}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PropertyContextLayout>
  );
};
