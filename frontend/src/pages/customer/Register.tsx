import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { Building2, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const { navigate } = useRouter();
  const { registerCustomer } = useAppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Mohon lengkapi seluruh formulir registrasi.');
      return;
    }
    registerCustomer(name, email, phone);
    alert('Registrasi berhasil! Akun Anda telah aktif.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header showBack title="Daftar Akun Penghuni" />

      <main className="flex-1 max-w-md w-full mx-auto p-5 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Buat Akun Baru</h2>
            <p className="text-xs text-slate-500">
              Daftar untuk mulai memesan kamar kos dengan pembayaran langsung ke pemilik kos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama Lengkap
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <User className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Allan Gemilang"
                  className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                  required
                />
              </div>
            </div>

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
                Nomor WhatsApp / HP Aktif
              </label>
              <div className="flex items-center px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Phone className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
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
                  placeholder="Minimal 8 karakter"
                  className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
                  required
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dengan mendaftar, Anda menyetujui Ketentuan Layanan KostAgent dan Kebijakan Privasi terkait penyimpanan data sewa kos.
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-indigo-200 flex items-center justify-center space-x-2"
            >
              <span>Daftar Akun</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500">
            Sudah memiliki akun?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-indigo-600 hover:underline"
            >
              Masuk di sini
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
