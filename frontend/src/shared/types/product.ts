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
  price : Joi.number().required().integer().positive().max(1000).messages({
    'any.required' : "Price is required",
    'number.base' : "Price should be an integer only",
    'number.positive' : "Price should be positive",
    'number.max' : "Maximum price is 1000"
  }),
  description : Joi.string().required().min(10).max(250).messages({
    'any.required' : "Description should have at least 10 characters",
    'string.empty' : "Description should have at least 10 characters",
    'string.max' : "Description should not have more than 250 characters",
    'string.min' : "Description should have at least 10 characters",
  }),
  categoryId : Joi.number().required().messages({
    'any.required' : "Please select a category"
  }),
  images : Joi.array().required().items(Joi.string().uri()).messages({
  })
})

export {type Product, productSchema};
