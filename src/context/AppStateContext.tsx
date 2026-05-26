import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Order, Activity } from '../types';
import { initialProducts, initialOrders, initialActivities } from '../data/mockData';

interface AppContextType {
  products: Product[];
  orders: Order[];
  activities: Activity[];
  isAuthenticated: boolean;
  login: () => boolean;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dc_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dc_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('dc_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('dc_auth') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dc_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dc_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('dc_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Record activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'inventory',
      title: 'Producto añadido al catálogo',
      subtitle: `${productData.name} - Stock: ${productData.stock}`,
      time: 'Hace un momento'
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    // Record activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'inventory',
      title: 'Producto actualizado',
      subtitle: `${updatedProduct.name}`,
      time: 'Hace un momento'
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find((p) => p.id === id);
    if (!productToDelete) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));

    // Record activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'inventory',
      title: 'Producto eliminado del catálogo',
      subtitle: `${productToDelete.name}`,
      time: 'Hace un momento'
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const initials = orderData.customerName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName,
      customerInitials: initials,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: orderData.amount,
      status: orderData.status
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Record activity
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'sale',
      title: `Venta ${newOrder.id} registrada`,
      subtitle: `Cliente: ${newOrder.customerName}`,
      amount: orderData.amount,
      time: 'Hace un momento'
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        activities,
        isAuthenticated,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
