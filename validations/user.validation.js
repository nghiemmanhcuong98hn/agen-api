const Joi = require('joi');
const roles = require('../configs/roles.js');
const { password } = require('./custom.validation');
const messages = require('../configs/messages');

const listUser = {
	query: Joi.object().keys({
		name: Joi.string(),
		role: Joi.string().valid(roles.admin, roles.user).messages({
			'any.only': messages.validate.format.role
		}),
		email: Joi.string(),
		limit: Joi.string(),
		page: Joi.string(),
		createdAt: Joi.date(),
		phone: Joi.string()
	})
};

const createUser = {
	body: Joi.object().keys({
		name: Joi.string().required().min(5).max(50).messages({
			'string.min': messages.validate.min.name,
			'string.max': messages.validate.max.name,
			'any.required': messages.validate.required.name
		}),
		address: Joi.string().min(0).max(255).messages({
			'string.max': messages.validate.max.address,
		}),
		email: Joi.string().required().email().messages({
			'any.required': messages.validate.required.email,
			'string.email': messages.validate.format.email
		}),
		phone: Joi.string().required().pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/).messages({
			'any.required': messages.validate.required.phone,
			'string.pattern.base': messages.validate.format.phone,
		}),
		password: Joi.string().required().custom(password).messages({
			'any.required': messages.validate.required.password
		})
	})
};

const updateUser = {
	body: Joi.object().keys({
		name: Joi.string().min(5).max(50).messages({
			'string.min': messages.validate.min.name,
			'string.max': messages.validate.max.name,
			'string.empty': messages.validate.empty.name,
		}),
		address: Joi.string().min(0).max(255).messages({
			'string.max': messages.validate.max.address,
		}),
		email: Joi.string().email().messages({
			'string.email': messages.validate.format.email,
			'string.empty': messages.validate.empty.email,
		}),
		phone: Joi.string().pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/).messages({
			'string.pattern.base': messages.validate.format.phone,
			'string.empty': messages.validate.empty.phone,
		}),
		password: Joi.string().custom(password)
	})
};

module.exports = {
	listUser,
	createUser,
	updateUser
};
