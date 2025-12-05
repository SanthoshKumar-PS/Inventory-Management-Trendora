import StatsCard from "@/components/dashboard/StatsCard"
import { DailySalesChart } from "@/components/reports/DailySalesChart"
import { ProductsRevenue } from "@/components/reports/ProductsRevenue"
import { Spinner } from "@/components/Spinner"
import { formatCurrency } from "@/lib/formatCurrency"
import type { DashboardCardData, top5ProductType } from "@/types/responseTypes"
import axios from "axios"
import { AlertTriangle, DollarSign, Factory, Package } from "lucide-react"
import { useEffect, useState } from "react"

const Reports = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [cardsData,setCardsData] = useState<DashboardCardData|null>(null);
  const [top5RevenueProducts,setTop5RevenueProducts] = useState<top5ProductType[]>([]);

  const getReportsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/reports`);
      console.log("Reports response: ",response.data)
      setCardsData(response.data.cardData);
      setTop5RevenueProducts(response.data.top5Products)
    } catch (error:any) {
      console.log("Error occured while getting reports")
      console.log(error.message)
    } finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getReportsData()
  },[])

  if (loading) {
    return <div className="flex justify-center items-center min-h-full"><Spinner /></div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl text:3xl font-bold">Reports</h2>
        <p className="text-sm md:text-base text-gray-500/80">
          View analytics and insights for inventory
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

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-4">
        <ProductsRevenue top5RevenueProducts={top5RevenueProducts}/>
        <ProductsRevenue top5RevenueProducts={top5RevenueProducts}/>
        <ProductsRevenue top5RevenueProducts={top5RevenueProducts}/>
        <DailySalesChart data={[
  { date: "2025-12-01", revenue: 1200 },
  { date: "2025-12-02", revenue: 1850 },
  { date: "2025-12-03", revenue: 950 },
  { date: "2025-12-04", revenue: 1600 },
  { date: "2025-12-05", revenue: 2100 },
  { date: "2025-12-06", revenue: 1800 },
  { date: "2025-12-07", revenue: 2000 },
  { date: "2025-12-08", revenue: 2100 },
  { date: "2025-12-09", revenue: 500 },
  { date: "2025-12-10", revenue: 700 },
  { date: "2025-12-11", revenue: 450 },
  { date: "2025-12-12", revenue: 3000 },
  { date: "2025-12-13", revenue: 1200 },
  { date: "2025-12-14", revenue: 1850 },
  { date: "2025-12-15", revenue: 950 },
  { date: "2025-12-16", revenue: 1600 },
  { date: "2025-12-17", revenue: 2100 },
  { date: "2025-12-18", revenue: 1800 },
  { date: "2025-12-19", revenue: 2000 },
]
}/>
      </div>
      <div>
        Santhosh
      </div>

    </div>
  )
}

export default Reports