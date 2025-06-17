import type {Category} from "@/shared/types/category.ts";

interface Product {
  id : number,
  title : string,
  slug : string,
  price : number,
  description : string,
  category : Category,
  images: string[],
  creationAt : string,
  updatedAt : string
}

export {type Product};
