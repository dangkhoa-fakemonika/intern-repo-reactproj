import Joi from "joi";

export type DeliveryInfo = {
  name : string,
  email : string,
  phone: string,
  address : string,
  billingMethod : "Cash on Delivery" | "Credit Card" | "Debit Card",
  zipcode : number
}

export const deliverySchema = Joi.object({
  name : Joi.string().required().prefs({
    messages : {
      'any.required' : "Name is required",
    }
  }),
  email : Joi.string().required().email({tlds: false}).prefs({
    messages : {
      'any.required' : "Email is required",
      'string.email' : "Not a valid email"
    }
  }),
  phone: Joi.string().regex(/^\d+$/).required().min(10).prefs({
    messages : {
      'any.required' : "Phone number is required",
      'string.min' : "Phone number length must be at least 10",
      'string.regex' : "Phone number should contain numbers only"
    }
  }),
  address : Joi.string().required().prefs({
    messages : {
      'any.required' : "Address is required"
    }
  }),
  billingMethod : Joi.string().required().valid("Cash on Delivery" , "Credit Card" , "Debit Card").prefs({
    messages : {
      'any.required' : "Please select a billing method",

    }
  }),
  zipcode : Joi.number().positive()
});