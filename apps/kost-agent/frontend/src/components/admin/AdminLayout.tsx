import React from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { 
  ShieldCheck, LayoutDashboard, Building2, Handshake, 
  BookOpenCheck, Users, LogOut, Lock, AlertTriangle 
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'properties' | 'partnerships' | 'bookings' | 'users';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { navigate, path } = useRouter();
  const { currentUser, logout, bookings, properties } = useAppStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pendingPartnershipsCount = properties.filter(p => p.partnershipStatus === 'WAITING_REVIEW').length;
  
  // Needs Attention count (SLA overdue > 24 hours)
  const needsAttentionCount = bookings.filter(b => {
    if (b.status !== 'PAYMENT_SUBMITTED' || !b.ownerSlaExpiresAt) return false;
    return new Date(b.ownerSlaExpiresAt).getTime() < Date.now();
  }).length;

  const menuItems = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, route: '/admin/dashboard' },
    { id: 'partnerships', label: 'Moderasi Kemitraan', icon: Handshake, route: '/admin/partnerships', badge: pendingPartnershipsCount },
    { id: 'bookings', label: 'Pemantauan Booking & SLA', icon: BookOpenCheck, route: '/admin/bookings', alertBadge: needsAttentionCount },
    { id: 'properties', label: 'Monitoring Katalog Kos', icon: Building2, route: '/admin/properties' },
    { id: 'users', label: 'Monitoring Pengguna & Audit', icon: Users, route: '/admin/users' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* BRANDING */}
          <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block">
                Portal Moderasi
              </span>
              <h1 className="text-base font-black text-white leading-tight">Admin KostAgent</h1>
            </div>
          </div>

          {/* NAV MENU */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.route)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && item.badge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black">
                      {item.badge}
                    </span>
                  ) : null}

                  {item.alertBadge && item.alertBadge > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-black animate-pulse">
                      {item.alertBadge} Overdue
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ADMIN USER BOTTOM BAR */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80'}
              alt="Admin"
              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-200 block truncate">
                {currentUser?.name || 'Superadmin'}
              </span>
              <span className="text-[10px] text-indigo-400 block uppercase font-mono">
                Admin Staff
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Keluar dari Portal Admin"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP HEADER & MINIMUM ACCESS BANNER */}
        <header className="bg-slate-900/80 border-b border-slate-800 px-6 py-3 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="font-bold text-indigo-400">KostAgent Admin</span>
              <span>/</span>
              <span className="capitalize text-slate-200">{activeTab}</span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping"></span>
              <span className="text-slate-300 font-semibold text-[11px]">Sistem Sinkronisasi Aktif</span>
            </div>
          </div>
        </header>

        {/* MINIMUM ACCESS PRINCIPLE ALERT (ADR-007) */}
        <div className="px-6 pt-4">
          <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-800/80 text-xs text-indigo-200 flex items-start space-x-3 shadow-inner">
            <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-white block">
                Penegakan Prinsip Minimum Access (ADR-007 & FR-ADM-005):
              </span>
              <p className="text-[11px] text-indigo-200 leading-relaxed">
                Portal Admin hanya berwenang memeriksa kelayakan publik listing kos dan memantau status operasional/SLA. Admin dilarang menyetujui/menolak booking sewa pemilik. Data sensitif NIK & dokumen KTP disamarkan secara default demi perlindungan privasi pengguna.
              </p>
            </div>
          </div>
        </div>

        {/* VIEW BODY */}
        <main className="p-6 flex-1 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
