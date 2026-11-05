import React from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  User as UserIcon, Mail, Phone, ShieldCheck, 
  BookOpenCheck, HelpCircle, LogOut, Download, ArrowRight 
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser, logout, loginAsCustomer } = useAppStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header title="Profil Saya" />

      <main className="max-w-2xl mx-auto w-full px-4 pt-4 space-y-5">
        {/* PROFILE CARD */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center sm:text-left sm:flex sm:items-center sm:space-y-0 sm:space-x-5">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt={currentUser?.name || 'User'}
            className="w-20 h-20 rounded-full object-cover mx-auto sm:mx-0 border-2 border-indigo-200 shadow-xs"
          />

          <div className="space-y-1 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <h2 className="text-lg font-black text-slate-900">
                {currentUser?.name || 'Tamu / Belum Masuk'}
              </h2>
              {currentUser?.isVerified && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit mx-auto sm:mx-0">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Calon Penghuni Terverifikasi</span>
                </span>
              )}
            </div>

            <div className="text-xs text-slate-500 space-y-0.5">
              <p className="flex items-center justify-center sm:justify-start space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.email || 'customer@kostagent.com'}</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.phone || '081234567890'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* QUICK MENU */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden text-xs">
          <button
            onClick={() => navigate('/history')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpenCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Riwayat Pemesanan</span>
                <span className="text-[11px] text-slate-400">Status hold, bukti bayar, voucher sewa & ulasan</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              alert('Fitur PWA: Buka menu browser Anda lalu pilih "Tambahkan ke Layar Utama" (Add to Home screen) untuk menikmati pengalaman aplikasi native.');
            }}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Panduan PWA / Pasang Aplikasi</span>
                <span className="text-[11px] text-slate-400">Aplikasi ringan tanpa perlu download dari App Store</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              alert('Prinsip Bisnis KostAgent: Seluruh sewa dibayarkan langsung ke rekening resmi pemilik kos (Direct Payment). KostAgent tidak memotong biaya admin atau markup harga sewa.');
            }}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Kebijakan Transparansi Sewa</span>
                <span className="text-[11px] text-slate-400">Direct payment ke pemilik kos & SLA refund 24 jam</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* LOGOUT / SWITCH ACCOUNT */}
        <div className="space-y-2 pt-2">
          {!currentUser ? (
            <button
              onClick={() => loginAsCustomer()}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
            >
              Masuk sebagai Allan Gemilang (Demo)
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar dari Akun Calon Penghuni</span>
            </button>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
