const Joi = require('joi');
const messages = require('../configs/messages.js');

const create = {
	body: Joi.object().keys({
		name: Joi.string().required().messages({
			'any.required': messages.validate.required.shop_name,
			'string.empty': messages.validate.empty.name
		}),
		address: Joi.string().required().messages({
			'any.required': messages.validate.required.address,
			'string.max': messages.validate.max.address
		}),
		email: Joi.string().required().email().messages({
			'string.email': messages.validate.format.email,
			'string.empty': messages.validate.empty.email,
			'any.required': messages.validate.required.email
		}),
		phone: Joi.string()
			.required()
			.pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/)
			.messages({
				'any.required': messages.validate.required.phone,
				'string.pattern.base': messages.validate.format.phone,
				'string.empty': messages.validate.empty.phone
			}),
		backupPhone: Joi.string()
			.required()
			.pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/)
			.messages({
				'any.required': messages.validate.required.phone,
				'string.pattern.base': messages.validate.format.phone,
				'string.empty': messages.validate.empty.phone
			}),
		taxCode: Joi.string(),
		googleMapUrl: Joi.string(),
		social: Joi.object({
			facebookUrl: Joi.string(),
			tiktokUrl: Joi.string(),
			youtubeUrl: Joi.string(),
			instagramUrl: Joi.string()
		})
	})
};

const update = {
	body: Joi.object().keys({
		name: Joi.string().required().messages({
			'any.required': messages.validate.required.shop_name,
			'string.empty': messages.validate.empty.name
		}),
		address: Joi.string().required().messages({
			'any.required': messages.validate.required.address,
			'string.max': messages.validate.max.address
		}),
		email: Joi.string().required().email().messages({
			'string.email': messages.validate.format.email,
			'string.empty': messages.validate.empty.email,
			'any.required': messages.validate.required.email
		}),
		phone: Joi.string()
			.required()
			.pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/)
			.messages({
				'any.required': messages.validate.required.phone,
				'string.pattern.base': messages.validate.format.phone,
				'string.empty': messages.validate.empty.phone
			}),
		backupPhone: Joi.string()
			.required()
			.pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/)
			.messages({
				'any.required': messages.validate.required.phone,
				'string.pattern.base': messages.validate.format.phone,
				'string.empty': messages.validate.empty.phone
			}),
		taxCode: Joi.string(),
		googleMapUrl: Joi.string(),
		social: Joi.object({
			facebookUrl: Joi.string(),
			tiktokUrl: Joi.string(),
			youtubeUrl: Joi.string(),
			instagramUrl: Joi.string()
		})
	})
};

module.exports = {
	update,
	create
};
