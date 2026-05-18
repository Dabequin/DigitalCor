import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

export const Dashboard: React.FC = () => {
  const { orders, activities } = useAppState();
  const navigate = useNavigate();

  // Dynamic Revenue Stats Calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalVentasHoy = orders.filter((o) => o.status === 'Entregado').length + 37; // dynamic base offset

  const formatCurrency = (val: number) => {
    return val.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const handleAddProduct = () => {
    // Navigate to Inventory page
    navigate('/inventario', { state: { triggerAddProduct: true } });
  };

  return (
    <div className="p-md lg:p-xl flex flex-col gap-lg max-w-container-max mx-auto w-full animate-in fade-in duration-200">
      
      {/* Welcome Header & Quick Actions */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-lg">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-xs font-bold leading-tight">
            ¡Hola, Comercializadora Andina!
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Aquí tienes el resumen de tu negocio de hoy.
          </p>
        </div>
        <div className="flex flex-wrap gap-md w-full md:w-auto">
          <button
            onClick={handleAddProduct}
            className="flex-1 md:flex-none bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 px-lg rounded-lg flex items-center justify-center gap-sm transition-all duration-200 shadow-sm min-h-[44px] font-semibold active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add_box</span>
            Añadir Producto
          </button>
          <button
            onClick={() => navigate('/ventas')}
            className="flex-1 md:flex-none bg-surface-container-lowest border border-outline hover:bg-surface-container text-on-surface font-label-md text-label-md py-3 px-lg rounded-lg flex items-center justify-center gap-sm transition-all duration-200 min-h-[44px] font-semibold active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">post_add</span>
            Ver Pedidos
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        
        {/* Ingresos Mensuales (Featured / Asymmetric) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col justify-between relative overflow-hidden card-hover-effect">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-lg relative z-10">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <span className="flex items-center gap-xs text-secondary font-label-md text-label-md bg-secondary-container px-3 py-1 rounded-full font-bold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12.5%
            </span>
          </div>
          <div className="relative z-10">
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs font-semibold uppercase tracking-wider">
              Ingresos Totales Registrados
            </p>
            <h3 className="font-headline-lg text-[32px] md:text-[38px] text-on-surface font-bold">
              {formatCurrency(totalRevenue)} <span className="text-body-md text-on-surface-variant font-normal">COP</span>
            </h3>
          </div>
        </div>

        {/* Ventas Hoy */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col justify-between card-hover-effect">
          <div className="flex justify-between items-start mb-lg">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
            <span className="flex items-center gap-xs text-secondary font-label-md text-label-md font-bold">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              8%
            </span>
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs font-semibold uppercase tracking-wider">
              Ventas Entregadas (Hoy)
            </p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">{totalVentasHoy}</h3>
          </div>
        </div>

        {/* Clientes Activos */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-[0_4px_6px_rgba(30,64,175,0.05)] flex flex-col justify-between card-hover-effect">
          <div className="flex justify-between items-start mb-lg">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
              0%
            </span>
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-xs font-semibold uppercase tracking-wider">
              Clientes Activos
            </p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">1.204</h3>
          </div>
        </div>

      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-md">
        <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Actividad Reciente</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_6px_rgba(30,64,175,0.05)] overflow-hidden">
          <div className="flex flex-col divide-y divide-surface-container-high">
            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="p-md flex items-center justify-between hover:bg-surface-container-low transition-colors duration-150"
                >
                  <div className="flex items-center gap-md">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'sale'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : activity.type === 'inventory'
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {activity.type === 'sale'
                          ? 'sell'
                          : activity.type === 'inventory'
                          ? 'inventory'
                          : 'person_add'}
                      </span>
                    </div>
                    <div>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        {activity.title}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {activity.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="font-label-md text-label-md text-on-surface font-bold">
                        {formatCurrency(activity.amount)}
                      </p>
                    )}
                    <p className="font-body-sm text-body-sm text-outline">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-xl text-center text-on-surface-variant">
                No hay actividad reciente.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
