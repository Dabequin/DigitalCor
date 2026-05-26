export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  description?: string;
}

export type OrderStatus = 'Entregado' | 'Pendiente' | 'En Progreso';

export interface Order {
  id: string;
  customerName: string;
  customerInitials?: string;
  customerAvatar?: string;
  date: string;
  amount: number;
  status: OrderStatus;
}

export interface Activity {
  id: string;
  type: 'sale' | 'inventory' | 'customer';
  title: string;
  subtitle: string;
  amount?: number;
  time: string;
}

export interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
}

export interface Invoice {
  id: string;
  client: string;
  date: string;
  amount: number;
  status: 'Pagada' | 'Vencida' | 'Pendiente';
}

export interface AppState {
  products: Product[];
  orders: Order[];
  activities: Activity[];
  isAuthenticated: boolean;
}
