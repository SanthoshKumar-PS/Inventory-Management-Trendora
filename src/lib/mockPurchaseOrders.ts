import { type PurchaseOrder } from "@/types/purchaseOrder";

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po1",
    poNumber: "PO-2024-001",
    supplierId: "sup1",
    supplierName: "Tech Supplies Inc.",
    status: "received",
    items: [
      {
        id: "poi1",
        productId: "1",
        productName: "Wireless Mouse",
        sku: "WM-001",
        quantity: 50,
        unitCost: 15.99,
        totalCost: 799.50
      },
      {
        id: "poi2",
        productId: "2",
        productName: "USB-C Cable",
        sku: "UC-002",
        quantity: 100,
        unitCost: 8.50,
        totalCost: 850.00
      }
    ],
    subtotal: 1649.50,
    tax: 164.95,
    shipping: 50.00,
    total: 1864.45,
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-25",
    receivedDate: "2024-01-24",
    notes: "Rush delivery requested",
    createdBy: "John Doe",
    updatedAt: "2024-01-24"
  },
  {
    id: "po2",
    poNumber: "PO-2024-002",
    supplierId: "sup2",
    supplierName: "Office Essentials Ltd.",
    status: "approved",
    items: [
      {
        id: "poi3",
        productId: "3",
        productName: "Mechanical Keyboard",
        sku: "MK-003",
        quantity: 30,
        unitCost: 79.99,
        totalCost: 2399.70
      }
    ],
    subtotal: 2399.70,
    tax: 239.97,
    shipping: 75.00,
    total: 2714.67,
    orderDate: "2024-01-20",
    expectedDelivery: "2024-02-05",
    notes: "",
    createdBy: "Jane Smith",
    updatedAt: "2024-01-21"
  },
  {
    id: "po3",
    poNumber: "PO-2024-003",
    supplierId: "sup1",
    supplierName: "Tech Supplies Inc.",
    status: "pending",
    items: [
      {
        id: "poi4",
        productId: "4",
        productName: "27\" Monitor",
        sku: "MON-004",
        quantity: 20,
        unitCost: 249.99,
        totalCost: 4999.80
      },
      {
        id: "poi5",
        productId: "5",
        productName: "Laptop Stand",
        sku: "LS-005",
        quantity: 25,
        unitCost: 34.99,
        totalCost: 874.75
      }
    ],
    subtotal: 5874.55,
    tax: 587.46,
    shipping: 100.00,
    total: 6562.01,
    orderDate: "2024-01-22",
    expectedDelivery: "2024-02-10",
    notes: "Waiting for supplier confirmation",
    createdBy: "John Doe",
    updatedAt: "2024-01-22"
  },
  {
    id: "po4",
    poNumber: "PO-2024-004",
    supplierId: "sup3",
    supplierName: "Gadget Wholesale Co.",
    status: "draft",
    items: [
      {
        id: "poi6",
        productId: "6",
        productName: "Webcam HD",
        sku: "WC-006",
        quantity: 15,
        unitCost: 59.99,
        totalCost: 899.85
      }
    ],
    subtotal: 899.85,
    tax: 89.99,
    shipping: 30.00,
    total: 1019.84,
    orderDate: "2024-01-25",
    notes: "Draft - review pricing",
    createdBy: "Jane Smith",
    updatedAt: "2024-01-25"
  }
];
