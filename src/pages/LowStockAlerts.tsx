import SeverityBadge from "@/components/lowStock/SeverityBadge";
import StockSection from "@/components/lowStock/StockSection";
import { Spinner } from "@/components/Spinner";
import type { Product } from "@/types/tableTypes";
import axios from "axios";
import { Package, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

const LowStockAlerts = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const scrollToContainer = (tagName: string) => {
    const el = document.getElementById(tagName);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80; 
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getLowStockProducts = async () => {
    try{
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/data/lowstockproducts`);
      console.log("Low Stock Products: ",response.data);
      setProducts(response.data.products)
    } catch(error:any){
      console.log("Error occured while fetching low stock products");
      console.log(error.message);
    } finally{
      setLoading(false);
    }
  }

  const crtiticalProducts = products.filter(
    p => p.quantityInStock===0
  )
  const 

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
    <div className="space-y-6">
      {/* No products in this status */}
      {/* <div className="flex flex-col items-center justify-center text-center space-y-2 py-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <Package size={40} className="text-gray-400 " />
        <p className="text-gray-500 text-sm md:text-base">
          No products in this category right now.
        </p>
      </div> */}
      
      {/* Headers */}
      <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center gap-4">
        <div>
          <div className="flex gap-2">
            <TriangleAlert size={30} className="text-orange-400" />
            <h2 className="text-2xl text:3xl font-bold">Low Stock Alerts</h2>
          </div>
          <p className="text-sm md:text-base text-gray-500/80">
            Products that need immediate attention
          </p>
        </div>

        {/* Critical, Warning Low */}
        <div className="flex items-center gap-2">
          <SeverityBadge type="critical" count={20} scrollToContainer={scrollToContainer} />
          <SeverityBadge type="warning" count={10} scrollToContainer={scrollToContainer} />
          <SeverityBadge type="low" count={5} scrollToContainer={scrollToContainer}/>
        </div>
      </div>

      {/* Critical Out of Stock */}
      <StockSection 
        id="critical" 
        title="Critical - Out of Stock" 
        color='text-red-500' 
        type='critical' 
        products={[]}
        />

      {/* Warning - Very Low Stock */}
      <StockSection 
        id="warning" 
        title="Warning - Very Low Stock" 
        color='text-orange-500' 
        type='warning' 
        products={[]}
        />

      {/* Low Stock */}
      <StockSection 
        id="low" 
        title="Low Stock" 
        color='text-gray-600' 
        type='low' 
        products={[]}
        />

    </div>
  );
};

export default LowStockAlerts;
