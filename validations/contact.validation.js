const Joi = require('joi');
const { password } = require('./custom.validation.js');
const messages = require('../configs/messages.js');

const list = {
	query: Joi.object().keys({
		name: Joi.string(),
		email: Joi.string(),
		phone: Joi.string(),
		createdAt: Joi.date(),
		limit: Joi.string(),
		page: Joi.string(),
		sortBy: Joi.string(),
	})
};

const create = {
	body: Joi.object().keys({
		name: Joi.string().required().messages({
			'any.required': messages.validate.required.contact_name
		}),
		email: Joi.string().required().email().messages({
			'any.required': messages.validate.required.email,
			'string.email': messages.validate.format.email
		}),
		phone: Joi.string().required().pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/).messages({
			'any.required': messages.validate.required.phone,
			'string.pattern.base': messages.validate.format.phone,
		}),
		content: Joi.string().required().max(2000).messages({
			'any.required': messages.validate.required.contact_content,
			'string.max': messages.validate.max.contact_content,
		}),
	})
};

const updateStatus = {
	body:Joi.object().keys({
		isReply:Joi.boolean().required().messages({
			'any.required': messages.validate.required.contact_is_reply
		})
	})
}

module.exports = {
	list,
	create,
	updateStatus
};
