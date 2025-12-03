import { cn } from "@/lib/utils"
import type { OrderStatus } from "@/types/tableTypes"
// "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
const OrderStatusTag = ({status}:{status:OrderStatus}) => {
    const getStatusTag = (status:OrderStatus) => {
        switch(status){
            case 'PENDING':
                return { label:  "Pending", bgColor:"bg-orange-500"}
            case 'CONFIRMED':
                return { label: "Confirmed", bgColor:"bg-yellow-500" }
            case 'PROCESSING':
                return { label: "Processing", bgColor:"bg-blue-500" }
            case 'PROCESSED':
                return { label: "Processed", bgColor:"bg-indigo-500" }
            case 'SHIPPED':
                return { label: "Shipped", bgColor:"bg-purple-500" }
            case 'DELIVERED':
                return { label: "Ready To Dispatch", bgColor:"bg-green-500" }
            default:
                return { label: status, bgColor:"bg-red-500" }
        }
    }
  return (
    <div className={cn("text-white font-medium text-xs px-2 py-1 rounded-full",getStatusTag(status).bgColor)}>{getStatusTag(status).label}</div>
  )
}

export default OrderStatusTag