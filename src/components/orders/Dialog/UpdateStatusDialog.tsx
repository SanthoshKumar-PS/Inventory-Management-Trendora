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
import { getNextStatus } from "@/lib/getNextStats";

type UpdateStatusDialogProps = {
  open: boolean;
  onClose: () => void;
  order: Order;
  isUpdating: boolean;
  handleUpdateOrderStatus: () => void
};

export function UpdateStatusDialog({
  open,
  onClose,
  order,
  isUpdating,
  handleUpdateOrderStatus
}: UpdateStatusDialogProps) {
    const nextStatus = getNextStatus(order.status)
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent  className='overflow-y-auto max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <p className="text-gray-500/70 font-medium">Update the status of the order {order.orderNo}</p>
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
            
            {/* Current -> New  */}
            <div className="flex justify-between items-center bg-gray-100 rounded-xl p-3 md:p-4">
                <div className="text-center space-y-2">
                    <p className="text-gray-500/70 font-medium">Current Status</p>
                    <OrderStatusTag status={order.status}/>
                </div>
                {nextStatus && (
                    <p className="text-2xl text-gray-500/70">
                        →
                    </p>
                )}
                {nextStatus && nextStatus!==null && (
                    <div className="text-center space-y-2">
                        <p className="text-gray-500/70 font-medium">Next Status</p>
                        <OrderStatusTag status={nextStatus}/>
                    </div>
                )}

            </div>

            {/* Cancel, Confirm Update */}
            <div className="flex justify-end items-center gap-2 ">
                <Button variant='outline' size='lg' onClick={onClose}>Cancel</Button>
                <Button size='lg' 
                    disabled={isUpdating}
                    onClick={handleUpdateOrderStatus}
                >
                    {isUpdating?"Updating":"Confirm Update"}
                </Button>

            </div>

        </div>
      </DialogContent>
      <></>
    </Dialog>
  );
}
