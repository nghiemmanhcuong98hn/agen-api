const Joi = require('joi');
const messages = require('../configs/messages.js');

const list = {
	query: Joi.object().keys({
		name: Joi.string(),
		email: Joi.string(),
		phone: Joi.string(),
		createdAt: Joi.date(),
		limit: Joi.string(),
		page: Joi.string(),
		sortBy: Joi.string()
	})
};

const create = {
	body: Joi.object().keys({
		orderId: Joi.string().required().messages({
			'any.required': messages.validate.required.invoice_order_id
		})
	})
};

module.exports = {
	list,
	create
};
