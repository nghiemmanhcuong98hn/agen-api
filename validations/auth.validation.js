const Joi = require('joi');
const messages = require('../configs/messages');
const { password } = require('./custom.validation');

const register = {
	body: Joi.object().keys({
		name: Joi.string().required().min(5).max(50).messages({
			'string.min': messages.validate.min.name,
			'string.max': messages.validate.max.name,
			'any.required': messages.validate.required.name
		}),
		email: Joi.string().required().email().messages({
			'any.required': messages.validate.required.email,
			'string.email': messages.validate.format.email
		}),
		password: Joi.string().required().custom(password).messages({
			'any.required': messages.validate.required.password
		})
	})
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required().email().messages({
			'any.required': messages.validate.required.email,
			'string.email': messages.validate.format.email
		}),
		password: Joi.string().required().custom(password).messages({
			'any.required': messages.validate.required.password
		})
	})
};

const forgotPassword = {
	body: Joi.object().keys({
		email: Joi.string().required().email().messages({
			'any.required': messages.validate.required.email,
			'string.email': messages.validate.format.email
		})
	})
};

module.exports = {
	register,
	login,
	forgotPassword
};
