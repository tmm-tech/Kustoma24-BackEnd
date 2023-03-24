const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().messages({
        'string.email': `Invalid email format`
    }),
    passwords: Joi.string().min(6).required().messages({
        'string.empty': `Password is required`,
        'string.min': `Password should have a minimum length of {#limit}`
    }),
});

const validateloginUserSchema = (payload) => {
    return loginSchema.validateAsync(payload, { abortEarly: false })
}
module.exports = validateloginUserSchema