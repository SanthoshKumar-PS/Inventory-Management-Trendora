import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/lib/datas/mockData";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/inventory";
import { Package, Plus, Search } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filterProducts: Product[] = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (currentStock:number, reOrderValue:number):{label:string;color:string} => {
    if(currentStock===0) return {'label':'No Stock','color':'bg-red-500'}
    else if(currentStock<=reOrderValue) return {'label':'Low Stock','color':'bg-orange-500'}
    return {'label':'In Stock','color':'bg-green-500'}
  }

  return (
    <div className="space-y-4">
      {/* Products, Add Product */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div>
          <h2 className="text-2xl text:3xl font-bold">Products</h2>
          {/* Text-muted color */}
          <p className="text-sm md:text-base text-gray-500/80"> 
            View and manage products at one place
          </p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-500/70 transition-all duration-500">
          <Plus className="mr-2 h-4 w-4"/> <span>Add Product</span>
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative flex-1">
        <Input placeholder="Search products..." className="pl-9"/>
        <div className="absolute left-3 inset-y-0 flex items-center">
          <Search className="w-4 h-4 text-gray-500/80"/>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterProducts.length>0 && filterProducts.map((product,index)=>{
          const statusLabelColor = getStatus(product.currentStock,product.reorderLevel)
          return (
          <div key={product.id} className="bg-white border border-gray-300 rounded-lg p-2 md:p-5 space-y-2">
            {/* Icon and Label */}
            <div className="flex justify-between items-start">
              <Package className="w-8 h-8 text-blue-500"/>
              <p className={cn('px-2 py-1 rounded-xl font-medium text-white text-xs',statusLabelColor.color)}>{statusLabelColor.label}</p>
            </div>

            {/* Heading and Subheading */}
            <div>
              <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
              <h6 className="text-sm text-gray-500/80">{product.description}</h6>
            </div>

            {/* Key, Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">SKU:</p>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">Stock:</p>
                <p className="font-medium">{product.currentStock} pieces</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">Price:</p>
                <p className="font-medium">{product.sellingPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">Category:</p>
                <p className="font-medium">{product.category}</p>
              </div>
            </div>

            <div className="border-t w-full border-gray-300"/>

            {/* View Details and Edit */}
            <div className="gap-2 flex flex-col lg:flex-row w-full">
              <Button variant='outline' className="flex-1 border-gray-300 shadow-md">
                View Details
              </Button>
              <Button variant='outline' className="flex-1 w-full border-gray-300 shadow-md">
                Edit
              </Button>

            </div>


          </div>
        )}
        )}

        {filterProducts.length===0 && (<div className="border border-gray-300 rounded-lg p-4 col-span-full py-10">
          <div className="flex flex-col justify-center items-center text-[#8F8F8F]">
            <Package className="h-10 w-10 mb-2"/>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        </div>)}

      </div>
    </div>
  );
};

export default Products;
