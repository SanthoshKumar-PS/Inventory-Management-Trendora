import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Order } from "@/types/tableTypes";
import OrderStatusTag from "../OrderStatusTag";
import { formatCurrency } from "@/lib/formatCurrency";
import { BookOpen, CardSim, MapPin, Package, Package2 } from "lucide-react";
import { formatProductId } from "@/lib/formatProductId";

type ViewDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  order: Order;
};

export function ViewDetailsDialog({
  open,
  onClose,
  order,
}: ViewDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent  className='overflow-y-auto max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <p className="text-gray-500/70 font-medium">Complete information for order {order.orderNo}</p>
        </DialogHeader>
        <div className="space-y-4">
            {/* Order Number */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500/70 font-medium">Order Number</p>
                    <h2 className="text-lg font-medium ">{order.orderNo}</h2>
                </div>
                <OrderStatusTag status={order.status} />
            </div>

            <div className="border-t w-full bg-gray-300"/>
            
            {/* Customer Information */}
            <div>
                <h2 className="flex items-center gap-2">
                    <Package className="w-5 h-5"/>
                    <p className="font-medium text-lg">Customer Information</p>
                </h2>
                <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500/70 font-medium">Name: </p>
                        <p className="font-medium">{order.user.name}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500/70 font-medium">Email: </p>
                        <p className="font-medium">{order.user.email}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500/70 font-medium">Phone: </p>
                        <p className="font-medium">{order.user.phone}</p>
                    </div>
                </div>


            </div>

            <div className="border-t w-full bg-gray-300"/>

            {/* Delivery Address */}
            <div>
                <h2 className="flex items-center gap-2">
                    <MapPin className="w-5 h-5"/>
                    <p className="font-medium text-lg">Delivery Address</p>
                </h2>
                <div className="space-y-1 mt-2 rounded-xl bg-gray-100 p-3">
                    <p className="font-medium">{order.user.name}</p>
                    <p>{order.address.line1}</p>
                    <p>{order.address.line2}</p>
                    <p>{order.address.city}</p>
                    <p>{order.address.state} - {order.address.pincode}</p>
                    
                </div>


            </div>

            <div className="border-t w-full bg-gray-300"/>

            {/* Order Items */}
            <div>
                <h2 className="flex items-center gap-2">
                    <Package2 className="w-5 h-5"/>
                    <p className="font-medium text-lg">Order Items</p>
                </h2>
                <div className="space-y-2 mt-3 ">
                    {order.orderDetails.map((orderDetail,index)=>(
                        <div key={index} className="p-3 rounded-xl bg-gray-100 flex items-start justify-between">
                            <div>
                                <p className="font-medium">{orderDetail.product.name}</p>
                                <p className="text-gray-500/70 text-sm">SKU: {formatProductId(orderDetail.product.id,3)}</p>
                                <p className="space-x-1 ">
                                    <span className="line-through text-gray-500/70 ">{formatCurrency(orderDetail.actualPrice)}</span>
                                    <span className="font-medium">{formatCurrency(orderDetail.discountedPrice)}</span>
                                    <span className="font-medium">x</span>
                                    <span className="font-medium">{orderDetail.quantity}</span>
                                </p>

                            </div>
                            <p className="font-medium">{formatCurrency(orderDetail.totalPrice)}</p>
                        </div>
                    ))}

                    
                </div>


            </div>

            <div className="border-t w-full bg-gray-300"/>

            {/* Order Summary */}
            <div>
                <h2 className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5"/>
                    <p className="font-medium text-lg">Order Summary</p>
                </h2>
                <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500/70 font-medium">Subtotal:</p>
                        <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500/70 font-medium">Delivery Charges: </p>
                        <p className="font-medium">{formatCurrency(0)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500/70 font-medium">Total Amount: </p>
                        <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                    </div>
                </div>


            </div>

            <div className="border-t w-full bg-gray-300"/>
            
            <div className="text-gray-500/70 font-medium text-sm">
                <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                <p>Order Date: {new Date(order.updatedAt).toLocaleString()}</p>
            </div>

        </div>
      </DialogContent>
      <></>
    </Dialog>
  );
}
