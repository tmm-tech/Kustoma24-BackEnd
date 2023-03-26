const Joi = require('joi');

const registrationSchema = Joi.object({
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
    department: Joi.string().required(),
    roles: Joi.string().required(),
    profile: Joi.string().uri(),
}).xor('email');

const validateCreateUserSchema = (payload) => {
    return registrationSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateCreateUserSchema