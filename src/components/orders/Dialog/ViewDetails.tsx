import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Order } from "@/types/tableTypes"
import OrderStatusTag from "../OrderStatusTag"
import { formatCurrency } from "@/lib/formatCurrency"

type ViewDetailsDialogProps = {
    open:boolean 
    onClose:()=>void
    order:Order
}

export function ViewDetailsDialog({open,onClose, order} : ViewDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogHeader>
            <DialogTitle>
                Order Details
            </DialogTitle>
        </DialogHeader>
        <DialogContent>
            <div className="space-y-2">
                <h2 className="text-lg font-medium ">Order No: {order.orderNo}</h2>
                <div className="w-max">
                    <OrderStatusTag status={order.status}/>
                </div>

                
<div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 mt-4">
  <h3 className="text-lg font-medium mb-2">Order Details</h3>

  <div className="space-y-2">
    {order.orderDetails.map((orderDetail) => (
      <div
        key={orderDetail.id}
        className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
      >
        <div>
          <p className="font-medium text-gray-800">{orderDetail.product.name}</p>
          <p className="text-sm text-gray-500">
            Price: ₹{orderDetail.discountedPrice}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Qty: {orderDetail.quantity}</p>
          <p className="font-semibold text-gray-800">
            Total: {formatCurrency(orderDetail.totalPrice)}
          </p>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-5 pt-4 border-t border-gray-300 flex justify-between items-center">
    <h4 className="text-lg font-semibold">Grand Total:</h4>
    <p className="text-xl font-bold text-green-600">{formatCurrency(order.totalAmount)}</p>
  </div>
</div>


            </div>
        </DialogContent>
        <></>
    </Dialog>
  )
}
