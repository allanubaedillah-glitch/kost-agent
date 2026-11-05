import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { OwnerNavbar } from '../components/OwnerNavbar';
import { 
  Building2, BedDouble, BookOpenCheck, Clock, 
  ArrowRight, PlusCircle, CheckCircle2, AlertTriangle, 
  Users, DollarSign 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { navigate } = useRouter();
  const { owner, properties, rooms, bookings, setSelectedPropertyId } = useOwnerStore();

  const totalProperties = properties.length;
  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.totalCapacity, 0);
  const occupiedSlots = rooms.reduce((sum, r) => sum + r.occupiedSlots, 0);
  const reservedSlots = rooms.reduce((sum, r) => sum + r.reservedSlots, 0);
  const availableSlots = totalCapacity - occupiedSlots - reservedSlots;

  const pendingBookings = bookings.filter(b => b.status === 'PAYMENT_SUBMITTED');
  const acceptedBookings = bookings.filter(b => b.status === 'ACCEPTED' || b.status === 'CHECKED_IN');
  const totalRevenue = acceptedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const occupancyRate = totalCapacity > 0 ? Math.round((occupiedSlots / totalCapacity) * 100) : 0;

  const handleSelectProperty = (propId: string) => {
    setSelectedPropertyId(propId);
    navigate(`/properties/${propId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <OwnerNavbar />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Overview Portofolio Properti
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Selamat Datang, {owner?.name || 'Pemilik Kos'}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
              Pantau kapasitas hunian kamar, verifikasi pembayaran sewa masuk, dan kelola integrasi marketplace Anda secara terpusat.
            </p>
          </div>

          <button
            onClick={() => navigate('/properties/add')}
            className="px-5 py-3 rounded-2xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs sm:text-sm transition shadow-md flex items-center justify-center space-x-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            <span>Tambah Properti Baru</span>
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Properti
            </span>
            <div className="text-2xl font-black text-slate-900">{totalProperties} Unit</div>
            <span className="text-[11px] text-slate-500">{totalRooms} tipe kamar terdaftar</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tingkat Okupansi
            </span>
            <div className="text-2xl font-black text-emerald-600">{occupancyRate}%</div>
            <span className="text-[11px] text-slate-500">
              {occupiedSlots} dari {totalCapacity} slot terisi
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Menunggu Verifikasi
            </span>
            <div className="text-2xl font-black text-amber-600">{pendingBookings.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">
              Perlu respon SLA 24 jam
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Omzet Terkonfirmasi
            </span>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 truncate">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <span className="text-[11px] text-slate-500">Direct transfer ke rekening</span>
          </div>
        </div>

        {/* ALERT: PENDING BOOKINGS NEEDING ATTENTION */}
        {pendingBookings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
              <div>
                <strong className="block font-bold">
                  Ada {pendingBookings.length} pemesanan sewa baru yang sudah mengunggah bukti bayar!
                </strong>
                <span>Periksa mutasi m-banking Anda dan ambil keputusan (ACCEPT atau REJECT) sebelum batas SLA 24 jam.</span>
              </div>
            </div>
            <button
              onClick={() => handleSelectProperty(pendingBookings[0].propertyId)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shrink-0 transition"
            >
              Verifikasi Sekarang
            </button>
          </div>
        )}

        {/* PROPERTI ANDA LIST */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Daftar Properti Kos Anda</h2>
              <p className="text-xs text-slate-500">Pilih properti untuk mengelola kamar, booking, dan kemitraan</p>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center space-x-1"
            >
              <span>Lihat Detail Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {properties.map((prop) => {
              const propRooms = rooms.filter(r => r.propertyId === prop.id);
              const pCap = propRooms.reduce((sum, r) => sum + r.totalCapacity, 0);
              const pOcc = propRooms.reduce((sum, r) => sum + r.occupiedSlots, 0);

              return (
                <div
                  key={prop.id}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 transition flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] bg-slate-200 relative">
                    <img
                      src={prop.coverImage}
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-black/70 text-white backdrop-blur-sm">
                        {prop.type}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase backdrop-blur-sm ${
                        prop.partnershipStatus === 'ACTIVE'
                          ? 'bg-emerald-600 text-white'
                          : prop.partnershipStatus === 'WAITING_REVIEW'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {prop.partnershipStatus === 'ACTIVE' ? 'Kemitraan Aktif' : prop.partnershipStatus === 'WAITING_REVIEW' ? 'Review Admin' : 'Mandiri'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{prop.name}</h3>
                    <p className="text-xs text-slate-500 truncate">{prop.address}, {prop.city}</p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                      <span>{propRooms.length} Tipe Kamar</span>
                      <span className="font-bold text-slate-800">{pOcc} / {pCap} Slot Terisi</span>
                    </div>

                    <button
                      onClick={() => handleSelectProperty(prop.id)}
                      className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-xs"
                    >
                      <span>Pilih & Buka Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
