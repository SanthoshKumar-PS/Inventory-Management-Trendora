import { Spinner } from "@/components/Spinner";
import { mockProducts } from "@/lib/datas/mockData"
import { formatProductId } from "@/lib/formatProductId";
import type { Product } from "@/types/tableTypes";
import axios from "axios";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";

const StockOverview = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getLowStockProducts = async () => {
    try{
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/data/stockproductsoverview`);
      console.log("Overview Stock Products: ",response.data);
      setProducts(response.data.products)
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
  const getStockPercentage = (quantityInStock: number, reorderLevel: number) => {
    const max = reorderLevel * 2;
    return (quantityInStock / max) * 100;
  };

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center ">
        <Spinner/>

      </div>
    ) 
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl text:3xl font-bold">Stock Overview</h2>
        <p className="text-sm md:text-base text-gray-500/80">
          View and manage stocks at one place
        </p>
      </div>

      <div className="grid gap-4">
        {products.map(product=>{
          const percentage = getStockPercentage(product.quantityInStock, product.reorderLevel);
          return (
            <div key={product.id} className="bg-white p-4 space-y-4 border border-gray-300 rounded-xl shadow-sm hover:shadow-xl">
              
              <div className="flex flex-1 justify-between items-center">
                <div className="flex items-center justify-center gap-2">
                  {/* pakage, prudtcname */}
                  <div className="p-2 bg-gray-300/40 text-blue-500 rounded-md">
                    <Package size={22}/>
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">SKU: {formatProductId(product.id,3)}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full ${product.quantityInStock===0?"bg-red-500": product.quantityInStock<product.reorderLevel?"bg-orange-500":"bg-green-500"} text-white font-medium text-xs`}>
                  {product.quantityInStock===0?"OUT OF STOCK": product.quantityInStock<product.reorderLevel?"LOW":"GOOD"}
                </div>
              </div>

              
              <div className="space-y-2">
                {/* Current stock, pieces  */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Current stock</p>
                  <p className="text-sm font-medium">{product.quantityInStock} pieces</p>
                </div>
                {/* Progress */}
                <div className={`h-2 bg-gray-300/80 rounded-lg w-full overflow-hidden`}>
                  <div className={`bg-blue-500 h-2`} style={{width: `${Math.min(percentage,100)}%`}}>

                  </div>

                </div>
                {/* Reorder Level - Category */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Reorder Level: {product.reorderLevel}</p>
                  <p className="text-sm text-muted-foreground">Category: {product.category.name}</p>
                </div>
                <div>

                </div>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default StockOverview