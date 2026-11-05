import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { useRouter } from '../../router';
import { 
  Sparkles, CheckCircle, XCircle, Clock, RotateCcw, 
  ExternalLink, UserCheck, ShieldAlert, ChevronUp, ChevronDown 
} from 'lucide-react';

export const SimulatorBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentUser, loginAsCustomer, loginAsAdmin, bookings, 
    simulateOwnerAccept, simulateOwnerReject, simulateOwnerTriggerSlaOverdue, 
    simulateOwnerFinishRefund, fastForwardExpireHold, fastForwardBreachSla, resetAllData, refreshData 
  } = useAppStore();
  const { path, navigate } = useRouter();

  // Find latest active booking for quick simulation
  const latestBooking = bookings[0];

  return (
    <div className="fixed bottom-14 sm:bottom-4 right-3 z-50 select-none">
      {/* TOGGLE PILL */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 hover:bg-slate-800 transition active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
        <span>Prototype Simulator</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-1" /> : <ChevronUp className="w-3.5 h-3.5 ml-1" />}
      </button>

      {/* DRAWER POPUP */}
      {isOpen && (
        <div className="absolute bottom-10 right-0 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-md text-slate-100 rounded-2xl p-4 shadow-2xl border border-slate-700 space-y-3.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-extrabold text-white text-sm">Testing State Simulator</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              v1.0 Mock Engine
            </span>
          </div>

          {/* ACTIVE ROLE SWITCHER */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Peran Saat Ini: {currentUser?.name} ({currentUser?.role})
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  loginAsCustomer();
                  if (path.startsWith('/admin')) navigate('/');
                }}
                className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center space-x-1 border transition ${
                  currentUser?.role === 'customer'
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>
              <button
                onClick={() => {
                  loginAsAdmin();
                  if (!path.startsWith('/admin')) navigate('/admin');
                }}
                className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center space-x-1 border transition ${
                  currentUser?.role === 'admin'
                    ? 'bg-emerald-600 border-emerald-400 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin Ops</span>
              </button>
            </div>
          </div>

          {/* QUICK ROUTE JUMP */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Navigasi URL Terpisah
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => navigate('/')}
                className="py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center space-x-1 border border-slate-700"
              >
                <ExternalLink className="w-3 h-3 text-indigo-400" />
                <span>Customer PWA (/)</span>
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="py-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center space-x-1 border border-slate-700"
              >
                <ExternalLink className="w-3 h-3 text-emerald-400" />
                <span>Admin Portal (/admin)</span>
              </button>
            </div>
          </div>

          {/* SIMULATE OWNER RESPONSE ON LATEST BOOKING */}
          {latestBooking && (
            <div className="bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">
                  Pesanan Terakhir: <span className="font-mono text-indigo-300">{latestBooking.id}</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-900/60 text-indigo-200 border border-indigo-700">
                  {latestBooking.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Simulasikan respon sistem pemilik kos (Kost Management) ke status pemesanan ini:
              </p>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    simulateOwnerAccept(latestBooking.id);
                    alert(`Simulasi berhasil: Owner telah menyetujui ${latestBooking.id}. Status berubah menjadi ACCEPTED dengan batas check-in H+14!`);
                  }}
                  disabled={latestBooking.status !== 'PAYMENT_SUBMITTED' && latestBooking.status !== 'PENDING_PAYMENT'}
                  className="py-1.5 px-2 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center space-x-1 font-bold disabled:opacity-40"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Owner ACCEPT</span>
                </button>

                <button
                  onClick={() => {
                    const reason = prompt('Masukkan alasan penolakan owner:', 'Kamar telah dipesan offline / Bukti transfer belum valid.');
                    if (reason) {
                      simulateOwnerReject(latestBooking.id, reason);
                      alert(`Simulasi berhasil: Owner menolak ${latestBooking.id}. Status berubah menjadi REJECTED. Customer dapat mengisi rekening refund.`);
                    }
                  }}
                  disabled={latestBooking.status !== 'PAYMENT_SUBMITTED' && latestBooking.status !== 'PENDING_PAYMENT'}
                  className="py-1.5 px-2 rounded bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 flex items-center justify-center space-x-1 font-bold disabled:opacity-40"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Owner REJECT</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={async () => {
                    await fastForwardExpireHold(latestBooking.id);
                    alert(`Simulasi 60m Hold Expire dieksekusi! Batas waktu diatur ke masa lampau, status berubah menjadi EXPIRED, dan kuota slot dikembalikan otomatis ke Kost Management.`);
                  }}
                  disabled={latestBooking.status !== 'PENDING_PAYMENT'}
                  className="py-1 px-2 rounded bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 flex items-center justify-center space-x-1 text-[11px] disabled:opacity-40"
                >
                  <Clock className="w-3 h-3" />
                  <span>Fast-Forward Expire 60m</span>
                </button>

                <button
                  onClick={async () => {
                    await fastForwardBreachSla(latestBooking.id);
                    alert(`Simulasi SLA Overdue aktif! Waktu SLA ${latestBooking.id} diatur melewati 24 jam. Periksa tab Transaksi di Portal Admin untuk melihat badge merah "NEEDS ATTENTION"!`);
                  }}
                  disabled={latestBooking.status !== 'PAYMENT_SUBMITTED'}
                  className="py-1 px-2 rounded bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 flex items-center justify-center space-x-1 text-[11px] disabled:opacity-40"
                >
                  <Clock className="w-3 h-3" />
                  <span>Picukan SLA &gt;24 Jam</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={() => {
                    simulateOwnerFinishRefund(latestBooking.id);
                    alert(`Simulasi berhasil: Owner telah mentransfer refund untuk ${latestBooking.id}. Status booking: REFUND_COMPLETED.`);
                  }}
                  disabled={latestBooking.status !== 'REFUND_PENDING'}
                  className="py-1 px-2 rounded bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 flex items-center justify-center space-x-1 text-[11px] disabled:opacity-40"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Transfer Refund Selesai</span>
                </button>

                <button
                  onClick={async () => {
                    await refreshData();
                    alert('Data terbaru berhasil disinkronkan dari backend KostAgent (Port 3000).');
                  }}
                  className="py-1 px-2 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center space-x-1 text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sync Backend Data</span>
                </button>
              </div>
            </div>
          )}

          {/* RESET DATA */}
          <div className="pt-1 border-t border-slate-800">
            <button
              onClick={() => {
                if (confirm('Reset seluruh mock data kembali ke default awal?')) {
                  resetAllData();
                }
              }}
              className="w-full py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/80 font-bold flex items-center justify-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Mock ke Awal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
