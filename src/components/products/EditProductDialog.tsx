import type { Product } from "@/types/tableTypes"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatProductId } from "@/lib/formatProductId";
import { useState } from "react";
import { Input } from "../ui/input";

type EditProductProps ={
    product:Product | null;
    open:boolean;
    onClose: (open:boolean)=>void;
    onSubmit:(product:Product)=>void
}
const EditProductDialog = ({product, open, onClose, onSubmit}:EditProductProps) => {
    if(!product){
        return null;
    }
    const [formData, setFormData] = useState<Product>({...product})
    const handleChange = (key:string,value:any) => {
        setFormData(prev=> ({...prev,[key]:value}))
    }
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className=" max-w-4xl max-h-[90vh] overflow-y-auto ">
            <DialogHeader>
                <DialogTitle>
                    Product Details
                </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
                {/* Headers with Package, title, Badge */}
                <div className="flex justify-start items-center gap-4 ">
                    <div className="p-4 rounded-lg bg-gray-200/30">
                        <Package className="w-8 h-8 text-blue-500"/>
                    </div>
              <Input
                value={formData.name}
                onChange={e => handleChange("name", e.target.value)}
                className="text-lg font-semibold"
                placeholder="Product name"
              />
                    <StatusBadge quantityInStock={product.quantityInStock} reOrderLevel={product.reorderLevel}/>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Product Id:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">{formatProductId(product.id,3)}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Name:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">Facewash</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Category:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">Beauty</p>
                        </div>
                    </div>
                    <div className="space-y-4">

                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Quantity In Stock:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">{product.quantityInStock}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">ReOrder Value:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">{product.reorderLevel}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Unit:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">Pieces</p>
                        </div>
                    </div>
                </div>

                {/* Pricing Information */}
                <div className="border-t pt-4">
                    <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground">Discounted Price:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">{formatCurrency(product.discountedPrice)}</p>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground">Actual Price:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">{formatCurrency(product.actualPrice)}</p>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground">Active:</label>
                            <p className="text-sm md:text-lg font-medium mt-1">True</p>
                        </div>
                    </div>

                </div>

                {/* Created At, Updated At Details */}
                <div className="border-t pt-4">
                    <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground">Created At:</label>
                            <p className="text-sm md:text-md text-gray-500/90 font-medium mt-1">{new Date(product.createdAt).toLocaleString("en-IN")}</p>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium text-muted-foreground">Updated At:</label>
                            <p className="text-sm md:text-md text-gray-500/90 font-medium mt-1">{new Date(product.updatedAt).toLocaleString("en-IN")}</p>
                        </div>
                    </div>

                </div>

            </div>
        </DialogContent>

    </Dialog>

  )
}

export default EditProductDialog