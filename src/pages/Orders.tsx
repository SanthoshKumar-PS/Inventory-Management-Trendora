import OrderStatusTag from "@/components/orders/OrderStatusTag";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { mockOrders } from "@/lib/datas/mockOrders";
import type { Order, OrderStatus } from "@/types/order"
import { CircleCheck, Eye, Package2, Search } from "lucide-react";
import { useState } from "react"

const Orders = () => {
  
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all')
  const [searchParam, setSearchParam] = useState<string>("");

  const filterOrders = orders.filter(order=>{
    const search = searchParam.toLowerCase();
    const containsSearchParam = (
      order.customerName.toLowerCase().includes(search) ||
      order.status.toLowerCase().includes(search) ||
      order.customerEmail.toLowerCase().includes(search) ||
      order.orderNumber.toLowerCase().includes(search) 
    );
    const containsFilteredStatus = selectedFilter==='all' || selectedFilter===order.status;
    return containsSearchParam && containsFilteredStatus
  })


  const statusCounts= {
    'all': orders.length,
    // 'placed' : orders.filter(ord=>ord.status==='placed').length,
    'placed' : orders.reduce((count,order)=>count+(order.status==='placed'?1:0),0),
    'processing':orders.filter(ord=>ord.status==='processing').length,
    'processed':orders.filter(ord=>ord.status==='processed').length,
    'ready_to_dispatch':orders.filter(ord=>ord.status==='ready_to_dispatch').length
  }
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Heading and Subheading */}
      <div>
        <h2 className="text-2xl text:3xl font-bold">Dashboard</h2>
        <p className="text-sm md:text-base text-gray-500/80">
          View and manage stocks at one place
        </p>
      </div>

      {/* Filters Present here */}
      <div className="flex flex-wrap gap-2">
        <Button 
        variant={selectedFilter==='all'?'default':'outline'}
        onClick={()=>setSelectedFilter('all')}
        >
          All ({statusCounts.all})
        </Button>
        <Button 
        variant={selectedFilter==='placed'?'default':'outline'}
        onClick={()=>setSelectedFilter('placed')}
        >
          Placed ({statusCounts.placed})
        </Button>
        <Button 
        variant={selectedFilter==='processing'?'default':'outline'}
        onClick={()=>setSelectedFilter('processing')}
        >
          Processing ({statusCounts.processing})
        </Button>
        <Button 
        variant={selectedFilter==='processed'?'default':'outline'}
        onClick={()=>setSelectedFilter('processed')}
        >
          Processed ({statusCounts.processed})
        </Button>
        <Button 
        variant={selectedFilter==='ready_to_dispatch'?'default':'outline'}
        onClick={()=>setSelectedFilter('ready_to_dispatch')}
        >
          Ready to Dispatch ({statusCounts.ready_to_dispatch})
        </Button>


      </div>

      {/* Search bar */}
      <div className="relative flex-1">
        <Input value={searchParam} onChange={(e)=>setSearchParam(e.target.value)} placeholder="Search orders by name, email, order number..." className="pl-9"/>
        <div className="absolute left-3 inset-y-0 flex items-center">
          <Search className="w-4 h-4 text-gray-500/80"/>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {filterOrders.map(order=>(
          <div key={order.id} className="bg-white border rounded-lg p-4 space-y-4">
            {/* Order Number,Name, Email and Badge */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-medium">{order.orderNumber}</h2>
                <p className="text-sm text-muted-foreground mt-1">{order.customerName} - {order.customerEmail}</p>
              </div>
              <OrderStatusTag status={order.status}/>
            </div>

            {/* Ordered Products */}
            <div className="space-y-2">
              {order.items.map(item=>(
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <span className="font-medium">{item.productName}</span>
                    <span className="text-muted-foreground ml-2">({item.sku})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">
                      {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </span>
                    <span className="font-medium ml-4">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>

                </div>
              ))}

            </div>

            <div className="border-t border-gray-300"/>

            {/* Subtotal,Tax and Shipping */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300"/>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
              {order.notes && (
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Notes:</span> {order.notes}
                  </p>
                </div>
              )}
            
            {/* Order Date and Buttons */}
            <div className="flex flex-col md:flex-row gap-2 md:justify-between items-start md:items-center">
              <div className="text-sm text-muted-foreground">
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </div>
              <div className="flex gap-2 ">
                <Button variant='outline'>
                  <Eye size={16}/>
                  <p>View Details</p>
                </Button>
                <Button variant='outline'>
                  <CircleCheck size={16}/>
                  <p>Update Status</p>
                </Button>

              </div>

            </div>
            


          </div>
        ))}

      </div>


      {/* When Filtered Orders is null */}
      {filterOrders.length===0 && (
        <div className="bg-white/50 border border-gray-300 rounded-lg p-4 col-span-full py-10">
          <div className="flex flex-col justify-center items-center text-[#8F8F8F]">
            <Package2 className="h-10 w-10 mb-2"/>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        </div>
      )}


    </div>
  )
}

export default Orders