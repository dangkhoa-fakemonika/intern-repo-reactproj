import {ShopProduct} from "@/components/product-display/ShopProduct.tsx";
import {memo, useEffect, useRef, useState} from "react";
import {Products} from "@/shared/services/products.ts";
import type {Product} from "@/shared/types/product.ts";
import type {ProductFilter} from "@/shared/types/product-filter.ts";
import {useDebounce} from "@/shared/hooks/hooks.ts";

interface ShopItemGridProps{
  filters : ProductFilter
}

export const ShopProductGrid = memo(function ShopProductGrid(props: ShopItemGridProps){
  console.log("Shop renders");
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  // const filterData = useFilterContext();
  const filters = useDebounce(props.filters, 1000);
  const [limit, setLimit] = useState<number>(8);

  useEffect(() => {
    // let active = true;
    //
    // async function load() {
    //   if (!active) { return }
    //   const productResults = await Products.getProducts(props.filters);
    //   setProducts(productResults);
    // }
    //
    // load();
    // return () => { active = false };

    Products.getProducts(filters).then(r => {
      setProducts(r);
      setLimit(Math.min(limit, r.length))
      setVisibleProducts(r.slice(0, Math.min(limit, r.length)));
    });

  }, [filters, limit]);

  const productGrid = useRef<HTMLDivElement | null>(null);

  const onScrollRenderItems = () => {
    if (productGrid.current === null || products.length === 0 || limit >= products.length) return;
    const height = productGrid.current.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    if (height.bottom > windowHeight){
      console.log("hi");
      setLimit(prevState => {return Math.min(prevState + 8, products.length)});
    }
  }

  return (
    <div className={"w-full h-screen flex-wrap flex flex-row place-items-center overflow-y-scroll content-around gap-2 py-4 justify-center"} ref={productGrid} onScroll={onScrollRenderItems}>
      {visibleProducts.length !== 0 ? visibleProducts.map((product) => <ShopProduct productData={product} key={product.id}/>) : <>No products available</>}
    </div>
  )
})
