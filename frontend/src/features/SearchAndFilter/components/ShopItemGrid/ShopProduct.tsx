import type {Product} from "@/shared/types/product.ts";

interface ShopProductProps {
  productData : Product
}

export function ShopProduct(props : ShopProductProps){
  return (
    <div
      key={props.productData.id}
      className={"flex flex-col rounded border border-2 w-[360px] h-[480px] p-4"}
    >
      <img
        src={props.productData.images[0]}
        alt={props.productData.slug}
        className={"rounded hover:scale-105 transition-transform duration-300 transform mb-4"}
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
}
