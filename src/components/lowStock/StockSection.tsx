import type { Product } from "@/types/tableTypes";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface StockSectionProps {
    id:string;
    title:string;
    color:string;
    type: 'critical' |'warning' | 'low';
    products:Product[] | [];//Temporary for UI, must provide data
    handleUpdateProduct : (product :Product) => void
}
const StockSection = ({id,title,color,type,products, handleUpdateProduct}:StockSectionProps) => {
  return (
      <div id={id} className="space-y-3" >
        <h1 className={cn('text-xl font-medium',color)}>
          {title}
        </h1>
        {/* Each product */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
        {products.length>0 && products.map((product,i)=>(
          <ProductCard key={i} type={type} product={product} handleUpdateProduct={handleUpdateProduct}/>
        ))}
        {products.length===0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center space-y-2 py-10 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <Package size={40} className="text-gray-400 " />
            <p className="text-gray-500 text-sm md:text-base">
              No products in this category right now.
            </p>
          </div> 
        )}
        </div>

      </div>
  )
}

export default StockSection