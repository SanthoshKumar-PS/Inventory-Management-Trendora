import { cn } from "@/lib/utils"
import type { OrderStatus } from "@/types/order"

const OrderStatusTag = ({status}:{status:OrderStatus}) => {
    const getStatusTag = (status:OrderStatus) => {
        switch(status){
            case 'placed':
                return { label: "Order Placed", bgColor:"bg-purple-500" }
            case 'processing':
                return { label: "Processing", bgColor:"bg-blue-500" }
            case 'processed':
                return { label: "Processed", bgColor:"bg-orange-500" }
            case 'ready_to_dispatch':
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