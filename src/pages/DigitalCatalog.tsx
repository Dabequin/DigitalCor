import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import type { Product } from '../types';
import { Modal } from '../components/Modal';

export const DigitalCatalog: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppState();
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const location = useLocation();

  // Active Category Filter State
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Modals Open States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form Fields State
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Alimentos');
  const [prodPrice, setProdPrice] = useState(0);
  const [prodStock, setProdStock] = useState(0);
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [formError, setFormError] = useState('');

  // Handle cross-navigation triggers from Dashboard
  useEffect(() => {
    if (location.state && (location.state as any).triggerAddProduct) {
      setIsAddModalOpen(true);
      // Clear state so it doesn't reopen on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingProduct) {
      setProdName(editingProduct.name);
      setProdCategory(editingProduct.category);
      setProdPrice(editingProduct.price);
      setProdStock(editingProduct.stock);
      setProdImageUrl(editingProduct.imageUrl || '');
      setProdDescription(editingProduct.description || '');
      setFormError('');
    } else {
      setProdName('');
      setProdCategory('Alimentos');
      setProdPrice(0);
      setProdStock(0);
      setProdImageUrl('');
      setProdDescription('');
      setFormError('');
    }
  }, [editingProduct]);

  // Filters
  const filteredProducts = products.filter((prod) => {
    // 1. Category filter
    const matchesCategory = activeCategory === 'Todos' || prod.category === activeCategory;

    // 2. Search query filter
    const matchesSearch = searchQuery
      ? prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const categories = ['Todos', 'Alimentos', 'Artesanías', 'Ropa'];

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-[12px] border border-outline-variant/35">
          <span className="material-symbols-outlined text-[14px]">inventory_2</span>
          0 Disp.
        </span>
      );
    }
    if (stock < 5) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-[12px] font-semibold border border-error/25">
          <span className="material-symbols-outlined text-[14px]">warning</span>
          {stock} Disp.
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[12px] font-semibold border border-secondary-container/30">
        <span className="material-symbols-outlined text-[14px]">check_circle</span>
        {stock} Disp.
      </span>
    );
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!prodName.trim()) {
      setFormError('El nombre del producto es obligatorio.');
      return;
    }
    if (prodPrice <= 0) {
      setFormError('El precio debe ser un número positivo mayor a 0.');
      return;
    }
    if (prodStock < 0) {
      setFormError('El stock disponible no puede ser negativo.');
      return;
    }

    const payload = {
      name: prodName,
      category: prodCategory,
      price: prodPrice,
      stock: prodStock,
      imageUrl: prodImageUrl,
      description: prodDescription
    };

    if (editingProduct) {
      updateProduct({
        ...payload,
        id: editingProduct.id
      });
      setEditingProduct(null);
    } else {
      addProduct(payload);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="p-md lg:p-xl space-y-lg max-w-container-max mx-auto w-full pb-24 md:pb-xl animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface font-bold">
            Catálogo Digital
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Gestiona tu inventario y disponibilidad de productos.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 min-h-[44px] font-semibold"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Añadir Producto
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-sm overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap border transition-all duration-200 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-sm'
                  : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <article
              key={prod.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_rgba(30,64,175,0.05)] overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300 card-hover-effect"
            >
              {/* Image Area */}
              <div className="relative h-48 bg-surface-container-low overflow-hidden flex items-center justify-center border-b border-outline-variant/30">
                {prod.imageUrl ? (
                  <img
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={prod.imageUrl}
                  />
                ) : (
                  <span className="material-symbols-outlined text-outline text-[48px] select-none">
                    image_not_supported
                  </span>
                )}
                
                {/* Floating Action Overlays (Visible on Hover) */}
                <div className="absolute top-2 right-2 flex gap-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => setEditingProduct(prod)}
                    className="w-8 h-8 flex items-center justify-center rounded text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors"
                    title="Editar"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    onClick={() => setDeletingProductId(prod.id)}
                    className="w-8 h-8 flex items-center justify-center rounded text-on-surface-variant hover:bg-error-container hover:text-error transition-colors"
                    title="Eliminar"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-md flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-sm text-body-sm text-outline font-semibold uppercase text-[11px] tracking-wide">
                    {prod.category}
                  </span>
                  {getStockBadge(prod.stock)}
                </div>
                <h3 className="font-headline-md text-[18px] leading-tight text-on-surface font-bold mb-2 group-hover:text-primary transition-colors">
                  {prod.name}
                </h3>
                {prod.description && (
                  <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-2 mb-3">
                    {prod.description}
                  </p>
                )}
                <div className="mt-auto pt-sm flex justify-between items-center border-t border-outline-variant/40">
                  <span className="font-headline-md text-headline-md text-primary font-extrabold text-[20px]">
                    ${prod.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-xl text-center text-on-surface-variant font-medium bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl">
            No se encontraron productos en esta categoría o término.
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isAddModalOpen || editingProduct !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Editar Producto' : 'Añadir Producto al Inventario'}
      >
        <form onSubmit={handleSaveProduct} className="flex flex-col gap-md">
          {formError && (
            <div className="p-sm bg-error-container text-on-error-container rounded border border-error/20 text-body-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {formError}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Nombre del Producto</label>
            <input
              type="text"
              placeholder="Ej. Café Molido Tradicional"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Categoría</label>
            <select
              value={prodCategory}
              onChange={(e) => setProdCategory(e.target.value)}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
            >
              <option value="Alimentos">Alimentos</option>
              <option value="Artesanías">Artesanías</option>
              <option value="Ropa">Ropa</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-md">
            {/* Price */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Precio (COP)</label>
              <input
                type="number"
                placeholder="Ej. 28000"
                value={prodPrice || ''}
                onChange={(e) => setProdPrice(parseInt(e.target.value) || 0)}
                className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
              />
            </div>
            {/* Stock */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Stock Inicial</label>
              <input
                type="number"
                placeholder="Ej. 50"
                value={prodStock || ''}
                onChange={(e) => setProdStock(parseInt(e.target.value) || 0)}
                className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Enlace de Imagen (URL)</label>
            <input
              type="text"
              placeholder="Ej. https://images.unsplash.com/..."
              value={prodImageUrl}
              onChange={(e) => setProdImageUrl(e.target.value)}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface">Descripción (Opcional)</label>
            <textarea
              placeholder="Breve descripción del producto..."
              value={prodDescription}
              onChange={(e) => setProdDescription(e.target.value)}
              rows={2}
              className="w-full px-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-md mt-md">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingProduct(null);
              }}
              className="px-lg py-sm rounded-lg border border-outline text-on-surface-variant hover:bg-surface-container transition-colors min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-lg py-sm rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-semibold shadow-sm min-h-[44px] flex items-center justify-center gap-xs"
            >
              <span className="material-symbols-outlined text-[20px]">save</span>
              {editingProduct ? 'Guardar Cambios' : 'Registrar Producto'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Product Confirmation Modal */}
      <Modal
        isOpen={deletingProductId !== null}
        onClose={() => setDeletingProductId(null)}
        title="Confirmar Eliminación"
      >
        <div className="flex flex-col gap-md">
          <div className="flex items-center gap-sm text-error p-sm bg-error-container rounded border border-error/15">
            <span className="material-symbols-outlined text-[28px]">warning</span>
            <p className="font-label-md text-label-md font-bold">¡Esta acción no se puede deshacer!</p>
          </div>
          <p className="font-body-md text-on-surface-variant">
            ¿Estás seguro de que deseas eliminar este producto permanentemente de tu catálogo digital?
          </p>
          <div className="flex justify-end gap-md mt-md">
            <button
              onClick={() => setDeletingProductId(null)}
              className="px-lg py-sm rounded-lg border border-outline text-on-surface-variant hover:bg-surface-container transition-colors min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-lg py-sm rounded-lg bg-error text-on-error hover:bg-error/95 transition-colors font-bold min-h-[44px]"
            >
              Eliminar Producto
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
