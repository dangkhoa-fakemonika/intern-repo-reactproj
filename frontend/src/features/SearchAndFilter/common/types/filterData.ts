import Joi from "joi";

const FilterDataSchema = Joi.object({
  categories: Joi.array().items(Joi.string().valid('clothes', 'electronics', 'furniture', 'shoes', 'others')),
  price: Joi.string().valid('low', 'medium', 'high')
});

interface FilterDataType {
  categories : 'clothes' | 'electronics'| 'furniture'| 'shoes'| 'others' [],
  price: 'low' | 'medium' | 'high' | ''
}

export {FilterDataSchema, type FilterDataType};




