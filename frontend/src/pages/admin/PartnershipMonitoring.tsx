import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Handshake, CheckCircle2, XCircle, AlertCircle, 
  MapPin, Phone, ShieldCheck, Eye, Sparkles 
} from 'lucide-react';
import { Property } from '../../types';

export const PartnershipMonitoring: React.FC = () => {
  const { properties, adminApproveListing, adminRejectListing } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filtered = properties.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.partnershipStatus === filterStatus;
  });

  const handleApprove = (propId: string) => {
    adminApproveListing(propId, 'Kelengkapan foto, kejelasan harga, dan kontak pemilik terverifikasi valid.');
    alert('Listing berhasil disetujui (APPROVED)! Properti kos dan kamarnya kini tayang di marketplace publik KostAgent.');
    setSelectedProperty(null);
  };

  const handleReject = (propId: string) => {
    const reason = prompt('Masukkan catatan alasan penolakan listing (feedback untuk pemilik):', 'Foto kamar tidur utama buram / Nomor rekening belum terverifikasi.');
    if (reason) {
      adminRejectListing(propId, reason);
      alert('Listing ditolak (REJECTED) dengan catatan feedback. Pemilik dapat memperbaikinya di Kost Management.');
      setSelectedProperty(null);
    }
  };

  return (
    <AdminLayout activeTab="partnerships">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-black text-white">Moderasi Pengajuan Kemitraan Kos</h1>
            <p className="text-xs text-slate-400">
              Verifikasi kelayakan listing baru yang diajukan pemilik sebelum diterbitkan ke publik (UC-ADM-01).
            </p>
          </div>

          {/* STATUS FILTER PILLS */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            {['all', 'WAITING_REVIEW', 'ACTIVE', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition ${
                  filterStatus === st ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'all' ? 'Semua' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* LISTINGS TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">Nama Properti Kos</th>
                  <th className="p-3">Lokasi</th>
                  <th className="p-3">Kontak Pemilik</th>
                  <th className="p-3">Status Kemitraan</th>
                  <th className="p-3 rounded-r-xl text-right">Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prop.coverImage}
                          alt={prop.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block">{prop.name}</span>
                          <span className="text-slate-400 text-[11px] capitalize">Tipe {prop.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-300">
                      <span>{prop.district}, {prop.city}</span>
                    </td>
                    <td className="p-3 text-slate-300">
                      <span className="block font-semibold">{prop.ownerContact.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{prop.ownerContact.phone}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        prop.partnershipStatus === 'ACTIVE'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : prop.partnershipStatus === 'WAITING_REVIEW'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                          : prop.partnershipStatus === 'REJECTED'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {prop.partnershipStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedProperty(prop)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Periksa</span>
                        </button>

                        {prop.partnershipStatus === 'WAITING_REVIEW' && (
                          <>
                            <button
                              onClick={() => handleApprove(prop.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center space-x-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Setujui</span>
                            </button>
                            <button
                              onClick={() => handleReject(prop.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center space-x-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Tolak</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL DETAIL PEMERIKSAAN PROPERTI */}
        {selectedProperty && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-indigo-400 block font-bold">
                    Pemeriksaan Kelayakan Listing
                  </span>
                  <h2 className="text-base font-black text-white">{selectedProperty.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-slate-400 hover:text-white font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden bg-slate-800">
                <img
                  src={selectedProperty.coverImage}
                  alt={selectedProperty.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Alamat Lengkap:</span>
                  <span className="font-semibold text-right">{selectedProperty.address}, {selectedProperty.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kontak Pemilik:</span>
                  <span className="font-semibold">{selectedProperty.ownerContact.name} ({selectedProperty.ownerContact.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rekening Tujuan:</span>
                  <span className="font-semibold">{selectedProperty.bankAccount.bankName} - {selectedProperty.bankAccount.accountNumber} ({selectedProperty.bankAccount.accountHolder})</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl space-y-1 text-xs">
                <span className="font-bold text-white block">Deskripsi:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedProperty.description}</p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Tutup
                </button>
                {selectedProperty.partnershipStatus === 'WAITING_REVIEW' && (
                  <>
                    <button
                      onClick={() => handleReject(selectedProperty.id)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                    >
                      Tolak Pengajuan
                    </button>
                    <button
                      onClick={() => handleApprove(selectedProperty.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      Setujui & Publikasikan Listing
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
