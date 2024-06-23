const Joi = require('joi');
const messages = require('../configs/messages');

const list = {
	query: Joi.object().keys({
		title: Joi.string(),
		char: Joi.string(),
		limit: Joi.string(),
		page: Joi.string(),
		sortBy: Joi.string()
	})
};

const create = {
	body: Joi.object().keys({
		title: Joi.string().min(5).max(50).required().messages({
			'string.min': messages.validate.min.blog_title,
			'string.max': messages.validate.max.blog_title,
			'any.required': messages.validate.required.blog_title
		}),
		content: Joi.string().required().messages({
			'any.required': messages.validate.required.blog_content
		}),
		isPublic: Joi.boolean()
	})
};

const update = {
	body: Joi.object().keys({
		title: Joi.string().min(5).max(50).required().messages({
			'string.min': messages.validate.min.blog_title,
			'string.max': messages.validate.max.blog_title,
			'any.required': messages.validate.required.blog_title
		}),
		content: Joi.string().required().messages({
			'any.required': messages.validate.required.blog_content
		}),
		isPublic: Joi.boolean()
	})
};

module.exports = {
	list,
	create,
	update
};
