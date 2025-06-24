import {ShopProduct} from "@/components/product-display/ShopProduct.tsx";
import {memo, useEffect, useState} from "react";
import {Products} from "@/shared/services/products.ts";
import type {Product} from "@/shared/types/product.ts";
import type {ProductFilter} from "@/shared/types/product-filter.ts";
import {useDebounce} from "@/shared/hooks/hooks.ts";

interface ShopItemGridProps{
  filters : ProductFilter
}

export const ShopProductGrid = memo(function ShopProductGrid(props: ShopItemGridProps){
  const [products, setProducts] = useState<Product[]>([]);
  // const filterData = useFilterContext();
  const filters = useDebounce(props.filters, 1000);

  useEffect(() => {
    Products.getProducts(filters).then(r => setProducts(r));
  }, [filters]);

  return (
    <div className={"w-full h-screen flex-wrap flex flex-row place-items-center overflow-y-scroll content-around gap-2 py-4 justify-center"}>
      {products.length !== 0 ? products.map((product) => <ShopProduct productData={product} key={product.id}/>) : <>No products available</>}
    </div>
  )
})
