import type {CartProduct} from "@/shared/types/cart-product.ts";

interface OrderedItemsProps {
  product: CartProduct
}

export function OrderedItems(props : OrderedItemsProps) {
  return (
    <div className={"w-full flex flex-row gap-2"}>
      <img src={props.product.product.images[0]} alt={props.product.product.slug} className={"aspect-square w-[80px] rounded"}/>
      <div className={"w-full flex flex-col justify-between p-2"}>
        <div>{props.product.product.title}</div>
        <div className={"w-full flex flex-row justify-between"}>
          <div className={"text-palette"}>{props.product.product.price}</div>
          <div className={"opacity-50"}>Amount : {props.product.amount}</div>
        </div>
      </div>
      <hr/>
    </div>
  )
}