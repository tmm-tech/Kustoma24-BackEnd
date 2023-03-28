const Joi = require('joi');

const productSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().required(),
    category_id: Joi.number().integer().positive().required(),
    image: Joi.string().uri().required(),
    rate: Joi.number().min(0).max(5).precision(1).required(),
    count: Joi.number().integer().positive().required(),
})
const validateProductSchema = (payload) => {
    return productSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateProductSchema