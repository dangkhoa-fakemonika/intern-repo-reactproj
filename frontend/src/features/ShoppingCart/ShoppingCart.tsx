import {memo} from "react";
import {ShoppingCartList} from "@/features/ShoppingCart/components";

export const ShoppingCart = memo(function ShoppingCart(){

  return (
    <div>
      <div>Giỏ hàng của bạn</div>
      <ShoppingCartList/>
    </div>
  )
})