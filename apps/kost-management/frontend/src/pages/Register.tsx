import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { Hotel, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const { navigate } = useRouter();
  const { register } = useOwnerStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Mohon lengkapi seluruh isian formulir.');
      return;
    }
    register(name, email, phone);
    alert('Pendaftaran berhasil! Selamat datang di Kost Management SaaS.');
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
          <h1 className="text-2xl font-black text-white">Daftar Akun Pemilik Kos</h1>
          <p className="text-xs text-slate-400">
            Kelola kamar, kapasitas penghuni, dan integrasi kemitraan secara mandiri.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Nama Lengkap Pemilik / Pengelola
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-indigo-500 transition">
              <User className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Hj. Ratna Sari"
                className="w-full bg-transparent text-sm focus:outline-none text-white font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Alamat Email Aktif
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-indigo-500 transition">
              <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pemilik@email.com"
                className="w-full bg-transparent text-sm focus:outline-none text-white font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Nomor WhatsApp Pemilik
            </label>
            <div className="flex items-center px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-indigo-500 transition">
              <Phone className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081288889999"
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
                placeholder="Minimal 8 karakter"
                className="w-full bg-transparent text-sm focus:outline-none text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-lg shadow-indigo-900/40 flex items-center justify-center space-x-2"
          >
            <span>Daftar & Masuk Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center text-xs text-slate-500">
          Sudah memiliki akun pemilik?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-400 font-bold hover:underline"
          >
            Masuk di sini
          </button>
        </div>
      </div>
    </div>
  );
};
