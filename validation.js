const Joi = require('joi');

module.exports.userSchemaValidation = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
})