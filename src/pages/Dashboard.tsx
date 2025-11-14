import StatsCard from "@/components/dashboard/StatsCard";
import { mockMetrics } from "@/lib/datas/mockData";
import { formatCurrency } from "@/lib/formatCurrency";
import { AlertTriangle, DollarSign, Factory, Package, TrendingUp } from "lucide-react";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LowStockPanel } from "@/components/dashboard/LowStockPanel";
import axios from "axios";
import { useEffect, useState } from "react";
import type { DashboardCardData } from "@/types/responseTypes";
import { Spinner } from "@/components/Spinner";

const Dashboard = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading,setLoading] = useState<boolean>(false);
  const [cardsData,setCardsData] = useState<DashboardCardData|null>(null)

  const getDashboardData = async () => {
    try{
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/dashboard`);
      console.log(response.data)
      setCardsData(response.data.cardData);
    }
    catch(error:unknown){
      if(error instanceof Error){
        console.log("Error message:", error.message)
      }
      else{
        console.error("Unknown error:", error);
      }
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getDashboardData();
  },[])

  if (loading) {
    return <div className="flex justify-center items-center min-h-full"><Spinner /></div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl text:3xl font-bold">Dashboard</h2>
        <p className="text-sm md:text-base text-gray-500/80">
          View and manage stocks at one place
        </p>
      </div>

      {/* 4 Card  */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders This Week"
          value={cardsData?.weeklyOrders??0}
          icon={Package}
          variant="default"
          trend={{value:50,isPositive:true}}
        />
        <StatsCard
          title="Weekly Revenue"
          value={formatCurrency(cardsData?.weeklyRevenue??0)}
          icon={DollarSign}
          variant="success"
        />
        <StatsCard
          title="Out Of Stock Items"
          value={cardsData?.outOfStock??0}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title="Processing Orders"
          value={cardsData?.processingOrders??0}
          icon={Factory}
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
