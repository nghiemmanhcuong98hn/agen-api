const Joi = require('joi');
const messages = require('../configs/messages');

const list = {
	query: Joi.object().keys({
		name: Joi.string(),
		char: Joi.string(),
		limit: Joi.string(),
		page: Joi.string(),
		sortBy: Joi.string()
	})
};

const create = {
	body: Joi.object().keys({
		name: Joi.string().min(5).max(50).required().messages({
			'string.min': messages.validate.min.brand_name,
			'string.max': messages.validate.max.brand_name,
			'any.required': messages.validate.required.brand_name
		}),
	})
};

const update = {
	body: Joi.object().keys({
		name: Joi.string().min(5).max(50).required().messages({
			'string.min': messages.validate.min.brand_name,
			'string.max': messages.validate.max.brand_name,
			'any.required': messages.validate.required.brand_name
		}),
	})
};

module.exports = {
	list,
	create,
	update
};
