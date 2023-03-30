const Joi = require('joi');

const saleSchema = Joi.object({
    date: Joi.date().required(),
    product_ids: Joi.array().items(Joi.number().required()).min(1).required(),
    quantities: Joi.array().items(Joi.number().integer().min(1).required()).min(1).required(),
    prices: Joi.array().items(Joi.number().precision(2).positive().required()).min(1).required(),
    customer_id: Joi.number().integer().min(1).required(),
    discount: Joi.number().precision(2).min(0).max(1),
    payment_method: Joi.string().trim().required()
});
const validateSalesSchema = (payload) => {
        return saleSchema.validateAsync(payload, { abortEarly: false })
    }
    // const validateSale = (req, res, next) => {
    //     const { error } = saleSchema.validate(req.body);
    //     if (error) {
    //         return res.status(400).json({ error: error.details[0].message });
    //     }
    //     next();
    // }

module.exports = validateSalesSchema;