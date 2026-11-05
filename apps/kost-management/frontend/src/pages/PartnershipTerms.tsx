import React, { useState } from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  FileText, ShieldCheck, CheckCircle2, ChevronLeft, 
  ArrowRight, Clock, AlertTriangle 
} from 'lucide-react';

export const PartnershipTerms: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { navigate } = useRouter();
  const { getProperty, submitPartnershipToKostAgent } = useOwnerStore();

  const property = getProperty(propertyId);
  const [agreed, setAgreed] = useState(false);

  if (!property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('Anda wajib menyetujui syarat & ketentuan kemitraan sebelum mengajukan.');
      return;
    }

    await submitPartnershipToKostAgent(propertyId);
    alert(`Pengajuan kemitraan untuk "${property.name}" berhasil dikirim! Status kini WAITING REVIEW oleh Admin KostAgent.`);
    navigate(`/properties/${propertyId}/partnership`);
  };

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="partnership">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* BREADCRUMB */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button
            onClick={() => navigate(`/properties/${propertyId}/partnership`)}
            className="hover:text-indigo-600 font-semibold flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Menu Kemitraan</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
              KM-INT-002 • Dokumen Kemitraan Resmi
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Syarat & Ketentuan Kemitraan KostAgent
            </h1>
            <p className="text-xs text-slate-500">
              Mohon pelajari kewajiban operasional pemilik kos sebelum mengajukan properti.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TERMS ACCORDIONS / BLOCKS */}
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block">
                  1. Mekanisme Direct Payment (Tanpa Perantara Rekening Escrow)
                </span>
                <p className="text-slate-600 text-[11px]">
                  Pembayaran sewa oleh customer sepenuhnya ditransfer langsung ke nomor rekening/QRIS resmi pemilik kos yang terdaftar di sistem. KostAgent bukan dompet/escrow dan tidak memotong biaya admin per transaksi.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block flex items-center space-x-2">
                  <span>2. Komitmen SLA Verifikasi Pembayaran (Maksimal 1×24 Jam)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                    ADR-003
                  </span>
                </span>
                <p className="text-slate-600 text-[11px]">
                  Pemilik kos wajib memeriksa mutasi rekening dan mengambil keputusan (ACCEPT atau REJECT) maksimal 1×24 jam sejak customer mengunggah bukti bayar. Jika melebihi 24 jam, transaksi akan ditandai *Needs Attention* dan dieskalasi manual oleh tim operasional KostAgent.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block flex items-center space-x-2">
                  <span>3. Kewajiban Pengembalian Dana / Refund (SLA 1×24 Jam)</span>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-black uppercase">
                    ADR-012
                  </span>
                </span>
                <p className="text-slate-600 text-[11px]">
                  Jika pemilik menolak pesanan (REJECT) yang bukti bayarnya telah ditransfer oleh customer, pemilik wajib mengembalikan dana 100% utuh ke rekening refund yang dicantumkan customer dalam batas waktu SLA 1×24 jam kalender.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block">
                  4. Sinkronisasi Slot Kamar Real-Time & Slot Hold 60 Menit
                </span>
                <p className="text-slate-600 text-[11px]">
                  Kost Management menjadi Single Source of Truth kapasitas kamar. Saat customer melakukan inisiasi checkout di KostAgent, sistem akan menahan slot sementara selama 60 menit. Pemilik dilarang menjual slot yang sedang di-hold secara offline.
                </p>
              </div>
            </div>

            {/* AGREEMENT CHECKBOX */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start space-x-3 text-xs text-slate-800 cursor-pointer p-3 bg-indigo-50/60 rounded-2xl border border-indigo-200">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5"
                />
                <span className="leading-relaxed">
                  Saya selaku pemilik sah <strong>{property.name}</strong> menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan kemitraan integrasi di atas.
                </span>
              </label>
            </div>

            {/* BUTTON */}
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/properties/${propertyId}/partnership`)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!agreed}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-indigo-100 flex items-center space-x-2 disabled:opacity-50"
              >
                <span>Kirim Pengajuan Kemitraan (1-Klik Handshake)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </PropertyContextLayout>
  );
};
