//Validation
const Joi = require('joi');
/**
 *Validate registration information
 * @param {object} data date to be validated
 * @returns {Joi.ValidationResult} Returns the result of the validation
 */
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    admin: Joi.boolean(),
  });
  return schema.validate(data);
};
/**
 *Validate login fields
 * @param {object} data date to be validated
 * @returns {Joi.ValidationResult} Returns the result of the validation
 */
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
