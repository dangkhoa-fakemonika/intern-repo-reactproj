import {memo} from "react";
import {ShoppingCartList} from "@/features/ShoppingCart/components";

export const ShoppingCart = memo(function ShoppingCart(){

  return (
    <div className={"flex flex-col justify-center items-center w-full"}>
      <div className={"text-xl font-bold pt-4 px-8"}>Your Cart</div>
      <ShoppingCartList/>
    </div>
  )
})