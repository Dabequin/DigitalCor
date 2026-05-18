import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

interface SidebarProps {
  onNewSaleClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewSaleClick }) => {
  const { pathname } = useLocation();
  const { logout } = useAppState();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Panel Control', icon: 'dashboard' },
    { to: '/ventas', label: 'Ventas', icon: 'point_of_sale' },
    { to: '/inventario', label: 'Inventario', icon: 'inventory_2' },
    { to: '/facturas', label: 'Facturas', icon: 'receipt_long' },
    { to: '/clientes', label: 'Clientes', icon: 'group' },
  ];

  return (
    <nav className="hidden md:flex flex-col h-full py-lg px-md gap-base fixed left-0 top-0 w-[260px] bg-surface-container-low border-r border-outline-variant z-50">
      {/* Header Logo */}
      <div className="flex items-center gap-md px-md mb-lg">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
          <span className="material-symbols-outlined font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>
            storefront
          </span>
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-extrabold text-primary leading-none">DigitalCor</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Gestión Empresarial</p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNewSaleClick}
        className="w-full bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-md text-label-md py-3 rounded-lg flex items-center justify-center gap-sm mb-lg transition-all duration-200 active:scale-95 shadow-sm"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        Nueva Venta
      </button>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-sm">
        {navLinks.map((link) => {
          const isActive = pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-md px-md py-3 rounded-lg font-label-md text-label-md transition-all duration-200 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container border-l-4 border-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Footer Links */}
      <div className="flex flex-col gap-sm pt-md border-t border-outline-variant">
        <Link
          to="#"
          className="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-200 font-label-md text-label-md"
        >
          <span className="material-symbols-outlined text-[24px]">help</span>
          Ayuda
        </Link>
        <a
          href="#"
          onClick={handleLogout}
          className="flex items-center gap-md px-md py-3 rounded-lg text-error hover:bg-error-container transition-all duration-200 font-label-md text-label-md font-semibold"
        >
          <span className="material-symbols-outlined text-[24px]">logout</span>
          Cerrar Sesión
        </a>
      </div>
    </nav>
  );
};
