import joi from "joi";

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
export const schema = joi.object({
  name: joi.string().min(2).max(50).required().messages({
    "string.min": "Full name must be at least 2 characters",
    "string.max": "Full name must not exceed 50 characters",
    "any.required": "Full name is required"
  }),
  email: joi.string().pattern(/@gmail\.com$/).required().messages({
    "string.pattern.base": "Email must have @gmail.com",
    "any.required": "Email is required"
  }),
  password: joi.string().min(8).pattern(/[A-Za-z]/).pattern(/\d/).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.pattern.base": "Password must contain at least one letter and one digit",
    "any.required": "Password is required"
  }),
  avatar: joi.string().uri().optional().messages({
    "string.uri": "Avatar must be a valid URL"
  }),
  remember: joi.boolean()
}).required();
