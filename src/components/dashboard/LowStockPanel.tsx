import { mockProducts } from "@/lib/datas/mockData";
import type { LowStockAlert } from "@/types/inventory";
import { AlertTriangle, Package } from "lucide-react";

export const LowStockPanel = () => {
  const lowStockItems: LowStockAlert[] = mockProducts
    .filter((p) => p.currentStock <= p.reorderLevel)
    .map((p) => ({
      productId: p.id,
      productName: p.name,
      sku: p.sku,
      currentStock: p.currentStock,
      reorderLevel: p.reorderLevel,
      deficit: p.reorderLevel - p.currentStock,
      status: p.currentStock === 0 ? 'critical' : p.currentStock < p.reorderLevel / 2 ? 'warning' : 'low',
    }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'warning';
      default:
        return 'secondary';
    }
  };
  return (
    <div className="w-full rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Low Stock Alerts
          </div>
          <p className="text-sm text-gray-500">Items that need restocking</p>
        </div>
        <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-700 rounded-full">
          {lowStockItems.length}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {lowStockItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gray-200">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">
                  {item.currentStock} / {item.reorderLevel}
                </p>
                <p className="text-xs text-gray-500">Current / Min</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  item.status
                )}`}
              >
                {item.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}

        {lowStockItems.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            All products are well stocked!
          </p>
        )}

        {lowStockItems.length > 0 && (
          <button className="w-full mt-4 border border-gray-300 rounded-lg py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
            View All Alerts
          </button>
        )}
      </div>
    </div>
  );
};