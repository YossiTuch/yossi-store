import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().trim().min(1).required().messages({
    "string.empty": "Description is required",
  }),
  image: Joi.string().trim().min(1).required().messages({
    "string.empty": "Image is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than zero",
    "any.required": "Price is required",
  }),
  category: Joi.string().trim().min(1).required().messages({
    "string.empty": "Category is required",
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity cannot be negative",
    "any.required": "Quantity is required",
  }),
  brand: Joi.string().trim().min(1).required().messages({
    "string.empty": "Brand is required",
  }),
  countInStock: Joi.number().integer().min(0).required().messages({
    "number.base": "Count in stock must be a number",
    "number.integer": "Count in stock must be an integer",
    "number.min": "Count in stock cannot be negative",
    "any.required": "Count in stock is required",
  }),
});

const productValidation = product => {
  return productSchema.validate(product, { abortEarly: false });
};

export default productValidation;

