import {Cart} from "@/shared/models/cart";

export type Delivery = {
  id? : string,
  info : DeliveryInfo,
  ownerId : string
  status : "Processing" | "Packaging" | "Delivering" | "Arrived",
  cart : Cart
}

export type DeliveryInfo = {
  name : string,
  email : string,
  phone: string,
  address : string,
  billingMethod : "Cash on Delivery" | "Credit Card" | "Debit Card",
  zipcode : number,
  notes? : string,
  shippingService : string
  shippingSpeed : "Urgent" | "Fast" | "Regular"
}