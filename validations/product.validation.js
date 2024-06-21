const Joi = require('joi');
const messages = require('../configs/messages');

const list = {
	query: Joi.object().keys({
		name: Joi.string(),
		limit: Joi.string(),
		page: Joi.string(),
		sortBy: Joi.string()
	})
};

const create = {
	body: Joi.object().keys({
		name: Joi.string().required().min(5).max(500).messages({
			'string.min': messages.validate.min.product_name,
			'string.max': messages.validate.max.product_name,
			'any.required': messages.validate.required.product_name
		}),
		description: Joi.string().required().min(5).max(2000).messages({
			'string.min': messages.validate.min.product_description,
			'string.max': messages.validate.max.product_description,
			'any.required': messages.validate.required.product_description
		}),
		brand: Joi.string().required().messages({
			'any.required': messages.validate.required.product_brand
		}),
	})
}

module.exports = {
	list,
};
