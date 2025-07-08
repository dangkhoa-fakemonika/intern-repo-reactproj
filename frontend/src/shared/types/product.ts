import type {Category} from "@/shared/types/category.ts";
import Joi from "joi";

type Product = {
  id : number,
  title : string,
  slug : string,
  price : number,
  description : string,
  category : Category,
  images: string[],
  creationAt : string,
  updatedAt : string,
  categoryId? : number
}


const productSchema = Joi.object({
  title : Joi.string().required().messages({
    'any.required' : "Title is required",
    'string.empty' : "Title is required"
  }),
  price : Joi.number().required().integer().positive().max(100).messages({
    'any.required' : "Price is required",
    'number.base' : "Price should be an integer only",
    'number.positive' : "Price should be positive",
  }),
  description : Joi.string().optional().max(250).messages({
    'string.max' : "Description should not have more than 250 characters"
  }),
  categoryId : Joi.number().required().messages({
    'any.required' : "Please select a category"
  }),
  images : Joi.array().required().items(Joi.string().uri()).messages({
  })
})

export {type Product, productSchema};
