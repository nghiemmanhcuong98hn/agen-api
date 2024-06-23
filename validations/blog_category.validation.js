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
		name: Joi.string().min(5).max(50).required().messages({
			'string.min': messages.validate.min.blog_category_name,
			'string.max': messages.validate.max.blog_category_name,
			'any.required': messages.validate.required.blog_category_name
		}),
	})
};

const update = {
	body: Joi.object().keys({
		name: Joi.string().min(5).max(50).required().messages({
			'string.min': messages.validate.min.blog_category_name,
			'string.max': messages.validate.max.blog_category_name,
			'any.required': messages.validate.required.blog_category_name
		}),
	})
};

module.exports = {
	list,
	create,
	update
};
