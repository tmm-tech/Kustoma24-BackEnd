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
    phonenumber: Joi.number()
        .min(12),
    country: Joi.string()
        .min(0),
    DOB: Joi.date()
        .required(),
    profile: Joi.string().uri(),
}).xor("phonenumber", "email");

const validateCustomerSchema = (payload) => {
    return customerSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateCustomerSchema