import React from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Building2, Handshake, BookOpenCheck, AlertTriangle, 
  ArrowRight, CheckCircle2, Clock, Users, ShieldAlert 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const { properties, bookings, auditLogs } = useAppStore();

  const activePropertiesCount = properties.filter(p => p.partnershipStatus === 'ACTIVE').length;
  const pendingReviewsCount = properties.filter(p => p.partnershipStatus === 'WAITING_REVIEW').length;
  const totalBookingsCount = bookings.length;
  
  // Overdue count (>24h SLA)
  const overdueSlaCount = bookings.filter(b => {
    if (b.status !== 'PAYMENT_SUBMITTED' || !b.ownerSlaExpiresAt) return false;
    return new Date(b.ownerSlaExpiresAt).getTime() < Date.now();
  }).length;

  const grossVolume = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <AdminLayout activeTab="dashboard">
      <div className="space-y-6">
        {/* KPI METRICS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Mitra Kos Aktif
            </span>
            <div className="text-2xl font-black text-emerald-400">
              {activePropertiesCount}
            </div>
            <span className="text-[11px] text-slate-400">
              dari {properties.length} total pengajuan
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menunggu Review
            </span>
            <div className="text-2xl font-black text-amber-400">
              {pendingReviewsCount}
            </div>
            <span className="text-[11px] text-slate-400">
              Perlu verifikasi listing
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Booking Terdata
            </span>
            <div className="text-2xl font-black text-indigo-400">
              {totalBookingsCount}
            </div>
            <span className="text-[11px] text-slate-400">
              Rp {grossVolume.toLocaleString('id-ID')} volume
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              SLA Overdue (&gt;24 Jam)
            </span>
            <div className="text-2xl font-black text-rose-400">
              {overdueSlaCount}
            </div>
            <span className="text-[11px] text-slate-400">
              Butuh eskalasi admin ke owner
            </span>
          </div>
        </div>

        {/* QUICK SHORTCUTS & OVERDUE CALLOUT */}
        {overdueSlaCount > 0 && (
          <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800 flex items-center justify-between text-xs text-rose-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <strong className="text-white block font-bold">
                  Perhatian: Terdapat {overdueSlaCount} transaksi booking yang melampaui SLA 24 jam!
                </strong>
                <span>Pemilik kos belum memverifikasi bukti bayar. Lakukan follow-up manual melalui menu Booking Monitoring.</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 transition"
            >
              Tindak Lanjuti
            </button>
          </div>
        )}

        {/* RECENT TRANSACTIONS TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Transaksi Pemesanan Terkini</h2>
              <p className="text-xs text-slate-400">Status alokasi slot kamar publik secara real-time</p>
            </div>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="text-xs font-bold text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>Semua Transaksi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">ID Booking</th>
                  <th className="p-3">Nama Kos & Kamar</th>
                  <th className="p-3">Penyewa</th>
                  <th className="p-3">Nominal Sewa</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-r-xl">Tindakan Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-mono font-bold text-indigo-300">{b.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-white block">{b.propertyName}</span>
                      <span className="text-slate-400 text-[11px]">{b.roomName}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-slate-200 block">{b.customerName}</span>
                      <span className="text-slate-500 text-[11px]">{b.customerPhone}</span>
                    </td>
                    <td className="p-3 font-semibold text-slate-200">
                      Rp {b.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        b.status === 'ACCEPTED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : b.status === 'REJECTED'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : b.status === 'PAYMENT_SUBMITTED'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate('/admin/bookings')}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold text-[11px]"
                      >
                        Pantau
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AUDIT LOG RECENT ACTIVITY */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
          <h2 className="text-sm font-bold text-white">Log Aktivitas Operasional & Audit</h2>
          <div className="space-y-2">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-3 bg-slate-800/50 rounded-xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-indigo-300 font-mono">[{log.action}]</span>
                  <span className="text-slate-300 ml-2">{log.reason}</span>
                  <span className="text-[10px] text-slate-500 block">
                    Dieksekusi oleh: {log.adminName} ({new Date(log.timestamp).toLocaleString('id-ID')})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
