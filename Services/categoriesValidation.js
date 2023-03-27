const Joi = require('joi');

const categoriesSchema = Joi.object({
    category: Joi.string()
        .required()
        .min(5)
})
const validateCategorySchema = (payload) => {
    return categoriesSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateCategorySchema