
import type {Product} from "@/shared/types/product.ts";
import {memo} from "react";
import {useNavigate} from "react-router";

interface ShopProductProps {
  productData : Product
}

export const ShopProduct = memo(function ShopProduct(props : ShopProductProps){
  const navigate = useNavigate();

  return (
    <div
      key={props.productData.id}
      className={"flex flex-col rounded border border-2 lg:w-[360px] lg:h-[480px] w-1/2 h-[360px] lg:p-4 p-3"}
      onClick={() => navigate(`/products/${props.productData.id}`)}
    >
      <img
        src={props.productData.images[0]}
        alt={props.productData.slug}
        className={"rounded hover:scale-105 transition-transform duration-300 transform mb-4 min-w-9/12 aspect-square"}
      />
      <div className={"h-full flex flex-col justify-between"}>
        <div>
          <div className={"opacity-75"}>{props.productData.category.name}</div>
          <div>{props.productData.title}</div>
        </div>
        <div className={"flex flex-row justify-between"}>
          <div className={"text-[#f09728]"}>{props.productData.price}</div>
          <div className={"opacity-75"}>Còn hàng</div>
        </div>
      </div>
    </div>
  )
})
