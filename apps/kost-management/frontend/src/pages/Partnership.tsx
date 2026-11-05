import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { PropertyContextLayout } from '../components/PropertyContextLayout';
import { 
  Handshake, CheckCircle2, AlertCircle, Clock, 
  ArrowRight, ShieldCheck, ToggleLeft, ToggleRight, 
  FileText, Sparkles, ExternalLink 
} from 'lucide-react';

export const Partnership: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const { navigate } = useRouter();
  const { getProperty, togglePartnershipActive } = useOwnerStore();

  const property = getProperty(propertyId);

  if (!property) return null;

  return (
    <PropertyContextLayout propertyId={propertyId} activeSubTab="partnership">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-lg font-black text-slate-900">Kemitraan KostAgent (KM-INT)</h1>
          <p className="text-xs text-slate-500">
            Kemitraan dikonfigurasi per properti. Hubungkan unit kos Anda ke marketplace publik KostAgent.
          </p>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          {/* CASE 1: NOT_PARTNERED */}
          {property.partnershipStatus === 'NOT_PARTNERED' && (
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Handshake className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-base font-black text-slate-900">
                    Properti Ini Belum Terhubung ke KostAgent
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    Ajukan listing kos ini ke KostAgent agar calon penghuni dapat menemukan kamar Anda di platform pencarian publik, melakukan reservasi slot hold secara real-time, dan mentransfer sewa langsung ke rekening Anda.
                  </p>
                </div>
              </div>

              {/* BENEFITS LIST */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Payment 100%</span>
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Uang sewa langsung masuk ke rekening bank/QRIS pribadi pemilik tanpa potongan admin perantara.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Slot Sync Real-Time</span>
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Kapasitas slot kamar otomatis tersinkronisasi via REST API & Webhook (ADR-005).
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1">
                  <span className="font-bold text-slate-900 block flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Kontrol Penuh Pemilik</span>
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Pemilik memiliki wewenang tunggal untuk menerima (ACCEPT) atau menolak (REJECT) booking sewa.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => navigate(`/properties/${propertyId}/partnership/terms`)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xs transition shadow-md shadow-indigo-100 flex items-center space-x-2"
                >
                  <span>Pelajari Ketentuan & Ajukan Kemitraan (1-Klik)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* CASE 2: WAITING_REVIEW */}
          {property.partnershipStatus === 'WAITING_REVIEW' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 uppercase tracking-wider inline-block">
                  Status: Menunggu Review Admin
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  Pengajuan Kemitraan Sedang Diverifikasi
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Pengajuan properti Anda telah diterima oleh Tim Admin KostAgent (PT. AlanGantengBanget). Tim sedang memverifikasi kelayakan foto dan informasi properti sebelum ditayangkan ke publik.
                </p>
              </div>
            </div>
          )}

          {/* CASE 3: ACTIVE */}
          {property.partnershipStatus === 'ACTIVE' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase tracking-wider inline-block mb-1">
                      Kemitraan Terverifikasi Aktif
                    </span>
                    <h2 className="text-base font-black text-slate-900">
                      Listing Tayang di Platform Publik KostAgent
                    </h2>
                  </div>
                </div>

                {/* TOGGLE ENABLED / DISABLED */}
                <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-800 block">
                      {property.partnershipEnabled ? 'Menerima Booking Online' : 'Penerimaan Dinonaktifkan'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {property.partnershipEnabled ? 'Listing muncul di pencarian' : 'Disembunyikan sementara'}
                    </span>
                  </div>
                  <button
                    onClick={() => togglePartnershipActive(property.id)}
                    className="text-indigo-600 hover:text-indigo-800 transition"
                  >
                    {property.partnershipEnabled ? (
                      <ToggleRight className="w-9 h-9 text-indigo-600" />
                    ) : (
                      <ToggleLeft className="w-9 h-9 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* INTEGRATION STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">Protokol Sinkronisasi Listing (ADR-005):</span>
                  <p className="text-[11px] text-slate-500">
                    Setiap perubahan tarif atau penambahan kamar di Kost Management langsung dikirim via Webhook ke KostAgent.
                  </p>
                  <span className="text-[10px] text-emerald-600 font-semibold block pt-1">
                    ✓ Sinkron Terakhir: {new Date(property.lastSyncAt).toLocaleTimeString('id-ID')} WIB
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block">Tinjau Dokumen Ketentuan:</span>
                  <p className="text-[11px] text-slate-500">
                    Ketentuan pembatalan, SLA verifikasi pembayaran 24 jam, dan alur refund langsung.
                  </p>
                  <button
                    onClick={() => navigate(`/properties/${propertyId}/partnership/terms`)}
                    className="text-xs font-bold text-indigo-600 hover:underline pt-1 block"
                  >
                    Buka Dokumen S&K Kemitraan ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CASE 4: REJECTED */}
          {property.partnershipStatus === 'REJECTED' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1.5">
                <span className="font-bold block flex items-center space-x-1.5 text-sm text-rose-950">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Pengajuan Kemitraan Ditolak oleh Admin KostAgent</span>
                </span>
                <p>Catatan Perbaikan dari Admin: "{property.partnershipRejectionReason || 'Foto kamar tidur utama buram, mohon unggah ulang.'}"</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/properties/${propertyId}/partnership/terms`)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Ajukan Ulang Kemitraan (Re-Submit)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PropertyContextLayout>
  );
};
