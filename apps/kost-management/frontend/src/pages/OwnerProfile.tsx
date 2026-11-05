import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { OwnerNavbar } from '../components/OwnerNavbar';
import { 
  User, Mail, Phone, CreditCard, ShieldCheck, 
  Crown, CheckCircle, LogOut, ArrowRight, Save 
} from 'lucide-react';

export const OwnerProfile: React.FC = () => {
  const { navigate } = useRouter();
  const { owner, updateProfile, logout } = useOwnerStore();

  const [phone, setPhone] = useState(owner?.phone || '');
  const [bankName, setBankName] = useState(owner?.bankAccount.bankName || 'BCA');
  const [accountNumber, setAccountNumber] = useState(owner?.bankAccount.accountNumber || '');
  const [accountHolder, setAccountHolder] = useState(owner?.bankAccount.accountHolder || '');

  if (!owner) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      phone,
      bankAccount: {
        bankName,
        accountNumber,
        accountHolder
      }
    });
    alert('Profil dan data rekening berhasil diperbarui!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      <OwnerNavbar />

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* HEADER */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Profil Pemilik Kos</h1>
          <p className="text-xs text-slate-500">
            Kelola data akun, informasi rekening penerima transfer sewa, dan status langganan SaaS.
          </p>
        </div>

        {/* OWNER PROFILE SUMMARY */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <img
              src={owner.avatar}
              alt={owner.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
            />
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900">{owner.name}</h2>
              <p className="text-xs text-slate-500">{owner.email}</p>
              <div className="flex items-center space-x-1.5 text-xs text-indigo-600 font-bold">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{owner.subscriptionPlan}</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/80 border border-indigo-200/80 p-4 rounded-2xl text-xs space-y-1 text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Masa Aktif Berlangganan
            </span>
            <span className="font-bold text-slate-800 block">Aktif s/d Oktober 2027</span>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              ✓ Akses Penuh Seluruh Fitur Multi-Property
            </span>
          </div>
        </div>

        {/* PROFILE EDIT FORM */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Perbarui Informasi Kontak & Rekening Bank</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor WhatsApp Aktif
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <Phone className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Bank Penerima
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="BCA">BCA (Bank Central Asia)</option>
                <option value="Mandiri">Bank Mandiri</option>
                <option value="BNI">Bank BNI</option>
                <option value="BRI">Bank BRI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor Rekening Penerima
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <CreditCard className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-transparent text-xs font-mono font-bold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Pemilik Rekening
              </label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs border border-rose-200 transition flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar dari Akun</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition shadow-sm flex items-center space-x-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
