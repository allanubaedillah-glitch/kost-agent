import React, { useState, useEffect } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { 
  Clock, CheckCircle, XCircle, AlertTriangle, ArrowRight, 
  CreditCard, Phone, RotateCcw, ShieldCheck, FileText, Check 
} from 'lucide-react';
import { BookingStatus as StatusType } from '../../types';

export const BookingStatus: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { navigate } = useRouter();
  const { getBooking, cancelBooking, submitRefundAccount, simulateCheckIn, refreshData } = useAppStore();

  const booking = getBooking(bookingId);

  // Smart Client Polling (Option 2-A): Poll status every 3s to capture Owner Accept/Reject webhook real-time
  useEffect(() => {
    if (!bookingId) return;

    const poll = setInterval(async () => {
      try {
        await refreshData();
      } catch (e) {
        // ignore transient poll error
      }
    }, 3000);

    return () => clearInterval(poll);
  }, [bookingId, refreshData]);

  // Live countdown timer state for 60 mins hold or 24h SLA
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });

  // Refund account form state
  const [bankName, setBankName] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  useEffect(() => {
    if (!booking) return;

    const interval = setInterval(() => {
      let targetTime = 0;
      if (booking.status === 'PENDING_PAYMENT') {
        targetTime = new Date(booking.paymentHoldExpiresAt).getTime();
      } else if (booking.status === 'PAYMENT_SUBMITTED' && booking.ownerSlaExpiresAt) {
        targetTime = new Date(booking.ownerSlaExpiresAt).getTime();
      }

      const diff = targetTime - Date.now();
      if (diff > 0) {
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft({ minutes: m, seconds: s });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header showBack title="Pesanan Tidak Ditemukan" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <AlertTriangle className="w-12 h-12 text-rose-500" />
          <h2 className="text-base font-bold text-slate-800">Pesanan Tidak Ditemukan</h2>
          <button
            onClick={() => navigate('/history')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
          >
            Buka Riwayat Pesanan
          </button>
        </div>
      </div>
    );
  }

  const handleCancelSelf = () => {
    if (confirm('Apakah Anda yakin ingin membatalkan pemesanan ini? Slot kamar akan langsung dilepaskan kembali ke publik.')) {
      cancelBooking(booking.id);
      alert('Pemesanan telah dibatalkan. Slot kamar berhasil dilepas kembali.');
    }
  };

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !accountHolder) {
      alert('Mohon isi lengkap rincian rekening refund.');
      return;
    }
    submitRefundAccount(booking.id, {
      bankName,
      accountNumber,
      accountHolder
    });
    alert('Rincian rekening refund berhasil dikirim ke pemilik kos. Pemilik memiliki SLA 1x24 jam untuk mentransfer pengembalian dana.');
  };

  // Status Stepper calculation
  const getStepIndex = (status: StatusType) => {
    switch (status) {
      case 'PENDING_PAYMENT':
        return 1;
      case 'PAYMENT_SUBMITTED':
        return 2;
      case 'ACCEPTED':
      case 'CHECKED_IN':
        return 3;
      case 'REJECTED':
      case 'REFUND_PENDING':
      case 'REFUND_COMPLETED':
        return 2;
      default:
        return 1;
    }
  };

  const currentStep = getStepIndex(booking.status);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header showBack title={`Status #${booking.id}`} />

      <main className="max-w-2xl mx-auto w-full px-4 pt-4 space-y-5">
        {/* VISUAL STATUS STEPPER */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span className={currentStep >= 1 ? 'text-indigo-600' : ''}>1. Booking Hold (60m)</span>
            <span className={currentStep >= 2 ? 'text-indigo-600' : ''}>2. Verifikasi Owner</span>
            <span className={currentStep >= 3 ? 'text-indigo-600' : ''}>3. Konfirmasi / Check-In</span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="bg-indigo-600 h-full transition-all duration-500 rounded-full"
              style={{
                width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'
              }}
            ></div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CASE 1: PENDING PAYMENT (COUNTDOWN 60 MINS) */}
        {/* ======================================================== */}
        {booking.status === 'PENDING_PAYMENT' && (
          <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-md space-y-5">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 inline-block uppercase tracking-wider">
                Menunggu Pembayaran Transfer
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Slot Kamar Berhasil Dikunci (Hold)
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Silakan lakukan transfer langsung ke pemilik kos sebelum waktu countdown 60 menit habis.
              </p>
            </div>

            {/* COUNTDOWN BOX */}
            <div className="bg-indigo-950 text-white p-4 rounded-2xl flex items-center justify-between shadow-inner">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
                  <Clock className="w-5 h-5 animate-pulse text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] text-indigo-300 font-bold block uppercase tracking-wider">
                    Sisa Waktu Pembayaran (60m)
                  </span>
                  <span className="text-xl font-mono font-black text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-indigo-300 block">Total Tagihan</span>
                <span className="text-base font-black text-amber-400">
                  Rp {booking.totalAmount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => navigate(`/payment/${booking.id}`)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md shadow-indigo-200 flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Lanjut ke Instruksi Bayar & Upload Bukti</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCancelSelf}
                className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold rounded-xl text-xs transition border border-slate-200"
              >
                Batalkan Pemesanan Mandiri (Lepas Slot)
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CASE 2: PAYMENT SUBMITTED (MENUNGGU VERIFIKASI OWNER 24H) */}
        {/* ======================================================== */}
        {booking.status === 'PAYMENT_SUBMITTED' && (
          <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-md space-y-5">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-300 inline-block uppercase tracking-wider">
                Bukti Bayar Terkirim
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Menunggu Verifikasi Pemilik Kos
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Bukti transfer Anda telah diteruskan ke sistem Kost Management milik pemilik kos.
              </p>
            </div>

            {/* SLA COUNTER */}
            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl flex items-center justify-between border border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Target SLA Verifikasi Owner (Maks 24 Jam)
                  </span>
                  <span className="text-lg font-mono font-bold text-slate-200">
                    {timeLeft.minutes > 0 ? `${timeLeft.minutes} Menit Tersisa` : 'Mendekati Batas / Siap Ditindak'}
                  </span>
                </div>
              </div>
            </div>

            {/* LOCK NOTICE (ADR-001) */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Kunci Pembatalan Mandiri:</span>
              <p className="leading-relaxed">
                Karena bukti bayar sudah disubmit, tombol pembatalan mandiri dikunci. Slot kamar tetap aman terkunci. Jika lewat 24 jam belum ada respon dari pemilik kos, transaksi ini akan otomatis diprioritaskan oleh Admin KostAgent (Needs Attention - ADR-003).
              </p>
            </div>

            {/* UPLOADED PROOF PREVIEW */}
            {booking.paymentProofUrl && (
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Bukti Transfer Berhasil Diunggah</span>
                    <span className="text-[10px] text-slate-400">
                      Disubmit: {new Date(booking.paymentSubmittedAt || '').toLocaleTimeString('id-ID')} WIB
                    </span>
                  </div>
                </div>
                <a
                  href={booking.paymentProofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Lihat Berkas
                </a>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* CASE 3: ACCEPTED (BOOKING APPROVED) */}
        {/* ======================================================== */}
        {booking.status === 'ACCEPTED' && (
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-md space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider inline-block">
                Pemesanan Disetujui (Accepted)
              </span>
              <h2 className="text-xl font-black text-slate-900">
                Kamar Anda Siap Dihuni!
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Pemilik kos telah memverifikasi pembayaran sewa Anda. Silakan tiba di kos maksimal 14 hari sejak persetujuan.
              </p>
            </div>

            <button
              onClick={() => navigate(`/confirmation/${booking.id}`)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md shadow-emerald-200 flex items-center justify-center space-x-2"
            >
              <span>Buka Tiket Konfirmasi & Check-In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* CASE 4: REJECTED (ALUR REFUND ADR-012) */}
        {/* ======================================================== */}
        {booking.status === 'REJECTED' && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-md space-y-5">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <XCircle className="w-6 h-6" />
              </div>
              <span className="px-3 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 uppercase tracking-wider inline-block">
                Pemesanan Ditolak Pemilik Kos
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Pengembalian Dana (Refund Flow)
              </h2>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <strong className="block font-bold">Alasan Penolakan dari Pemilik:</strong>
              <p>{booking.rejectionReason || 'Kamar telah terisi secara offline / pembayaran belum sesuai.'}</p>
            </div>

            {/* FORM INPUT REKENING REFUND */}
            <form onSubmit={handleRefundSubmit} className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-extrabold text-slate-800 block">
                Formulir Rekening Pengembalian Dana (100% Utuh):
              </span>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Pilih Bank / E-Wallet Tujuan
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
                >
                  <option value="BCA">BCA (Bank Central Asia)</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BNI">Bank BNI</option>
                  <option value="BRI">Bank BRI</option>
                  <option value="GoPay">GoPay</option>
                  <option value="OVO">OVO</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nomor Rekening / Nomor E-Wallet
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Contoh: 1234567890"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nama Pemilik Rekening
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="Contoh: Allan Gemilang"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-rose-200 flex items-center justify-center space-x-1.5"
              >
                <span>Kirim Rekening Refund ke Pemilik (SLA 1x24 Jam)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* CASE 5: REFUND PENDING / COMPLETED */}
        {booking.status === 'REFUND_PENDING' && (
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-md space-y-3 text-center">
            <Clock className="w-10 h-10 text-amber-500 mx-auto" />
            <h2 className="text-base font-bold text-slate-900">Rekening Refund Telah Diterima Pemilik</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Pemilik kos sedang memproses pengembalian dana manual ke {booking.refundAccount?.bankName} ({booking.refundAccount?.accountNumber}) an {booking.refundAccount?.accountHolder}. SLA transfer: 1x24 jam.
            </p>
          </div>
        )}

        {booking.status === 'REFUND_COMPLETED' && (
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-md space-y-3 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
            <h2 className="text-base font-bold text-slate-900">Pengembalian Dana Selesai</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Pemilik kos telah mengonfirmasi transfer dana refund ke rekening Anda.
            </p>
          </div>
        )}

        {/* CASE 6: CHECKED_IN */}
        {booking.status === 'CHECKED_IN' && (
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-md space-y-3 text-center">
            <Check className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="text-base font-bold text-slate-900">Anda Telah Menghuni Kamar Ini</h2>
            <p className="text-xs text-slate-500">
              Kedatangan Anda telah diverifikasi oleh pemilik kos.
            </p>
            <button
              onClick={() => navigate('/history')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
            >
              Beri Ulasan di Riwayat
            </button>
          </div>
        )}

        {/* CASE 7: CANCELLED */}
        {booking.status === 'CANCELLED' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3 text-center">
            <XCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h2 className="text-base font-bold text-slate-900">Pemesanan Dibatalkan</h2>
            <p className="text-xs text-slate-500">
              Slot kamar telah dilepaskan kembali ke publik. Anda dapat mencari kos lain.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
            >
              Cari Kos Lain
            </button>
          </div>
        )}

        {/* SUMMARY BOOKING CARD */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Rincian Pemesanan
          </h3>
          <div className="flex justify-between">
            <span className="text-slate-500">Properti Kos</span>
            <span className="font-semibold text-slate-900">{booking.propertyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kamar</span>
            <span className="font-semibold text-slate-900">{booking.roomName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Jumlah Slot</span>
            <span className="font-semibold text-slate-900">{booking.requestedSlots} Orang</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tanggal Mulai Masuk</span>
            <span className="font-semibold text-slate-900">{booking.checkInDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Durasi Sewa</span>
            <span className="font-semibold text-slate-900">{booking.durationMonths} Bulan</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-black text-slate-900">
            <span>Total Tagihan Sewa</span>
            <span className="text-indigo-600">Rp {booking.totalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
