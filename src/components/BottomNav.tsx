import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const { pathname } = useLocation();

  const links = [
    { to: '/dashboard', label: 'Inicio', icon: 'home' },
    { to: '/ventas', label: 'Ventas', icon: 'sell' },
    { to: '/inventario', label: 'Inventario', icon: 'inventory_2' },
    { to: '/facturas', label: 'Facturas', icon: 'description' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-around items-center px-4 pb-4 pt-2 bg-surface rounded-t-xl border-t border-outline-variant shadow-[0_-4px_6px_rgba(30,64,175,0.05)]">
      {links.map((link) => {
        const isActive = pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 px-4 py-1 ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container rounded-full shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {link.icon}
            </span>
            <span className="font-label-md text-[10px] mt-0.5">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
