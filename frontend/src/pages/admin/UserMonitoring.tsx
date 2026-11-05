import React, { useState } from 'react';
import { useAppStore } from '../../store/store';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  Users, Lock, Unlock, ShieldAlert, CheckCircle, 
  FileText, Calendar, Eye 
} from 'lucide-react';

export const UserMonitoring: React.FC = () => {
  const { auditLogs, adminRecordAuditLog, bookings } = useAppStore();
  const [unmaskedUserId, setUnmaskedUserId] = useState<string | null>(null);

  // Extract users from demo user list + bookings
  const customerList = [
    {
      id: 'usr-customer-01',
      name: 'Allan Gemilang',
      email: 'allan@kostagent.com',
      phone: '081234567890',
      nik: '3201234567890001',
      isVerified: true,
      registeredAt: '2026-10-15'
    },
    {
      id: 'usr-customer-02',
      name: 'Siti Sarah',
      email: 'siti.sarah@gmail.com',
      phone: '081299001122',
      nik: '3201887766550002',
      isVerified: true,
      registeredAt: '2026-10-20'
    },
    {
      id: 'usr-customer-03',
      name: 'Dimas Prasetyo',
      email: 'dimas.p@gmail.com',
      phone: '081377889900',
      nik: '3171098877660003',
      isVerified: true,
      registeredAt: '2026-10-25'
    }
  ];

  const handleOpenInvestigation = (user: typeof customerList[0]) => {
    const reason = prompt(
      `PENEGAKAN MINIMUM ACCESS (ADR-007):\nUntuk membuka data sensitif NIK pengguna ${user.name}, masukkan nomor tiket investigasi atau alasan resmi sengketa:`,
      'Investigasi sengketa transfer booking #BKG-2026-9001'
    );

    if (reason && reason.trim()) {
      adminRecordAuditLog('UNMASK_SENSITIVE_USER_DATA', 'USER', user.id, reason);
      setUnmaskedUserId(user.id);
      alert(`Akses investigasi dibuka untuk sesi ini. Tindakan dan alasan telah dicatat permanen di Audit Log:\n"${reason}"`);
    }
  };

  return (
    <AdminLayout activeTab="users">
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-lg font-black text-white">Monitoring Pengguna & Rekam Jejak Audit</h1>
          <p className="text-xs text-slate-400">
            Pengawasan akun calon penghuni dengan perlindungan data pribadi berbasis Minimum Access (ADR-007).
          </p>
        </div>

        {/* USERS TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Daftar Calon Penghuni Terdaftar</h2>
            <span className="text-xs text-slate-400">Total: {customerList.length} Pengguna</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 rounded-l-xl">Nama Pengguna</th>
                  <th className="p-3">Kontak WhatsApp</th>
                  <th className="p-3">Nomor NIK Resmi</th>
                  <th className="p-3">Status Verifikasi</th>
                  <th className="p-3 rounded-r-xl text-right">Investigasi Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {customerList.map((u) => {
                  const isUnmasked = unmaskedUserId === u.id;

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3">
                        <span className="font-bold text-white block">{u.name}</span>
                        <span className="text-slate-400 text-[11px]">{u.email}</span>
                      </td>

                      <td className="p-3 text-slate-300 font-mono">
                        {u.phone}
                      </td>

                      <td className="p-3 font-mono">
                        {isUnmasked ? (
                          <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800">
                            {u.nik}
                          </span>
                        ) : (
                          <span className="text-slate-500 font-semibold tracking-wider">
                            {u.nik.slice(0, 4)}••••••••••••
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 inline-flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Terverifikasi</span>
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleOpenInvestigation(u)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold inline-flex items-center space-x-1.5 transition ${
                            isUnmasked
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          {isUnmasked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          <span>{isUnmasked ? 'Data Terbuka' : 'Investigasi Sengketa'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AUDIT LOG TABLE */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-indigo-400" />
                <span>Rekam Jejak Audit Log Permanen (ADR-007)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Setiap aksi pembukaan data sensitif atau perubahan status kemitraan tersimpan secara permanen.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Target: {log.targetType} ({log.targetId})
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium">Alasan: "{log.reason}"</p>
                </div>

                <div className="text-right text-[11px] text-slate-500 shrink-0">
                  <span className="block font-semibold text-slate-400">Admin: {log.adminName}</span>
                  <span>{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
