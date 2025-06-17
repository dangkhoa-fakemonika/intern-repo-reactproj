import {ProductManagement} from "@/shared/services/services.ts";
import {useLayoutEffect, useState} from "react";
import {ShopProduct} from "@/features/SearchAndFilter/components";
import type {Product} from "@/shared/types/product.ts";

// interface ShopItemGridProps{
//
// }

export function ShopProductGrid(){
  const [products, setProducts] = useState<Product[]>();

  useLayoutEffect(() => {
    ProductManagement.getProducts(12, 0).then((result) => {setProducts(result.data);});
  }, []);

  return (
    <div className={"w-full h-screen flex-wrap flex flex-row place-items-center overflow-y-scroll content-around gap-2 py-4 justify-center"}>
      {products ? products.map((product) => <ShopProduct productData={product} key={product.id}/>) : <></>}
    </div>
  )
}
