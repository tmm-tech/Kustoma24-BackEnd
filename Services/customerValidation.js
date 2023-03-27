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
        phone: Joi.number()
            .min(12),
        DOB: Joi.date()
            .less('12-31-2020')
            .required(),
        profile: Joi.string().uri(),
    }).with("password", "confirmpassword")
    .xor("phone", "email");

const validateCustomerSchema = (payload) => {
    return customerSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateCustomerSchema