import {Products} from "@/shared/services/services.ts";
import {useMemo, useState} from "react";
import {ShopProduct} from "@/features/SearchAndFilter/components/index.tsx";
import type {Product} from "@/shared/types/product.ts";
import {useFilterContext} from "@/features/SearchAndFilter/common/contexts/FilterContext.ts";

// interface ShopItemGridProps{
//
// }

export function ShopProductGrid(){
  const [products, setProducts] = useState<Product[]>([]);
  const filter = useFilterContext();

  useMemo(() => {
    Products.getProducts(12, 0, filter).then((result) => {setProducts(result);});
  }, [filter]);

  return (
    <div className={"w-full h-screen flex-wrap flex flex-row place-items-center overflow-y-scroll content-around gap-2 py-4 justify-center"}>
      {products.length === 0 ? products.map((product) => <ShopProduct productData={product} key={product.id}/>) : <>No products available</>}
    </div>
  )
}
