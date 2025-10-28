export type OrderStatus = 'placed' | 'processing' | 'processed' | 'ready_to_dispatch' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  orderDate: string;
  updatedAt: string;
  notes?: string;
}

export interface StatusHistory {
  status: OrderStatus;
  timestamp: string;
  updatedBy: string;
  notes?: string;
}
