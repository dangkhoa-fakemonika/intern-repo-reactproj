import joi from "joi";

export type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export const schema = joi.object({
  email: joi.string().pattern(/@gmail\.com$/).required().messages({
    "string.pattern.base": "Email must have @gmail.com",
    "any.required": "Email is required"
  }),
  password: joi.string().min(8).pattern(/[A-Za-z]/).pattern(/\d/).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base": "Password must contain at least one letter and one digit",
    "any.required": "Password is required"
  }),
  remember: joi.boolean()
}).required();