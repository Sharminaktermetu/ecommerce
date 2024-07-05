import Joi from "joi";

const inventorySchema = Joi.object({
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required(),
  });
  
  const variantSchema = Joi.object({
    type: Joi.string().required(),
    value: Joi.string().required(),
  });


  const joiValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    variants: Joi.array().items(variantSchema),
    inventory: inventorySchema,

  })
export default joiValidation