import { mockProducts } from "@/lib/datas/mockData"
import { Package } from "lucide-react";

const StockOverview = () => {
  const getStockPercentage = (current: number, reorder: number) => {
    const max = reorder * 2;
    return (current / max) * 100;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl text:3xl font-bold">Stock Overview</h2>
        <p className="text-sm md:text-base text-gray-500/80">
          View and manage stocks at one place
        </p>
      </div>

      <div className="grid gap-4">
        {mockProducts.map(product=>{
          const percentage = getStockPercentage(product.currentStock, product.reorderLevel);
          return (
            <div key={product.id} className="bg-white p-4 space-y-4 border border-gray-300 rounded-xl shadow-sm hover:shadow-xl">
              
              <div className="flex flex-1 justify-between items-center">
                <div className="flex items-center justify-center gap-2">
                  {/* pakage, prudtcname */}
                  <div className="p-2 bg-gray-300/40 text-blue-500 rounded-md">
                    <Package size={22}/>
                  </div>
                  <div>
                    <h3 className="font-medium">Wireless Mouse</h3>
                    <p className="text-sm text-muted-foreground">SKU: Product-001</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full ${product.currentStock===0?"bg-red-500": product.currentStock<product.reorderLevel?"bg-orange-500":"bg-green-500"} text-white font-medium text-xs`}>
                  {product.currentStock===0?"OUT OF STOCK": product.currentStock<product.reorderLevel?"LOW":"GOOD"}
                </div>
              </div>

              
              <div className="space-y-2">
                {/* Current stock, pieces  */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Current stock</p>
                  <p className="text-sm font-medium">45 pieces</p>
                </div>
                {/* Progress */}
                <div className={`h-2 bg-gray-300/80 rounded-lg w-full overflow-hidden`}>
                  <div className={`bg-blue-500 h-2`} style={{width: `${Math.min(percentage,100)}%`}}>

                  </div>

                </div>
                {/* Reorder Level - Category */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Reorder Level:20</p>
                  <p className="text-sm text-muted-foreground">Category: Electronics</p>
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