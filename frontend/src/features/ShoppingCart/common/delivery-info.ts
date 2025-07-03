import Joi from "joi";

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

export const deliverySchema = Joi.object({
  name : Joi.string().required().messages({
    'any.required' : "Receiver's name is required",
    'string.empty' : "Receiver's name is required",
  }),
  email : Joi.string().required().email({tlds: false}).messages({
    'any.required' : "Email is required",
    'string.empty' : "Email is required",
    'string.email' : "Not a valid email"
  }),
  phone: Joi.string().regex(/^\d+$/).required().min(10).messages({
    'any.required' : "Phone number is required",
    'string.empty' : "Phone number is required",
    'string.min' : "Phone number length must be at least 10",
    'string.pattern.base' : "Phone number should contain numbers only"
  }),
  address : Joi.string().required().messages({
    'any.required' : "Address is required",
    'string.empty' : "Address is required"
  }),
  billingMethod : Joi.string().required().valid("Cash on Delivery" , "Credit Card" , "Debit Card").messages({
    'any.required' : "Please select a billing method",
    'string.empty' : "Please select a billing method",
    'any.only' : "Not a valid option"
  }),
  zipcode : Joi.string().required().messages({
    'any.required' : "Zipcode is required",
    'string.empty' : "Zipcode is required"
  }),
  notes : Joi.string().max(250).min(0).messages({
    'string.max' : "Notes can't be longer than 250 characters",
  }),
  shippingService : Joi.string().required().messages({
    'any.required' : "Please choose a shipping service",
    'string.empty' : "Please choose a shipping service",
    'string.base' : "Please choose a shipping service",

  }),
  shippingSpeed : Joi.string().valid("Urgent", "Fast", "Regular").messages({
    'any.required' : "Please select a shipping speed",
    'string.empty' : "Please select a shipping speed",
    'string.base' : "Please select a shipping speed",
    'any.only' : "Please select a shipping speed"
  })
});