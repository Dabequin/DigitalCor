import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

interface TopBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  mobileTitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  placeholder = 'Buscar...',
  mobileTitle = 'DigitalCor'
}) => {
  const { logout } = useAppState();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 flex justify-between items-center w-full px-lg py-sm bg-surface border-b border-outline-variant shadow-sm transition-all duration-200">
      
      {/* Left: Mobile Title or Search box on Desktop */}
      <div className="flex items-center gap-md">
        <span className="material-symbols-outlined md:hidden text-primary font-bold">menu</span>
        <h2 className="font-headline-md text-headline-md font-bold text-primary md:hidden">{mobileTitle}</h2>
        
        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex relative w-64 lg:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline-variant"
            placeholder={placeholder}
            type="text"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-sm relative">
        {/* Notification Bell */}
        <button 
          onClick={() => setNotifications(0)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all duration-200 active:scale-95 relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          {notifications > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          )}
        </button>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all duration-200 active:scale-95 overflow-hidden border border-outline-variant"
          >
            <img
              alt="Perfil de usuario"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-hcp7kd6zSfw-UmcSUj0iM7GY0ZmpD97EE891CVGf9XtSdd_1q15zRGRIrQmTsAvsH7kv2j8Uplv99QXjyp7MN-_BcNGCCTUoFWU7WMKyrWNJ-OcF4qy05z-aBXMqkvm7jyTh06io4X4yZ9bgzJU2N79wIaZQRxHFRqF4jbeTtoWqdL-HCUznSz3KB9hsnZCvjy1nfJROLrdkA2e9CX3GjQdozP6JafwOlfWNsWrV0GpZEdA3NGCCEiiGx7VAy-mR6wv-hmwyuUc"
            />
          </button>

          {isDropdownOpen && (
            <>
              {/* Overlay Backdrop to close dropdown */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)} 
              />
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2 border-b border-outline-variant">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">C. Andina</p>
                  <p className="font-body-sm text-[11px] text-on-surface-variant truncate">administrador@digitalcor.co</p>
                </div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/dashboard');
                  }}
                  className="w-full text-left px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  Mi Panel
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/inventario');
                  }}
                  className="w-full text-left px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                  Inventario
                </button>
                <div className="border-t border-outline-variant my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-body-sm text-error hover:bg-error-container transition-colors flex items-center gap-2 font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
