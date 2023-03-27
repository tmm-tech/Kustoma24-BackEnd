const Joi = require('joi');

const customerSchema = Joi.object({
        fullname: Joi.string()
            .required()
            .min(5),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'kustoma24'] } }),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('^(?=. *[a-zA-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'))
            .required(),
        confirmpassword: Joi.ref("password"),
        gender: Joi.string().required(),
        confirmpassword: Joi.ref("password"),
        phonenumber: Joi.number()
            .min(12),
        loyalty_points: Joi.number()
            .min(0),
        country: Joi.string()
            .min(0),
        DOB: Joi.date()
            .required(),
        profile: Joi.string().uri(),
    }).with("password", "confirmpassword")
    .xor("phone", "email");

const validateCustomerSchema = (payload) => {
    return customerSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateCustomerSchema