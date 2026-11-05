import React from 'react';
import { useRouter } from '../../router';
import { useAppStore } from '../../store/store';
import { Home, Search, BookOpenCheck, User as UserIcon } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { path, navigate } = useRouter();
  const { bookings } = useAppStore();

  const activeBookingsCount = bookings.filter(
    b => b.status === 'PENDING_PAYMENT' || b.status === 'PAYMENT_SUBMITTED' || b.status === 'ACCEPTED'
  ).length;

  const navItems = [
    { label: 'Beranda', icon: Home, route: '/' },
    { label: 'Cari Kos', icon: Search, route: '/search' },
    { label: 'Pesanan', icon: BookOpenCheck, route: '/history', badge: activeBookingsCount },
    { label: 'Akun', icon: UserIcon, route: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 pb-safe sm:max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.route === '/' 
            ? path === '/' 
            : path.startsWith(item.route);
          const Icon = item.icon;

          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${
                isActive ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
