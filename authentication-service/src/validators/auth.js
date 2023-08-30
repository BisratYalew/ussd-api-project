const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        phoneNumber: Joi.string()
            .trim()
            .min(5)
            .max(15)
            .required(),
        accountNumber: Joi.string()
            .trim()
            .min(10)
            .max(15)
            .required(),
        pin: Joi.string()
            .length(4)
            .pattern(/^[0-9]+$/)
            .required(), // Only 4 digits and numbers are accepted
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        phoneNumber: Joi.string()
            .trim()
            .min(5)
            .max(15)
            .required(),
        pin: Joi.string()
            .length(4)
            .pattern(/^[0-9]+$/)
            .required(), // Only 4 digits and numbers are accepted

    });
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin
};