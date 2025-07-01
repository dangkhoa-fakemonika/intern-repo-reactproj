import {ShopProduct} from "@/components/product-display/ShopProduct.tsx";
import {memo, useLayoutEffect, useRef, useState} from "react";
import {Products} from "@/shared/services/products.ts";
import type {Product} from "@/shared/types/product.ts";
import type {ProductFilter} from "@/shared/types/product-filter.ts";
import {useDebounce} from "@/shared/hooks/hooks.ts";
import LoadingComponent from "@/components/ui/LoadingComponent.tsx";

interface ShopItemGridProps{
  filters : ProductFilter
}

export const ShopProductGrid = memo(function ShopProductGrid(props: ShopItemGridProps){
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState<number>(8);

  const filters = useDebounce(props.filters, 1000);
  const limitDebounce = useDebounce(limit, 1000);

  const loadingTag = useRef<HTMLDivElement | null>(null);
  const productGrid = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
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
      // setLimit(Math.min(limitDebounce, r.length))
      setVisibleProducts(r.slice(0, Math.min(limitDebounce, r.length)));
    });

  }, [filters, limitDebounce]);


  const onScrollRenderItems = () => {
    if (loadingTag.current === null || productGrid.current === null || products.length === 0 || limit >= products.length) return;
    const loadingTagRect = loadingTag.current.getBoundingClientRect();
    const productGridRect = productGrid.current.getBoundingClientRect();

    // console.log(loadingTagRect.bottom, productGridRect.bottom);

    if (loadingTagRect.bottom < productGridRect.bottom){
      // setLimit(prevState => {return Math.min(prevState + 8, products.length)});
      const newLimit =  Math.min(limitDebounce + 8, products.length);
      console.log(newLimit);
      setLimit(newLimit);
    }
  }

  return (
    <div className={"w-full h-screen flex-wrap flex flex-row place-items-center overflow-y-scroll content-around gap-2 lg:py-4 py-2 justify-center"} ref={productGrid} onScroll={onScrollRenderItems}>
      {visibleProducts.length !== 0 ? visibleProducts.map((product) => <ShopProduct productData={product} key={product.id}/>) : <>No products available</>}
      <div className={"w-full text-center py-6"} ref={loadingTag} hidden={limitDebounce >= products.length}><LoadingComponent/></div>
    </div>
  )
})
