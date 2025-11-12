import { Package, ShoppingCart } from "lucide-react"
import SeverityBadge from "./SeverityBadge"
import { Button } from "../ui/button"
import type { Product } from "@/types/inventory"

interface ProductCardProps {
    type: 'critical' | 'warning' | 'low'
    product : Product | null; //For UI purpos, need to give actual Data
}
const ProductCard = ({type,product}:ProductCardProps) => {
  return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 md:p-5 space-y-2 md:space-y-4">
          {/* Package, Heading,badge */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200/70 p-2 rounded-lg">
                <Package size={26} />
              </div>
              <div>
                <h3 className="font-medium max-w-40 truncate">Wireless Mouse Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quibusdam et alias dolorem eius voluptatum ipsam at cum nisi enim!</h3>
                <p className="text-sm text-muted-foreground">
                  SKU: Product-001
                </p>
              </div>
            </div>
            <SeverityBadge type={type} />
          </div>

          {/* Key, Value */}
          <div className="space-y-2 font-medium">
            <div className="flex justify-between items-center">
              <p className="text-gray-500/80">Current Stock:</p>
              <p className="">{"0 pieces"}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500/80">Reorder Level:</p>
              <p className="">{"15 pieces"} pieces</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500/80">Recommended Order:</p>
              <p className="">{"40 pieces"}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500/80">Estimated Cost:</p>
              <p className="">{"$8000"}</p>
            </div>
          </div>

          {/* Create Purchase Order Button */}
          <Button className="w-full flex-1 bg-blue-500 py-5">
            <ShoppingCart size={20}/>
            <p>Create Purchase Order</p>
          </Button>
          
        </div>
  )
}

export default ProductCard