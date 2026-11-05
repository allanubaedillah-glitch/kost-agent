import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { Hotel, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const { navigate } = useRouter();
  const { login } = useOwnerStore();
  const [email, setEmail] = useState('ratna.kemang@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    login('ratna.kemang@gmail.com');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Hotel className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block">
            UbaedillahProject SaaS
          </span>
          <h1 className="text-2xl font-black text-white">Kost Management</h1>
          <p className="text-xs text-slate-400">
            Property Management System untuk operasional, kamar, dan keuangan kos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Alamat Email Pemilik Kos
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-indigo-500 transition">
              <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none text-white font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Kata Sandi
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-indigo-500 transition">
              <Lock className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg shadow-indigo-900/40 flex items-center justify-center space-x-2"
          >
            <span>Masuk ke Dashboard Operasional</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 space-y-3 text-center">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-950 text-indigo-300 hover:bg-indigo-900 text-xs font-bold border border-indigo-800 transition flex items-center justify-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Login Cepat Demo (Hj. Ratna Sari)</span>
          </button>

          <div className="text-xs text-slate-500">
            Belum mendaftar properti kos Anda?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-400 font-bold hover:underline"
            >
              Daftar Akun Pemilik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
