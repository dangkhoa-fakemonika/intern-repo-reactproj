import joi from "joi";

export type User = {
  id : number,
  name : string,
  role : "customer" | "admin",
  email : string,
  password : string,
  avatar : string,
  description : string,
};

export const userCredentialSchema = joi.object({
  email: joi.string().pattern(/@gmail\.com$/).required().messages({
    "string.pattern.base": "Email must have @gmail.com",
    "any.required": "Email is required"
  }),
  password: joi.string().min(8).pattern(/[A-Za-z]/).pattern(/\d/).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base": "Password must contain at least one letter and one digit",
    "any.required": "Password is required"
  })
}).required();

export const userSchema = joi.object({
  role: joi.string().valid("customer", "admin").required(),
  name: joi.string().max(250).min(0).required(),

})