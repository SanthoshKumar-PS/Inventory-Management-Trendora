export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}

export interface InventoryValueData {
  category: string;
  value: number;
}

export interface StockMovementData {
  date: string;
  inbound: number;
  outbound: number;
}

export interface TopProductData {
  name: string;
  quantity: number;
  revenue: number;
}

export const mockSalesData: SalesData[] = [
  { month: "Jan", revenue: 45000, orders: 120 },
  { month: "Feb", revenue: 52000, orders: 145 },
  { month: "Mar", revenue: 48000, orders: 132 },
  { month: "Apr", revenue: 61000, orders: 168 },
  { month: "May", revenue: 58000, orders: 155 },
  { month: "Jun", revenue: 67000, orders: 182 },
];

export const mockInventoryValueData: InventoryValueData[] = [
  { category: "Electronics", value: 125000 },
  { category: "Furniture", value: 85000 },
  { category: "Office Supplies", value: 45000 },
  { category: "Equipment", value: 95000 },
  { category: "Other", value: 35000 },
];

export const mockStockMovementData: StockMovementData[] = [
  { date: "Week 1", inbound: 450, outbound: 320 },
  { date: "Week 2", inbound: 380, outbound: 410 },
  { date: "Week 3", inbound: 520, outbound: 380 },
  { date: "Week 4", inbound: 440, outbound: 450 },
];

export const mockTopProducts: TopProductData[] = [
  { name: "Laptop Dell XPS", quantity: 45, revenue: 67500 },
  { name: "Office Chair Pro", quantity: 78, revenue: 23400 },
  { name: "Wireless Mouse", quantity: 156, revenue: 4680 },
  { name: "USB-C Hub", quantity: 124, revenue: 6200 },
  { name: "Monitor 27\"", quantity: 52, revenue: 15600 },
];
