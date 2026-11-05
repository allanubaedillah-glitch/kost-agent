import React, { useState } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { 
  Building2, Users, Calendar, Clock, CreditCard, 
  ShieldCheck, ArrowRight, UserCheck, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { OccupantData } from '../../types';

export const BookingRequest: React.FC<{ roomId: string }> = ({ roomId }) => {
  const { navigate } = useRouter();
  const { getRoom, getProperty, currentUser, createBooking } = useAppStore();

  const room = getRoom(roomId);
  const property = room ? getProperty(room.propertyId) : undefined;

  const availableSlots = room ? (room.totalCapacity - room.occupiedSlots - room.reservedSlots) : 0;

  // Form states
  const [checkInDate, setCheckInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [durationMonths, setDurationMonths] = useState<number>(1);
  const [requestedSlots, setRequestedSlots] = useState<number>(1);

  // Dynamic Occupants Form State
  const [occupants, setOccupants] = useState<OccupantData[]>(() => [
    {
      slotIndex: 1,
      fullName: currentUser?.name || '',
      phone: currentUser?.phone || '',
      nik: '3201000000000001',
      emergencyContact: '081122334455 (Keluarga)',
      ktpUploaded: true,
      workOrStudentCardUploaded: true,
      customRequirementsAnswers: {}
    }
  ]);

  const [agreementChecked, setAgreementChecked] = useState(true);

  if (!room || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header showBack title="Kamar Tidak Ditemukan" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xs text-slate-500">Kamar tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  // Handle changing requested slots
  const handleSlotCountChange = (count: number) => {
    setRequestedSlots(count);
    const newOccupants: OccupantData[] = [];
    for (let i = 1; i <= count; i++) {
      if (occupants[i - 1]) {
        newOccupants.push(occupants[i - 1]);
      } else {
        newOccupants.push({
          slotIndex: i,
          fullName: '',
          phone: '',
          nik: '',
          emergencyContact: '',
          ktpUploaded: true,
          workOrStudentCardUploaded: true,
          customRequirementsAnswers: {}
        });
      }
    }
    setOccupants(newOccupants);
  };

  const updateOccupantField = (index: number, field: keyof OccupantData, val: any) => {
    setOccupants(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  // Price calculations
  const totalAmount = room.pricePerMonth * requestedSlots * durationMonths;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Silakan login terlebih dahulu untuk mengajukan pemesanan.');
      navigate('/login');
      return;
    }

    // Validate occupants
    for (let i = 0; i < requestedSlots; i++) {
      const occ = occupants[i];
      if (!occ.fullName || !occ.phone || !occ.nik) {
        alert(`Mohon lengkapi Nama, No HP, dan NIK untuk Penghuni #${i + 1}.`);
        return;
      }
      if (occ.nik.length < 16) {
        alert(`NIK Penghuni #${i + 1} wajib 16 digit angka resmi.`);
        return;
      }
    }

    if (!agreementChecked) {
      alert('Anda wajib menyetujui syarat & ketentuan sewa kos.');
      return;
    }

    const newBooking = await createBooking({
      property,
      room,
      checkInDate,
      durationMonths,
      requestedSlots,
      occupants: occupants.slice(0, requestedSlots)
    });

    if (newBooking) {
      navigate(`/booking-status/${newBooking.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      <Header showBack title="Formulir Pemesanan Kamar" />

      <main className="max-w-2xl mx-auto w-full px-4 pt-3 space-y-5">
        {/* ROOM SUMMARY CARD */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
          <img
            src={room.images[0] || property.coverImage}
            alt={room.name}
            className="w-20 h-20 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
              {property.name}
            </span>
            <h2 className="text-sm font-bold text-slate-900 truncate">{room.name}</h2>
            <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
              <span>{room.type === 'bersama' ? 'Kamar Bersama' : 'Kamar Privat'}</span>
              <span>•</span>
              <span className="font-bold text-indigo-600">
                Rp {room.pricePerMonth.toLocaleString('id-ID')}/slot/bln
              </span>
            </div>
          </div>
        </div>

        {/* BOOKING SPECS FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Detail Sewa & Durasi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rencana Tanggal Masuk
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Durasi Sewa
                </label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                >
                  <option value={1}>1 Bulan</option>
                  <option value={3}>3 Bulan (Paket Triwulan)</option>
                  <option value={6}>6 Bulan (Paket Semester)</option>
                  <option value={12}>12 Bulan (1 Tahun Penuh)</option>
                </select>
              </div>
            </div>

            {/* SELECTION OF SLOTS (MULTI-SLOT / SHARED ROOM) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Slot Dipesan ({requestedSlots} Orang)
              </label>
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(availableSlots, 4) }).map((_, idx) => {
                  const num = idx + 1;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleSlotCountChange(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                        requestedSlots === num
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num} Slot ({num} Org)
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Kapasitas slot kamar ini tersisa <strong className="text-slate-800">{availableSlots} slot</strong>. Seluruh slot dialokasikan secara atomik (All-or-Nothing).
              </p>
            </div>
          </div>

          {/* DYNAMIC FORM PER PENGHUNI (ADR-009) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Identitas Penghuni ({requestedSlots} Orang)</span>
              </h3>
              <span className="text-[11px] text-slate-500">Sesuai KTP & Ketentuan Kos</span>
            </div>

            {occupants.slice(0, requestedSlots).map((occ, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    Penghuni Slot #{idx + 1}
                  </span>
                  <span className="text-[11px] text-slate-400">Data Penghuni {idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={occ.fullName}
                      onChange={(e) => updateOccupantField(idx, 'fullName', e.target.value)}
                      placeholder="Sesuai KTP"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      value={occ.phone}
                      onChange={(e) => updateOccupantField(idx, 'phone', e.target.value)}
                      placeholder="08123456789"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nomor Induk Kependudukan (NIK 16 Digit) *
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={occ.nik}
                      onChange={(e) => updateOccupantField(idx, 'nik', e.target.value)}
                      placeholder="3201xxxxxxxxxxxx"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Kontak Darurat (Ortu/Kerabat) *
                    </label>
                    <input
                      type="text"
                      value={occ.emergencyContact}
                      onChange={(e) => updateOccupantField(idx, 'emergencyContact', e.target.value)}
                      placeholder="0811xxxxxx (Hubungan)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>
                </div>

                {/* DOKUMEN & CHECKBOX PERSYARATAN KOS */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Konfirmasi Berkas & Ketentuan Kos:
                  </span>
                  <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={occ.ktpUploaded}
                      onChange={(e) => updateOccupantField(idx, 'ktpUploaded', e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Menyanggupi menyerahkan salinan KTP/Identitas Resmi saat tiba di kos</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={occ.workOrStudentCardUploaded}
                      onChange={(e) => updateOccupantField(idx, 'workOrStudentCardUploaded', e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Menyanggupi menunjukkan Kartu Mahasiswa / Bukti Kerja bila diminta pemilik</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* RINGKASAN PEMBAYARAN TRANSPARAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Rincian Biaya Sewa Transparan (Direct Payment)</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tarif Kamar per Slot</span>
                <span className="font-semibold text-slate-900">
                  Rp {room.pricePerMonth.toLocaleString('id-ID')} / bln
                </span>
              </div>
              <div className="flex justify-between">
                <span>Jumlah Slot Pemesan</span>
                <span className="font-semibold text-slate-900">{requestedSlots} Orang</span>
              </div>
              <div className="flex justify-between">
                <span>Durasi Sewa</span>
                <span className="font-semibold text-slate-900">{durationMonths} Bulan</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Biaya Layanan KostAgent</span>
                <span>Gratis (Rp 0)</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                <span>Total Transfer ke Pemilik Kos</span>
                <span className="text-lg text-indigo-600">
                  Rp {totalAmount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/80 text-[11px] text-indigo-900 space-y-1">
              <p className="font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Aturan Real-Time Slot Hold (ADR-008):</span>
              </p>
              <p className="leading-relaxed">
                Begitu pemesanan diajukan, slot kamar akan di-hold selama <strong>60 menit</strong> di sistem operasional pemilik (Kost Management). Anda memiliki waktu 60 menit untuk mentransfer dan mengunggah bukti bayar.
              </p>
            </div>

            <label className="flex items-start space-x-2 text-xs text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreementChecked}
                onChange={(e) => setAgreementChecked(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5"
              />
              <span className="leading-relaxed">
                Saya menyetujui seluruh tata tertib kos, mekanisme transfer langsung ke rekening pemilik, dan ketentuan pembatalan sewa.
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-sm transition shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2"
          >
            <span>Ajukan Pemesanan & Kunci Slot 60 Menit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </main>
    </div>
  );
};
