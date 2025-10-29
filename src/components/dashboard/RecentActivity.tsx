import { mockStockMovements, mockProducts } from '../../lib/datas/mockData';
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';

export const RecentActivity = () => {
  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in':
        return <ArrowUpCircle className="h-4 w-4 text-success" />;
      case 'out':
        return <ArrowDownCircle className="h-4 w-4 text-destructive" />;
      case 'adjustment':
        return <RefreshCw className="h-4 w-4 text-warning" />;
      default:
        return <RefreshCw className="h-4 w-4" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'in':
        return 'success';
      case 'out':
        return 'destructive';
      case 'adjustment':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
   <div className="w-full rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <p className="text-sm text-gray-500">
          Latest stock movements and adjustments
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {mockStockMovements.map((movement) => {
          const product = mockProducts.find((p) => p.id === movement.productId);
          return (
            <div
              key={movement.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3">
                {getMovementIcon(movement.type)}
                <div>
                  <p className="font-medium">{product?.name}</p>
                  <p className="text-sm text-gray-500">{movement.reason}</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {movement.type === "out" ? "-" : "+"}
                    {Math.abs(movement.quantity)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(movement.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getMovementColor(
                    movement.type
                  )}`}
                >
                  {movement.type.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}

        {mockStockMovements.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No recent stock activity found.
          </p>
        )}
      </div>
    </div>
  );
};
