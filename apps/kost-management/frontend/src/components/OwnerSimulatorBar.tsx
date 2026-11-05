import React, { useState } from 'react';
import { useOwnerStore } from '../store/ownerStore';
import { useRouter } from '../router';
import { 
  Sparkles, PlusCircle, RotateCcw, ExternalLink, 
  ChevronUp, ChevronDown, CheckCircle, Clock 
} from 'lucide-react';

export const OwnerSimulatorBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    properties, selectedPropertyId, setSelectedPropertyId, 
    simulateIncomingBooking, resetAllOwnerData, refreshData 
  } = useOwnerStore();
  const { navigate } = useRouter();

  const currentProperty = properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-indigo-950 text-white text-xs font-bold shadow-2xl border border-indigo-700/80 hover:bg-indigo-900 transition active:scale-95"
      >
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span>Owner PMS Simulator</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-1" /> : <ChevronUp className="w-3.5 h-3.5 ml-1" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 sm:w-96 bg-indigo-950/95 backdrop-blur-md text-slate-100 rounded-3xl p-4 shadow-2xl border border-indigo-800 space-y-3.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-indigo-900 pb-2">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-extrabold text-white text-sm">Testing State Simulator</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              Kost Management PMS
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-indigo-300 block mb-1">
              Pilih Properti untuk Diuji:
            </span>
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="w-full bg-indigo-900/80 border border-indigo-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none"
            >
              {properties.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900">
                  {p.name} ({p.partnershipStatus})
                </option>
              ))}
            </select>
          </div>

          {/* SIMULATE INCOMING BOOKING */}
          <div className="p-3 bg-indigo-900/40 rounded-2xl border border-indigo-800/80 space-y-2">
            <span className="font-bold text-white block">Simulasi Integrasi KostAgent:</span>
            <p className="text-[11px] text-indigo-200 leading-relaxed">
              Kirimkan simulasi pemesanan kamar baru dari pencari kos di KostAgent lengkap dengan bukti transfer ke properti ini:
            </p>
            <button
              onClick={() => {
                simulateIncomingBooking(selectedPropertyId);
                navigate(`/properties/${selectedPropertyId}/bookings`);
              }}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-indigo-200" />
              <span>Simulasikan Pesanan Masuk (Payment Submitted)</span>
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="pt-1 border-t border-indigo-900 grid grid-cols-3 gap-1.5">
            <button
              onClick={() => navigate('/properties')}
              className="py-1.5 px-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-semibold text-center border border-indigo-800 text-[11px]"
            >
              Semua Kos
            </button>
            <button
              onClick={() => navigate(`/properties/${selectedPropertyId}/partnership`)}
              className="py-1.5 px-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-semibold text-center border border-indigo-800 text-[11px]"
            >
              Kemitraan
            </button>
            <button
              onClick={async () => {
                await refreshData();
                alert('Data terbaru berhasil disinkronkan dari Kost Management Backend (Port 4000).');
              }}
              className="py-1.5 px-2 rounded-xl bg-indigo-600/60 hover:bg-indigo-600 text-white font-semibold text-center border border-indigo-500 text-[11px]"
            >
              Sync DB
            </button>
          </div>

          {/* RESET DATA */}
          <div className="pt-1 border-t border-indigo-900">
            <button
              onClick={() => {
                if (confirm('Reset seluruh data mock Kost Management kembali ke awal?')) {
                  resetAllOwnerData();
                }
              }}
              className="w-full py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/80 font-bold flex items-center justify-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Mock Owner ke Awal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
