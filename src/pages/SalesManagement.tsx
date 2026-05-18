import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import type { Order, OrderStatus } from '../types';
import { Modal } from '../components/Modal';

export const SalesManagement: React.FC = () => {
  const { orders } = useAppState();
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

  // Selected Order for detail Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter & Search
  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query)
    );
  });

  // Calculate dynamic stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pendiente').length;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Entregado':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-bold border border-[#CEEAD6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#137333] mr-1.5"></span>
            Entregado
          </span>
        );
      case 'Pendiente':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#FEF7E0] text-[#B06000] text-xs font-bold border border-[#FEEFC3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B06000] mr-1.5"></span>
            Pendiente
          </span>
        );
      case 'En Progreso':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] text-xs font-bold border border-[#D2E3FC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1967D2] mr-1.5"></span>
            En Progreso
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-md lg:p-xl w-full max-w-[1400px] mx-auto pb-24 md:pb-xl flex flex-col gap-lg animate-in fade-in duration-200">
      
      {/* Table Header for Mobile */}
      <h2 className="md:hidden font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-sm font-bold">
        Ventas
      </h2>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        
        {/* Sales Summary Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col gap-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Resumen de Ventas</h3>
            <select className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-label-md text-label-md text-on-surface-variant focus:ring-primary focus:border-primary">
              <option>Esta semana</option>
              <option>Este mes</option>
              <option>Este año</option>
            </select>
          </div>
          
          {/* Interactive CSS Chart */}
          <div className="flex-1 h-[250px] mt-sm flex items-end gap-sm relative">
            {/* Y Axis Labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-outline text-xs pb-6">
              <span>$5M</span>
              <span>$2.5M</span>
              <span>$0</span>
            </div>
            
            {/* Grid Lines */}
            <div className="absolute left-10 right-0 top-0 h-full flex flex-col justify-between pb-6 z-0 pointer-events-none">
              <div className="w-full border-t border-outline-variant/30"></div>
              <div className="w-full border-t border-outline-variant/30"></div>
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            
            {/* Bars */}
            <div className="flex-1 ml-10 flex justify-around items-end h-[calc(100%-24px)] z-10 gap-sm">
              <div className="w-full max-w-[40px] bg-primary-container rounded-t-sm h-[40%] hover:bg-primary transition-all group relative cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 font-bold whitespace-nowrap shadow z-20">
                  $1.2M COP
                </div>
              </div>
              <div className="w-full max-w-[40px] bg-primary-container rounded-t-sm h-[60%] hover:bg-primary transition-all group relative cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 font-bold whitespace-nowrap shadow z-20">
                  $2.1M COP
                </div>
              </div>
              <div className="w-full max-w-[40px] bg-primary-container rounded-t-sm h-[30%] hover:bg-primary transition-all group relative cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 font-bold whitespace-nowrap shadow z-20">
                  $0.8M COP
                </div>
              </div>
              <div className="w-full max-w-[40px] bg-primary rounded-t-sm h-[85%] hover:bg-surface-tint transition-all group relative cursor-pointer shadow-sm">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 font-bold whitespace-nowrap shadow z-20">
                  $4.2M COP
                </div>
              </div>
              <div className="w-full max-w-[40px] bg-primary-container rounded-t-sm h-[50%] hover:bg-primary transition-all group relative cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 font-bold whitespace-nowrap shadow z-20">
                  $1.8M COP
                </div>
              </div>
              <div className="w-full max-w-[40px] bg-primary-container rounded-t-sm h-[70%] hover:bg-primary transition-all group relative cursor-pointer">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 font-bold whitespace-nowrap shadow z-20">
                  $3.0M COP
                </div>
              </div>
            </div>
            
            {/* X Axis Labels */}
            <div className="absolute left-10 right-0 bottom-0 h-6 flex justify-around items-center text-outline text-xs border-t border-outline-variant/30 pt-1">
              <span>Lun</span>
              <span>Mar</span>
              <span>Mié</span>
              <span className="font-bold text-primary">Jue</span>
              <span>Vie</span>
              <span>Sáb</span>
            </div>
          </div>
        </div>

        {/* Stats Side Cards */}
        <div className="flex flex-col gap-lg">
          
          {/* Revenue Month */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex-1 flex flex-col justify-center relative overflow-hidden card-hover-effect">
            <div className="absolute right-0 top-0 w-24 h-24 bg-secondary-container rounded-bl-full opacity-30 z-0"></div>
            <p className="font-label-md text-label-md text-on-surface-variant relative z-10 mb-xs font-semibold uppercase tracking-wider">
              Ingresos Totales (Mes)
            </p>
            <h4 className="font-headline-xl text-headline-xl text-on-surface relative z-10 font-bold">
              {formatCurrency(totalRevenue)}
            </h4>
            <div className="flex items-center gap-xs mt-sm text-secondary relative z-10 font-semibold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="font-label-md text-label-md">+15.2% vs mes anterior</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex-1 flex flex-col justify-center relative overflow-hidden card-hover-effect">
            <div className="absolute right-0 top-0 w-24 h-24 bg-tertiary-container rounded-bl-full opacity-10 z-0"></div>
            <p className="font-label-md text-label-md text-on-surface-variant relative z-10 mb-xs font-semibold uppercase tracking-wider">
              Pedidos Pendientes
            </p>
            <h4 className="font-headline-xl text-headline-xl text-on-surface relative z-10 font-bold">
              {pendingOrdersCount}
            </h4>
            <div className="flex items-center gap-xs mt-sm text-tertiary relative z-10 font-semibold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="font-label-md text-label-md">Requieren atención</span>
            </div>
          </div>

        </div>
      </div>

      {/* Orders Table Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_rgba(30,64,175,0.05)] overflow-hidden flex flex-col mt-md">
        
        {/* Table Controls */}
        <div className="p-lg border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Historial de Pedidos</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Monitorea y despacha las compras de tus clientes.</p>
          </div>
          <div className="flex gap-sm w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-sm px-md py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors font-semibold">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filtros
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-sm px-md py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container transition-colors font-semibold">
              <span className="material-symbols-outlined text-sm">download</span>
              Exportar
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto w-full scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">ID Pedido</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Cliente</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold">Fecha</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-right">Monto</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-center">Estado</th>
                <th className="p-md font-label-md text-label-md text-on-surface-variant font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-150 ${
                      idx % 2 === 1 ? 'bg-surface-container-lowest' : ''
                    }`}
                  >
                    <td className="p-md font-semibold">{order.id}</td>
                    <td className="p-md">
                      <div className="flex items-center gap-sm">
                        {order.customerAvatar ? (
                          <img
                            alt={order.customerName}
                            className="w-8 h-8 rounded-full border border-outline-variant object-cover"
                            src={order.customerAvatar}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shadow-sm">
                            {order.customerInitials || 'CL'}
                          </div>
                        )}
                        <span className="font-semibold">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="p-md text-on-surface-variant">{order.date}</td>
                    <td className="p-md text-right font-bold">{formatCurrency(order.amount)}</td>
                    <td className="p-md text-center">{getStatusBadge(order.status)}</td>
                    <td className="p-md text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary hover:bg-primary-container hover:text-primary-container-variant p-2 rounded-full transition-all active:scale-90"
                        title="Ver detalles"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-xl text-center text-on-surface-variant">
                    No se encontraron pedidos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination footer */}
        <div className="p-md border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
            Mostrando 1-{filteredOrders.length} de {filteredOrders.length} pedidos
          </span>
          <div className="flex items-center gap-xs">
            <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold">1</button>
            <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container font-label-md text-label-md">2</button>
            <button className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container" disabled>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>

      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        title="Detalles del Pedido"
      >
        {selectedOrder && (
          <div className="flex flex-col gap-md">
            <div className="flex justify-between items-center border-b border-outline-variant pb-md">
              <div>
                <p className="text-[11px] text-outline uppercase font-bold tracking-wider">Código del Pedido</p>
                <p className="font-headline-md text-primary font-bold">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-[11px] text-outline uppercase font-bold tracking-wider mb-1">Estado de Entrega</p>
                {getStatusBadge(selectedOrder.status)}
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <p className="text-[11px] text-outline uppercase font-bold tracking-wider">Cliente</p>
              <div className="flex items-center gap-sm p-sm bg-surface-container rounded-lg border border-outline-variant/50">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                  {selectedOrder.customerInitials || 'CL'}
                </div>
                <div>
                  <p className="font-body-md text-on-surface font-semibold">{selectedOrder.customerName}</p>
                  <p className="text-[11px] text-on-surface-variant">Cliente Registrado de Córdoba</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-md mt-xs">
              <div>
                <p className="text-[11px] text-outline uppercase font-bold tracking-wider">Fecha de Registro</p>
                <p className="font-body-md text-on-surface font-semibold">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-[11px] text-outline uppercase font-bold tracking-wider">Método de Pago</p>
                <p className="font-body-md text-on-surface font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] text-secondary">payments</span>
                  Efectivo / Transferencia
                </p>
              </div>
            </div>

            <div className="border-t border-outline-variant/60 pt-md mt-sm flex justify-between items-center">
              <span className="font-label-md text-label-md text-on-surface font-bold">Total Transacción</span>
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                {formatCurrency(selectedOrder.amount)} <span className="text-body-md font-normal text-on-surface-variant">COP</span>
              </span>
            </div>

            <div className="flex justify-end gap-md mt-lg border-t border-outline-variant/60 pt-md">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-lg py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold transition-colors min-h-[44px]"
              >
                Cerrar Detalles
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
