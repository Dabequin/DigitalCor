import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Order, Activity } from '../types';

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

// Seed Data
const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Café Especial Tostado',
    category: 'Alimentos',
    price: 28000,
    stock: 45,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLE44Ey9d0Cf7pCBxv0wq-Mq7VcoULRINJ2SCBjg_i7eA9-miolh-brLEpDL0HfRgKbJodZGCD6gMrY_JEJue6e91AGI6L8hrqSoxAP1MJ4LFHLe2TLe0kgq0kzC7lxwTKUTLtg9T-TwpdA5Nq1-jOr7kBVabs8TwMmxHqd1kzxlCza-OJoycaXRibN5TSNQ-0HtDVBMvF5CSJthm3PKdGWZJKIN3kW-_VYSN1xNa5yEevEZ1U2Ou6NJf9hHMC-bwDM4-bUTPjBW8',
    description: 'Café especial tostado en grano o molido, procedente del departamento de Córdoba. Aroma único.'
  },
  {
    id: 'prod-2',
    name: 'Mochila Wayuu Original',
    category: 'Artesanías',
    price: 120000,
    stock: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNYB0rygVXtMKxSTd0ry_-THKxX6Z7ip7hJpFycQ2NjKSSWGnS_EHCSU2LOvEXB6GYQ2HZbBKoxja_NOdhcKLySquOLNXPEpbq_iv4EOHu9KLCBnphdCgljYYwBwC7aLaEzKuXR5dx8goSEjHsMlbzVCOhvnDQ9KETEfAdk2Smha1vT7osHdP1mo2dajnXS42GMk86zeww7YF5dTFFjv0Lf_9CDYibHg2RZdJgfoXFNjd9BLx7Y91d9Zt7z4aonPSeP-QRPYRPL7M',
    description: 'Tejido manual tradicional por artesanos Wayuu. Colores vivos y diseño exclusivo.'
  },
  {
    id: 'prod-3',
    name: 'Camiseta Básica Algodón',
    category: 'Ropa',
    price: 35000,
    stock: 120,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChvLX3h5MBdMhwDv8_nS3h_ya-hvHKR48QIsrTSPkmY98IofhmU92jTbyzXZj6jbSgkZ-f7KNeQ9UQjgGu_OqgyL5Flugul3FCUljKCVPwW0Gd1ypT_N5ipupmCLbBJAAbV-9R0NwZwWRQN8jA1gPZtRGfasw_-Cby0tHmIHcwsajBwyJL6IKIlk2vWRFR2kDqYDUO1ojuzLg4Au1t_52wfuLiUYW_aaHk9e2N_6VMwnSwsrtUtNkC-lZkihWyzx9laUuhayj0YYI',
    description: 'Camiseta básica de algodón 100% premium. Suave al tacto y duradera.'
  },
  {
    id: 'prod-4',
    name: 'Miel Pura de Abejas 500g',
    category: 'Alimentos',
    price: 18500,
    stock: 0,
    imageUrl: '',
    description: 'Miel orgánica pura extraída artesanalmente. Excelente endulzante natural.'
  }
];

const initialOrders: Order[] = [
  { id: 'ORD-9082', customerName: 'Carlos Mendoza', customerInitials: 'CM', date: '24 Oct, 2023', amount: 1250000, status: 'Entregado' },
  { id: 'ORD-9083', customerName: 'Laura Restrepo', customerInitials: 'LR', date: '24 Oct, 2023', amount: 840500, status: 'Pendiente' },
  { id: 'ORD-9084', customerName: 'Distribuidora Pacífico', customerInitials: 'DP', date: '23 Oct, 2023', amount: 3400000, status: 'En Progreso' },
  { id: 'ORD-9085', customerName: 'Andrés Gómez', customerInitials: 'AG', date: '22 Oct, 2023', amount: 150000, status: 'Entregado' },
  { id: 'ORD-9086', customerName: 'Tienda El Sol', customerInitials: 'TS', date: '22 Oct, 2023', amount: 920000, status: 'Pendiente' }
];

const initialActivities: Activity[] = [
  { id: 'act-1', type: 'sale', title: 'Venta #1042 registrada', subtitle: 'Cliente: Juan Pérez', amount: 120000, time: 'Hace 10 min' },
  { id: 'act-2', type: 'inventory', title: 'Inventario actualizado', subtitle: 'Se añadieron 50 unidades de "Café Especial"', time: 'Hace 2 horas' },
  { id: 'act-3', type: 'customer', title: 'Nuevo cliente registrado', subtitle: 'María González', time: 'Ayer' }
];

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
