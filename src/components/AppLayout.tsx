import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';
import { Modal } from './Modal';

export const AppLayout: React.FC = () => {
  const { isAuthenticated, products, createOrder, updateProduct } = useAppState();
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  // Form states for New Sale
  const [customerName, setCustomerName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [saleStatus, setSaleStatus] = useState<'Entregado' | 'Pendiente' | 'En Progreso'>('Entregado');
  const [formError, setFormError] = useState('');

  // Search state passed to child routes through React Router context
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const maxStock = selectedProduct ? selectedProduct.stock : 0;
  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('El nombre del cliente es obligatorio.');
      return;
    }
    if (!selectedProductId) {
      setFormError('Por favor selecciona un producto.');
      return;
    }
    if (quantity <= 0) {
      setFormError('La cantidad debe ser mayor a 0.');
      return;
    }
    if (quantity > maxStock) {
      setFormError(`Stock insuficiente. Solo quedan ${maxStock} unidades disponibles.`);
      return;
    }

    // Process Order
    createOrder({
      customerName: customerName,
      amount: totalPrice,
      status: saleStatus
    });

    // Update Product Stock
    if (selectedProduct) {
      updateProduct({
        ...selectedProduct,
        stock: selectedProduct.stock - quantity
      });
    }

    // Reset Form & Close Modal
    setCustomerName('');
    setSelectedProductId('');
    setQuantity(1);
    setSaleStatus('Entregado');
    setIsSaleModalOpen(false);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex antialiased">
      {/* Sidebar for Desktop */}
      <Sidebar onNewSaleClick={() => setIsSaleModalOpen(true)} />

      {/* Main Panel Column */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[260px] pb-[80px] md:pb-0">
        <TopBar
          placeholder="Buscar productos, ventas o clientes..."
          onSearch={(query) => setSearchQuery(query)}
          mobileTitle="DigitalCor"
        />

        {/* Content Outlet */}
        <main className="flex-1 w-full">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>

      {/* Bottom Nav for Mobile */}
      <BottomNav />

      {/* Global New Sale Modal */}
      <Modal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        title="Registrar Nueva Venta"
      >
        <form onSubmit={handleCreateSale} className="flex flex-col gap-md">
          {formError && (
            <div className="p-sm bg-error-container text-on-error-container rounded border border-error/20 text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {formError}
            </div>
          )}

          {/* Customer Name */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Nombre del Cliente</label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline-variant"
            />
          </div>

          {/* Product Selection */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Producto</label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setQuantity(1);
                setFormError('');
              }}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
            >
              <option value="">Selecciona un producto...</option>
              {products.map((prod) => (
                <option key={prod.id} value={prod.id} disabled={prod.stock === 0}>
                  {prod.name} ({prod.stock > 0 ? `$${prod.price.toLocaleString()} - ${prod.stock} disp.` : 'Agotado'})
                </option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="grid grid-cols-2 gap-md p-md bg-surface-container rounded-lg border border-outline-variant/50">
              <div>
                <p className="text-[11px] text-outline uppercase font-bold tracking-wider">Precio Unitario</p>
                <p className="font-headline-md text-primary font-bold">${selectedProduct.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[11px] text-outline uppercase font-bold tracking-wider">Stock Disponible</p>
                <p className={`font-headline-md font-bold ${maxStock < 5 ? 'text-error' : 'text-secondary'}`}>
                  {maxStock} uds
                </p>
              </div>
            </div>
          )}

          {/* Quantity */}
          {selectedProduct && (
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Cantidad a Vender</label>
              <input
                type="number"
                min="1"
                max={maxStock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          )}

          {/* Sale Status */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Estado del Pedido</label>
            <select
              value={saleStatus}
              onChange={(e) => setSaleStatus(e.target.value as any)}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
            >
              <option value="Entregado">Entregado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
            </select>
          </div>

          {/* Price Summary */}
          {selectedProduct && (
            <div className="border-t border-outline-variant/60 pt-md mt-sm flex justify-between items-center">
              <span className="font-label-md text-label-md text-on-surface-variant">Valor Total de la Venta</span>
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                ${totalPrice.toLocaleString()} <span className="text-body-md font-normal text-on-surface-variant">COP</span>
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-md mt-md">
            <button
              type="button"
              onClick={() => setIsSaleModalOpen(false)}
              className="px-lg py-sm rounded-lg border border-outline text-on-surface-variant hover:bg-surface-container transition-colors duration-200 min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-lg py-sm rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant transition-colors duration-200 font-semibold shadow-sm min-h-[44px] flex items-center justify-center gap-xs"
            >
              <span className="material-symbols-outlined text-[20px]">check</span>
              Guardar Venta
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
