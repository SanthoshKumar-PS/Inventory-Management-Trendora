import StatsCard from "@/components/dashboard/StatsCard"
import { Spinner } from "@/components/Spinner"
import { formatCurrency } from "@/lib/formatCurrency"
import type { DashboardCardData } from "@/types/responseTypes"
import axios from "axios"
import { AlertTriangle, DollarSign, Factory, Package } from "lucide-react"
import { useEffect, useState } from "react"

const Reports = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [cardsData,setCardsData] = useState<DashboardCardData|null>(null)

  const getReportsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/reports`);
      console.log("Reports response: ",response.data)
      setCardsData(response.data.cardData);
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

      <div>
        Santhosh
      </div>

    </div>
  )
}

export default Reports