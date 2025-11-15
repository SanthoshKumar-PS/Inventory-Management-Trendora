import OrderStatusTag from "@/components/orders/OrderStatusTag";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { mockOrders } from "@/lib/datas/mockOrders";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatProductId } from "@/lib/formatProductId";
import type { Order, OrderStatus } from "@/types/tableTypes";
import axios from "axios";
// OrderStatus = 'placed' | 'processing' | 'processed' | 'ready_to_dispatch' | 'dispatched' | 'delivered' | 'cancelled';
import { CircleCheck, Eye, Package2, Search } from "lucide-react";
import { useEffect, useState } from "react"

const Orders = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState<boolean>(false);
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all')
  const [searchParam, setSearchParam] = useState<string>("");

  const filterOrders = orders.filter(order=>{
    const search = searchParam.toLowerCase();
    const containsSearchParam = (
      order.orderNo.toLowerCase().includes(search) ||
      order.status.toLowerCase().includes(search) ||
      order.user.email.toLowerCase().includes(search) ||
      order.address.city.toLowerCase().includes(search) 
    );
    const containsFilteredStatus = selectedFilter==='all' || selectedFilter===order.status;
    return containsSearchParam && containsFilteredStatus
  })

  const statusCounts= {
    'all': orders.length,
    'PENDING' : orders.reduce((count,order)=>count+(order.status==='PENDING'?1:0),0),
    'CONFIRMED':orders.filter(ord=>ord.status==='CONFIRMED').length,
    'PROCESSING':orders.filter(ord=>ord.status==='PROCESSING').length,
    'PROCESSED':orders.filter(ord=>ord.status==='PROCESSED').length,
    'SHIPPED':orders.filter(ord=>ord.status==='SHIPPED').length,
    'DELIVERED':orders.filter(ord=>ord.status==='DELIVERED').length,
    'CANCELLED':orders.filter(ord=>ord.status==='CANCELLED').length,
  }

  const getLowStockProducts = async () => {
    try{
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/data/orders`);
      console.log("Orders: ",response.data);
      setOrders(response.data.products)
    } catch(error:any){
      console.log("Error occured while fetching low stock products");
      console.log(error.message);
    } finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    getLowStockProducts();
  },[])

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center ">
        <Spinner/>
      </div>
    ) 
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
        // "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
        variant={selectedFilter==='CONFIRMED'?'default':'outline'}
        onClick={()=>setSelectedFilter('CONFIRMED')}
        >
          Placed ({statusCounts.CONFIRMED})
        </Button>
        <Button 
        variant={selectedFilter==='PROCESSING'?'default':'outline'}
        onClick={()=>setSelectedFilter('PROCESSING')}
        >
          Processing ({statusCounts.PROCESSING})
        </Button>
        <Button 
        variant={selectedFilter==='PROCESSED'?'default':'outline'}
        onClick={()=>setSelectedFilter('PROCESSED')}
        >
          Processed ({statusCounts.PROCESSED})
        </Button>
        <Button 
        variant={selectedFilter==='SHIPPED'?'default':'outline'}
        onClick={()=>setSelectedFilter('SHIPPED')}
        >
          Shipped ({statusCounts.SHIPPED})
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
                <h2 className="font-medium">{order.orderNo}</h2>
                <p className="text-sm text-muted-foreground mt-1">{order.user.email} - {order.user.name}</p>
              </div>
              <OrderStatusTag status={order.status}/>
            </div>

            {/* Ordered Products */}
            <div className="space-y-2">
              {order.orderDetails.map(orderDetail=>(
                <div key={orderDetail.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <span className="font-medium">{orderDetail.product.name}</span>
                    <span className="text-muted-foreground ml-2">({formatProductId(orderDetail.product.id)})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">
                      {orderDetail.quantity} × {formatCurrency(orderDetail.discountedPrice)}
                    </span>
                    <span className="font-medium ml-4">
                      {formatCurrency(orderDetail.totalPrice)}
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
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{"N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="border-t border-gray-300"/>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
              {/* {order.notes && (
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Notes:</span> {order.notes}
                  </p>
                </div>
              )} */}
            
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