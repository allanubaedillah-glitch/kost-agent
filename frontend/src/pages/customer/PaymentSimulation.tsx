import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Header } from '../../components/common/Header';
import { 
  CreditCard, Copy, Check, Upload, Clock, 
  AlertCircle, ShieldCheck, ArrowRight, QrCode, Image as ImageIcon 
} from 'lucide-react';
import { kaApi } from '../../api/client';

export const PaymentSimulation: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { navigate } = useRouter();
  const { getBooking, getProperty, submitPaymentProof } = useAppStore();

  const booking = getBooking(bookingId);
  const property = booking ? getProperty(booking.propertyId) : undefined;

  const [copied, setCopied] = useState(false);
  const [proofUrl, setProofUrl] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
  const [selectedFileName, setSelectedFileName] = useState('struk-transfer-bca-m-banking.jpg');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Countdown timer 60 mins
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!booking) return;

    const interval = setInterval(() => {
      const diff = new Date(booking.paymentHoldExpiresAt).getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          minutes: Math.floor(diff / 60000),
          seconds: Math.floor((diff % 60000) / 1000)
        });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  if (!booking || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header showBack title="Pembayaran Tidak Ditemukan" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xs text-slate-500">Pemesanan tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(property.bankAccount.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSimulateFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalReceiptUrl = proofUrl;

      // Option 3-A: Jika customer mengunggah file riil, upload ke backend via Multer multipart
      if (selectedFile) {
        const uploadRes = await kaApi.bookings.uploadReceipt(selectedFile).catch((err) => {
          console.warn('Multer upload failed, using fallback:', err);
          return null;
        });
        if (uploadRes && uploadRes.success && uploadRes.data?.url) {
          finalReceiptUrl = uploadRes.data.url;
        }
      }

      await submitPaymentProof(booking.id, finalReceiptUrl);
      setIsSubmitting(false);
      alert('Bukti transfer berhasil dikirim ke pemilik kos! Status pemesanan kini PAYMENT SUBMITTED (menunggu verifikasi pemilik maks 1x24 jam).');
      navigate(`/booking-status/${booking.id}`);
    } catch (err: any) {
      setIsSubmitting(false);
      alert('Gagal mengirimkan bukti transfer: ' + (err?.message || 'Terjadi kesalahan sistem'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header showBack title="Instruksi Pembayaran Sewa" />

      <main className="max-w-2xl mx-auto w-full px-4 pt-4 space-y-5">
        {/* TIMER BAR */}
        <div className="bg-indigo-950 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
                Sisa Waktu Hold Slot Kamar
              </span>
              <span className="text-lg font-mono font-black">
                {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-indigo-300 block">Total Nominal</span>
            <span className="text-base font-black text-amber-300">
              Rp {booking.totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* DIRECT-TO-OWNER PAYMENT BOX */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Rekening Tujuan Pemilik Kos</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Direct Transfer (Tanpa Markup)
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-medium">Bank Tujuan:</span>
              <span className="text-xs font-bold text-slate-800">{property.bankAccount.bankName}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">Nomor Rekening:</span>
              <div className="flex items-center space-x-2">
                <span className="text-base font-mono font-black text-indigo-600">
                  {property.bankAccount.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700 flex items-center space-x-1 transition"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">Atas Nama Pemilik:</span>
              <span className="text-xs font-bold text-slate-800">{property.bankAccount.accountHolder}</span>
            </div>
          </div>

          {/* QRIS EXPANDER IF PRESENT */}
          {property.bankAccount.qrisUrl && (
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center space-x-3">
              <QrCode className="w-6 h-6 text-indigo-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-indigo-950 block">Mendukung Pembayaran QRIS</span>
                <span className="text-indigo-700 text-[11px]">Bisa scan dari BCA, Mandiri, GoPay, OVO, atau ShopeePay</span>
              </div>
            </div>
          )}

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Pastikan transfer tepat sejumlah <strong>Rp {booking.totalAmount.toLocaleString('id-ID')}</strong>. Simpan bukti transfer m-banking atau struk ATM Anda untuk diunggah di bawah.
            </p>
          </div>
        </div>

        {/* UPLOAD PROOF OF PAYMENT SIMULATION */}
        <form onSubmit={handleConfirmPayment} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Unggah Bukti Transfer</h2>
            </div>
            <span className="text-[10px] text-slate-400">JPG, PNG, PDF (Maks 3MB)</span>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50 hover:bg-slate-50 transition">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/png,image/jpeg,image/webp,application/pdf" 
              className="hidden" 
            />

            {previewUrl ? (
              <div className="space-y-2">
                <img src={previewUrl} alt="Preview Bukti" className="max-h-44 mx-auto rounded-xl shadow-xs border border-slate-200 object-cover" />
                <span className="text-[10px] text-emerald-600 font-bold block">✓ File lokal siap diunggah ke server</span>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
            )}

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-800">
                Berkas Terpilih: <span className="text-indigo-600 font-mono">{selectedFileName}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Pilih foto struk transfer dari perangkat Anda atau gunakan contoh demo
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={handleSimulateFileSelect}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold transition shadow-xs flex items-center space-x-1"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Pilih Foto dari Perangkat</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md shadow-indigo-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Mengirimkan Bukti Bayar...</span>
            ) : (
              <>
                <span>Kirim Bukti Pembayaran ke Pemilik Kos</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};
