import React from 'react';
import { mockClients } from '../data/mockData';

export const ClientsPlaceholder: React.FC = () => {
  return (
    <div className="p-md lg:p-xl w-full max-w-[1400px] mx-auto pb-24 md:pb-xl flex flex-col gap-lg animate-in fade-in duration-200">
      <div>
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold">
          Gestión de Clientes
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Registro, historial de compras y perfiles de tus clientes locales.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm card-hover-effect">
          <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold">Total Clientes Registrados</p>
          <h3 className="font-headline-lg text-headline-lg text-primary font-bold mt-sm">1.204</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm card-hover-effect">
          <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold">Nuevos (Este Mes)</p>
          <h3 className="font-headline-lg text-headline-lg text-secondary font-bold mt-sm">+48</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm card-hover-effect">
          <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold">Promedio de Compra</p>
          <h3 className="font-headline-lg text-headline-lg text-tertiary font-bold mt-sm">$320.000</h3>
        </div>
      </div>

      {/* Clients List Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_rgba(30,64,175,0.05)] overflow-hidden flex flex-col mt-md">
        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Listado de Clientes</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Código</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Cliente</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Ubicación</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Teléfono</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-center">Compras Totales</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {mockClients.map((client, idx) => (
                <tr
                  key={client.id}
                  className={`border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-150 ${
                    idx % 2 === 1 ? 'bg-surface-container-lowest' : ''
                  }`}
                >
                  <td className="p-md font-semibold">{client.id}</td>
                  <td className="p-md">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shadow-sm">
                        {client.initials}
                      </div>
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-md text-on-surface-variant font-semibold">{client.city}, Córdoba</td>
                  <td className="p-md text-on-surface-variant font-semibold">{client.phone}</td>
                  <td className="p-md text-center font-bold">{client.totalOrders} pedidos</td>
                  <td className="p-md text-center flex items-center justify-center gap-xs">
                    <a href={`tel:${client.phone.replace(/ /g, '')}`} className="text-secondary hover:bg-secondary-container p-2 rounded-full transition-all active:scale-95" title="Llamar Cliente">
                      <span className="material-symbols-outlined text-[18px]">phone</span>
                    </a>
                    <button className="text-primary hover:bg-primary-container p-2 rounded-full transition-all active:scale-95" title="Editar Información">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
