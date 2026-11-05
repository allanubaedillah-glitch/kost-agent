import React from 'react';
import { useRouter } from '../router';
import { useOwnerStore } from '../store/ownerStore';
import { 
  Building2, Hotel, ChevronDown, User as UserIcon, 
  LogOut, PlusCircle, CheckCircle2, ShieldCheck, Sparkles 
} from 'lucide-react';

export const OwnerNavbar: React.FC = () => {
  const { navigate, path } = useRouter();
  const { owner, properties, selectedPropertyId, setSelectedPropertyId, logout } = useOwnerStore();

  const currentProperty = properties.find(p => p.id === selectedPropertyId);

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    if (newId === '__add_new__') {
      navigate('/properties/add');
    } else {
      setSelectedPropertyId(newId);
      // Navigate to property overview
      navigate(`/properties/${newId}`);
    }
  };

  return (
    <header className="bg-indigo-950 text-white shadow-md sticky top-0 z-30 border-b border-indigo-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* BRANDING */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/30 flex items-center justify-center border border-indigo-400/30 shadow-inner">
            <Hotel className="w-6 h-6 text-indigo-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
              UbaedillahProject
            </span>
            <span className="text-base font-black tracking-tight text-white leading-none">
              Kost Management
            </span>
          </div>
        </div>

        {/* PROPERTY SWITCHER DROPDOWN */}
        {owner && (
          <div className="hidden sm:flex items-center space-x-2 bg-indigo-900/60 px-3 py-1.5 rounded-xl border border-indigo-700/60 text-xs">
            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-indigo-300 font-semibold">Properti Aktif:</span>
            <select
              value={selectedPropertyId}
              onChange={handlePropertyChange}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              {properties.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name}
                </option>
              ))}
              <option value="__add_new__" className="bg-slate-900 text-indigo-400 font-bold">
                + Tambah Properti Baru
              </option>
            </select>
          </div>
        )}

        {/* RIGHT NAVIGATION ACTIONS */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition hidden md:inline-block ${
              path === '/' || path === '/dashboard' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:text-white'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate('/properties')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition hidden md:inline-block ${
              path === '/properties' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:text-white'
            }`}
          >
            Daftar Properti
          </button>

          {/* SUBSCRIPTION BADGE */}
          {owner && (
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-100">{owner.name}</span>
              <span className="text-[10px] text-emerald-400 flex items-center justify-end space-x-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{owner.subscriptionPlan}</span>
              </span>
            </div>
          )}

          {/* USER AVATAR & PROFILE MENU */}
          {owner ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-indigo-800">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-indigo-900 transition"
                title="Profil Pemilik"
              >
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-400"
                />
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-8 h-8 rounded-lg bg-indigo-900 hover:bg-rose-900/60 text-indigo-300 hover:text-rose-200 flex items-center justify-center transition"
                title="Keluar Akun"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Masuk
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
