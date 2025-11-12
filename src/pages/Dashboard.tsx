import StatsCard from "@/components/dashboard/StatsCard";
import { mockMetrics } from "@/lib/datas/mockData";
import { formatCurrency } from "@/lib/formatCurrency";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LowStockPanel } from "@/components/dashboard/LowStockPanel";

const Dashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl text:3xl font-bold">Dashboard</h2>
        <p className="text-sm md:text-base text-gray-500/80">
          View and manage stocks at one place
        </p>
      </div>

      {/* 4 Card  */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders Today"
          value={mockMetrics.totalProducts}
          icon={Package}
          variant="default"
          trend={{value:50,isPositive:true}}
        />
        <StatsCard
          title="Total Value"
          value={formatCurrency(mockMetrics.totalValue)}
          icon={DollarSign}
          variant="success"
        />
        <StatsCard
          title="Low Stock Items"
          value={mockMetrics.lowStockItems}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title="Recent Movements"
          value={mockMetrics.recentMovements}
          icon={TrendingUp}
          variant="default"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <LowStockPanel/>
        <RecentActivity/>

      </div>
    </div>
  );
};

export default Dashboard;
