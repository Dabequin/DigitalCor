import type { Product, Order, Activity } from '../types';
import type { Client, Invoice } from '../types';

export const initialProducts: Product[] = [
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

export const initialOrders: Order[] = [
  { id: 'ORD-9082', customerName: 'Carlos Mendoza', customerInitials: 'CM', date: '24 Oct, 2023', amount: 1250000, status: 'Entregado' },
  { id: 'ORD-9083', customerName: 'Laura Restrepo', customerInitials: 'LR', date: '24 Oct, 2023', amount: 840500, status: 'Pendiente' },
  { id: 'ORD-9084', customerName: 'Distribuidora Pacífico', customerInitials: 'DP', date: '23 Oct, 2023', amount: 3400000, status: 'En Progreso' },
  { id: 'ORD-9085', customerName: 'Andrés Gómez', customerInitials: 'AG', date: '22 Oct, 2023', amount: 150000, status: 'Entregado' },
  { id: 'ORD-9086', customerName: 'Tienda El Sol', customerInitials: 'TS', date: '22 Oct, 2023', amount: 920000, status: 'Pendiente' }
];

export const initialActivities: Activity[] = [
  { id: 'act-1', type: 'sale', title: 'Venta #1042 registrada', subtitle: 'Cliente: Juan Pérez', amount: 120000, time: 'Hace 10 min' },
  { id: 'act-2', type: 'inventory', title: 'Inventario actualizado', subtitle: 'Se añadieron 50 unidades de "Café Especial"', time: 'Hace 2 horas' },
  { id: 'act-3', type: 'customer', title: 'Nuevo cliente registrado', subtitle: 'María González', time: 'Ayer' }
];

export const mockClients: Client[] = [
  { id: 'CLI-001', name: 'Carlos Mendoza', initials: 'CM', email: 'carlos.mendoza@email.co', phone: '300 456 7890', city: 'Montería', totalOrders: 12 },
  { id: 'CLI-002', name: 'Laura Restrepo', initials: 'LR', email: 'laura.restrepo@email.co', phone: '315 789 1234', city: 'Cereté', totalOrders: 8 },
  { id: 'CLI-003', name: 'Distribuidora Pacífico', initials: 'DP', email: 'contacto@pacificodist.co', phone: '310 987 6543', city: 'Lorica', totalOrders: 24 },
  { id: 'CLI-004', name: 'Andrés Gómez', initials: 'AG', email: 'andres.gomez@email.co', phone: '320 654 9870', city: 'Sahagún', totalOrders: 4 },
  { id: 'CLI-005', name: 'Tienda El Sol', initials: 'TS', email: 'tiendaelsol@email.co', phone: '312 345 6789', city: 'Planeta Rica', totalOrders: 15 }
];

export const mockInvoices: Invoice[] = [
  { id: 'FAC-7890', client: 'Carlos Mendoza', date: '24 Oct, 2023', amount: 1250000, status: 'Pagada' },
  { id: 'FAC-7891', client: 'Laura Restrepo', date: '24 Oct, 2023', amount: 840500, status: 'Pendiente' },
  { id: 'FAC-7892', client: 'Distribuidora Pacífico', date: '23 Oct, 2023', amount: 3400000, status: 'Pagada' },
  { id: 'FAC-7893', client: 'Andrés Gómez', date: '22 Oct, 2023', amount: 150000, status: 'Pagada' },
  { id: 'FAC-7894', client: 'Tienda El Sol', date: '22 Oct, 2023', amount: 920000, status: 'Vencida' }
];
