import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/lib/datas/mockData";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatProductId } from "@/lib/formatProductId";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/tableTypes";
import axios from "axios";
import { Package, Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const Products = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const filterProducts: Product[] = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatus = (quantityInStock:number, reOrderLevel:number):{label:string;color:string} => {
    if(quantityInStock===0) return {'label':'Out Of Stock','color':'bg-red-500'}
    else if(quantityInStock<=reOrderLevel) return {'label':'Low Stock','color':'bg-orange-500'}
    return {'label':'In Stock','color':'bg-green-500'}
  }

  const getAllProducts = async () => {
    try{
      setLoading(true)
      const response = await axios.get(`${BACKEND_URL}/data/products`)
      console.log(response.data)
      setProducts(response.data.products)
    } catch(error:any){
      console.log("Error occured while fetching products");
      console.log(error.message);
      //Handle error
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getAllProducts();

  },[])

  if (loading) {
    return <div className="flex justify-center items-center min-h-full"><Spinner /></div>;
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
        <Input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search products..." className="pl-9"/>
        <div className="absolute left-3 inset-y-0 flex items-center">
          <Search className="w-4 h-4 text-gray-500/80"/>
        </div>
        <div onClick={()=>setSearchTerm("")} className="absolute right-3 inset-y-0 flex items-center group">
          <X className="w-4 h-4 text-gray-500/80"/>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterProducts.length>0 && filterProducts.map((product)=>{
          const statusLabelColor = getStatus(product.quantityInStock,product.reorderLevel)
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
              <h6 className="text-sm text-gray-500/80 line-clamp-2">{product.description}</h6>
            </div>

            {/* Key, Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">SKU:</p>
                <p className="font-medium">{formatProductId(product.id,3)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">Stock:</p>
                <p className="font-medium">{product.quantityInStock} pieces</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">Price:</p>
                <p className="font-medium">{formatCurrency(product.discountedPrice)}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500/80">Category:</p>
                <p className="font-medium">{product.category.name}</p>
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
