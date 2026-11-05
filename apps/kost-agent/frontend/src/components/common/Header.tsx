import React from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Building2, ChevronLeft, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack }) => {
  const { path, navigate } = useRouter();
  const { currentUser } = useAppStore();

  const isHome = path === '/';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {showBack ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.history.back()}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
              aria-label="Kembali"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {title && (
              <h1 className="text-base font-bold text-slate-900 truncate max-w-[240px]">
                {title}
              </h1>
            )}
          </div>
        ) : (
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 block leading-none">
                PT. AlanGantengBanget
              </span>
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                KostAgent
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {currentUser ? (
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 p-1 pr-2 rounded-full hover:bg-slate-100 transition"
            >
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-indigo-200"
              />
              <span className="text-xs font-bold text-slate-800 hidden sm:inline max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-sm"
            >
              Masuk
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
