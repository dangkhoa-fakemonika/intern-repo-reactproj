import {Product} from "@/shared/models/product";

export type Cart = {
  id? : string,
  cart : CartItem[]
}

export type CartItem = {
  count : number,
  product : Product
}