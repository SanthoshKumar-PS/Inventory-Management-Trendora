import type { OrderStatus } from "@/types/tableTypes";

export const StatusFlow : OrderStatus[] = [
  'CONFIRMED',
  'PROCESSING',
  'PROCESSED',
  'SHIPPED',
  'DELIVERED',
]

export const getNextStatus =(current:OrderStatus) : OrderStatus|null => {
    const currentIndex = StatusFlow.indexOf(current);
    if(currentIndex===-1 || currentIndex === StatusFlow.length-1) return null
    return StatusFlow[currentIndex+1]
}