import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { Building2, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { navigate } = useRouter();
  const { loginCustom, loginAsCustomer } = useAppStore();
  const [email, setEmail] = useState('allan@kostagent.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Silakan masukkan email.');
      return;
    }
    loginCustom(email, 'customer');
    navigate('/');
  };

  const handleQuickDemo = () => {
    loginAsCustomer();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header showBack title="Masuk ke KostAgent" />

      <main className="flex-1 max-w-md w-full mx-auto p-5 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Selamat Datang Kembali</h2>
            <p className="text-xs text-slate-500">
              Masuk untuk mengelola pemesanan kos dan ketersediaan slot Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Email
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Lock className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-indigo-200 flex items-center justify-center space-x-2"
            >
              <span>Masuk Akun</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* QUICK DEMO LOGIN BUTTON */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center space-x-2 transition border border-indigo-200"
            >
              <UserCheck className="w-4 h-4" />
              <span>Login Cepat Demo (Allan Gemilang)</span>
            </button>
          </div>

          <div className="text-center text-xs text-slate-500">
            Belum punya akun calon penghuni?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-bold text-indigo-600 hover:underline"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
