import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { ShieldAlert, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { navigate } = useRouter();
  const { loginAsAdmin } = useAppStore();
  const [email, setEmail] = useState('admin@kostagent.id');
  const [password, setPassword] = useState('adminsecret123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block">
            Portal Administrasi & Operasional
          </span>
          <h1 className="text-2xl font-black text-white">Admin KostAgent</h1>
          <p className="text-xs text-slate-400">
            Akses khusus moderasi listing kemitraan dan pemantauan SLA sistem.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Email Administrator
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl focus-within:border-indigo-500 transition">
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
              Kredensial Password
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl focus-within:border-indigo-500 transition">
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
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg shadow-indigo-900/40 flex items-center justify-center space-x-2"
          >
            <span>Masuk ke Dashboard Operasional</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={() => {
              loginAsAdmin();
              navigate('/admin/dashboard');
            }}
            className="text-xs text-indigo-400 hover:underline font-semibold"
          >
            Login Cepat Demo Superadmin
          </button>
        </div>
      </div>
    </div>
  );
};
