import type { Product } from "@/types/inventory";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface StockSectionProps {
    id:string;
    title:string;
    color:string;
    type: 'critical' |'warning' | 'low';
    products:Product[] | [];//Temporary for UI, must provide data
}
const StockSection = ({id,title,color,type,products}:StockSectionProps) => {
  return (
      <div id={id} className="space-y-3" >
        <h1 className={cn('text-xl font-medium',color)}>
          {title}
        </h1>
        {/* Each product */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
        {Array.from({length:4}).map((_,i)=>(
          <ProductCard key={i} type={type} product={null}/>

        ))}
        </div>

      </div>
  )
}

export default StockSection