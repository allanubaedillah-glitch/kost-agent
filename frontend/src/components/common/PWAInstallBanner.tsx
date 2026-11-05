import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also show mock install hint once if not installed
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShow(false);
      });
    } else {
      alert('Untuk memasang PWA: Klik menu browser (titik 3 atau tombol Share) lalu pilih "Tambahkan ke Layar Utama" (Add to Home screen).');
      setShow(false);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-md relative z-30">
      <div className="flex items-center space-x-2.5 flex-1 pr-2">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Download className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="font-bold leading-tight">Install KostAgent App</p>
          <p className="text-[11px] text-indigo-100 opacity-90">Akses cepat, hemat kuota & ketersediaan kos real-time</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={handleInstall}
          className="bg-white text-indigo-900 font-extrabold px-3 py-1 rounded-lg text-xs shadow-sm hover:bg-indigo-50 transition"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
