import { cn } from "@/lib/utils";

  const getStatus = (quantityInStock:number, reOrderLevel:number):{label:string;color:string} => {
    if(quantityInStock===0) return {'label':'Out Of Stock','color':'bg-red-500'}
    else if(quantityInStock<=reOrderLevel) return {'label':'Low Stock','color':'bg-orange-500'}
    return {'label':'In Stock','color':'bg-green-500'}
  }

  
 export const StatusBadge = ({quantityInStock, reOrderLevel}:{quantityInStock:number, reOrderLevel:number}) => {
    const {label, color} = getStatus(quantityInStock,reOrderLevel);
    return (
    <p className={cn('px-2 py-1 rounded-xl font-medium text-white text-xs whitespace-nowrap',color)}>{label}</p>
    );
  }
  
