const Joi = require('joi');

module.exports.userSchemaValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
})