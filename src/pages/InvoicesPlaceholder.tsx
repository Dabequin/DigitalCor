import React from 'react';
import { mockInvoices } from '../data/mockData';

export const InvoicesPlaceholder: React.FC = () => {
  const getStatusBadge = (status: 'Pagada' | 'Vencida' | 'Pendiente') => {
    switch (status) {
      case 'Pagada':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-bold border border-[#CEEAD6]">
            Pagada
          </span>
        );
      case 'Pendiente':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#FEF7E0] text-[#B06000] text-xs font-bold border border-[#FEEFC3]">
            Pendiente
          </span>
        );
      case 'Vencida':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold border border-error/20">
            Vencida
          </span>
        );
    }
  };

  return (
    <div className="p-md lg:p-xl w-full max-w-[1400px] mx-auto pb-24 md:pb-xl flex flex-col gap-lg animate-in fade-in duration-200">
      <div>
        <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold">
          Gestión de Facturas
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Emisión, control e historial de cobros y facturación.
        </p>
      </div>

      {/* Cards stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm card-hover-effect">
          <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold">Facturación del Mes</p>
          <h3 className="font-headline-lg text-headline-lg text-primary font-bold mt-sm">$6.560.500</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm card-hover-effect">
          <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold">Cuentas por Cobrar</p>
          <h3 className="font-headline-lg text-headline-lg text-tertiary font-bold mt-sm">$1.760.500</h3>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm card-hover-effect">
          <p className="font-body-sm text-body-sm text-on-surface-variant font-semibold">Total Recaudado</p>
          <h3 className="font-headline-lg text-headline-lg text-secondary font-bold mt-sm">$4.800.000</h3>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_rgba(30,64,175,0.05)] overflow-hidden flex flex-col mt-md">
        <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Comprobantes Emitidos</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">N° Factura</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Cliente Receptor</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Fecha de Emisión</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-right">Monto Neto</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-center">Estado Pago</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {mockInvoices.map((inv, idx) => (
                <tr
                  key={inv.id}
                  className={`border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-150 ${
                    idx % 2 === 1 ? 'bg-surface-container-lowest' : ''
                  }`}
                >
                  <td className="p-md font-semibold text-primary">{inv.id}</td>
                  <td className="p-md font-semibold">{inv.client}</td>
                  <td className="p-md text-on-surface-variant">{inv.date}</td>
                  <td className="p-md text-right font-bold">${inv.amount.toLocaleString()}</td>
                  <td className="p-md text-center">{getStatusBadge(inv.status)}</td>
                  <td className="p-md text-center flex items-center justify-center gap-xs">
                    <button className="text-primary hover:bg-primary-container p-2 rounded-full transition-all active:scale-95" title="Imprimir PDF">
                      <span className="material-symbols-outlined text-[18px]">print</span>
                    </button>
                    <button className="text-secondary hover:bg-secondary-container p-2 rounded-full transition-all active:scale-95" title="Enviar por Email">
                      <span className="material-symbols-outlined text-[18px]">mail</span>
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
