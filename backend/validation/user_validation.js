const Joi = require("@hapi/joi");

//USER REGISTER VALIDATION

const user_register_validation = (data) => {
    const schema = {
        name: Joi.string()
            .required(),
        contact: Joi.number()
            .required(),
        email: Joi.string()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(8)
            .required()
    };
    return Joi.validate(data, schema)
}

//USER LOGIN VALIDATION
const user_login_validation = (data) => {
    const schema = {
        email: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    };
    return Joi.validate(data, schema);
}

module.exports.user_register_validation = user_register_validation;

module.exports.user_login_validation = user_login_validation;
