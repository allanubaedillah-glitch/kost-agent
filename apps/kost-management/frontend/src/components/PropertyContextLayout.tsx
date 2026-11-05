import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { OwnerNavbar } from './OwnerNavbar';
import { 
  Building2, BedDouble, BookOpenCheck, Handshake, 
  MapPin, ShieldCheck, ChevronLeft, ToggleLeft, ToggleRight, 
  Clock, AlertCircle 
} from 'lucide-react';

interface PropertyContextLayoutProps {
  propertyId: string;
  activeSubTab: 'overview' | 'rooms' | 'bookings' | 'partnership';
  children: React.ReactNode;
}

export const PropertyContextLayout: React.FC<PropertyContextLayoutProps> = ({
  propertyId,
  activeSubTab,
  children
}) => {
  const { navigate } = useRouter();
  const { getProperty, togglePartnershipActive, bookings, rooms } = useOwnerStore();

  const property = getProperty(propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <OwnerNavbar />
        <div className="max-w-4xl mx-auto p-8 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-base font-bold text-slate-900">Properti Tidak Ditemukan</h2>
          <button
            onClick={() => navigate('/properties')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
          >
            Kembali ke Daftar Properti
          </button>
        </div>
      </div>
    );
  }

  const propBookings = bookings.filter(b => b.propertyId === propertyId);
  const pendingVerificationCount = propBookings.filter(b => b.status === 'PAYMENT_SUBMITTED').length;
  const propRooms = rooms.filter(r => r.propertyId === propertyId);

  const navTabs = [
    { id: 'overview', label: 'Ringkasan (Overview)', icon: Building2, route: `/properties/${propertyId}` },
    { id: 'rooms', label: `Kamar (${propRooms.length})`, icon: BedDouble, route: `/properties/${propertyId}/rooms` },
    { id: 'bookings', label: 'Pemesanan', icon: BookOpenCheck, route: `/properties/${propertyId}/bookings`, badge: pendingVerificationCount },
    { id: 'partnership', label: 'Kemitraan KostAgent', icon: Handshake, route: `/properties/${propertyId}/partnership` },
  ];

  const getPartnershipBadge = () => {
    switch (property.partnershipStatus) {
      case 'ACTIVE':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kemitraan Aktif di KostAgent</span>
          </span>
        );
      case 'WAITING_REVIEW':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-300 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Menunggu Moderasi Admin KostAgent</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-300">
            Pengajuan Ditolak (Perlu Revisi)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-600 border border-slate-300">
            Belum Diajukan ke KostAgent
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <OwnerNavbar />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* BREADCRUMB */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button
            onClick={() => navigate('/properties')}
            className="hover:text-indigo-600 font-semibold flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Daftar Properti</span>
          </button>
          <span>/</span>
          <span className="font-bold text-slate-900 truncate max-w-xs">{property.name}</span>
        </div>

        {/* PROPERTY CONTEXT HERO CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center space-x-4">
            <img
              src={property.coverImage}
              alt={property.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 shadow-xs border border-slate-100"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase bg-slate-100 text-slate-700">
                  Kos {property.type}
                </span>
                {getPartnershipBadge()}
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {property.name}
              </h1>

              <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{property.address}, {property.district}, {property.city}</span>
              </div>
            </div>
          </div>

          {/* PARTNERSHIP QUICK TOGGLE (IF ALREADY PARTNERED) */}
          {property.partnershipStatus === 'ACTIVE' && (
            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 shrink-0">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">Status Tayang Publik</span>
                <span className="text-[11px] text-slate-500">
                  {property.partnershipEnabled ? 'Aktif menerima booking online' : 'Dinonaktifkan sementara oleh pemilik'}
                </span>
              </div>
              <button
                onClick={() => togglePartnershipActive(property.id)}
                className="text-indigo-600 hover:text-indigo-800 transition"
                title="Aktifkan / Nonaktifkan Kemitraan"
              >
                {property.partnershipEnabled ? (
                  <ToggleRight className="w-8 h-8 text-indigo-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-400" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* 4 PARALLEL TABS (SEJAJAR - ADR-000 & Prompt Section 6) */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto no-scrollbar">
            {navTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.route)}
                  className={`pb-3 pt-1 px-2 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>

                  {tab.badge && tab.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SUBTAB CONTENT */}
        <div className="pt-2">
          {children}
        </div>
      </main>
    </div>
  );
};
