const Joi = require('joi');
const messages = require('../configs/messages.js');
const { paymentMethods, platformList } = require('../configs/settings.js');

const list = {
	query: Joi.object().keys({
		name: Joi.string(),
		email: Joi.string(),
		createdAt: Joi.date(),
		phone: Joi.string(),
		orderId: Joi.string(),
		limit: Joi.string(),
		page: Joi.string(),
		sortBy: Joi.string()
	})
};

const create = {
	body: Joi.object().keys({
		name: Joi.string().required().messages({
			'any.required': messages.validate.required.order_username
		}),
		email: Joi.string().required().email().messages({
			'any.required': messages.validate.required.email,
			'string.email': messages.validate.format.email
		}),
		phone: Joi.string()
			.required()
			.pattern(/^(0[3|5|7|8|9])+([0-9]{8,9})$/)
			.messages({
				'any.required': messages.validate.required.phone,
				'string.pattern.base': messages.validate.format.phone
			}),
		products: Joi.alternatives()
			.try(
				Joi.array()
					.min(1)
					.items(
						Joi.object({
							productId: Joi.string().required().messages({
								'any.required': messages.validate.required.order_product_id
							}),
							quantity: Joi.number().min(1).messages({
								'number.min': messages.validate.min.order_product_quantity
							})
						})
					)
			)
			.required()
			.messages({
				'any.required': messages.validate.required.order_product,
				'array.min': messages.validate.required.order_product
			}),
		address: Joi.object({
			city: Joi.string().required().messages({
				'any.required': messages.validate.required.order_address_city
			}),
			detail: Joi.string().required().messages({
				'any.required': messages.validate.required.order_address_detail
			}),
			zipCode: Joi.number().min(5).max(10).messages({
				'number.min': messages.validate.min.order_zipcode,
				'number.max': messages.validate.max.order_zipcode
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.address,
				'any.required': messages.validate.required.address
			}),
		paymentMethod: Joi.string()
			.required()
			.valid(...Object.values(paymentMethods))
			.messages({
				'any.required': messages.validate.required.order_payment_method,
				'any.only': messages.validate.format.order_payment_method
			}),
		platform: Joi.string()
			.required()
			.valid(...Object.values(platformList))
			.messages({
				'any.required': messages.validate.required.order_payment_platform,
				'any.only': messages.validate.format.order_payment_platform
			}),
		orderValue: Joi.number().required().min(0).messages({
			'number.min': messages.validate.min.order_value,
			'any.required': messages.validate.required.order_value
		}),
		isGift: Joi.boolean(),
		isPrepayment: Joi.boolean(),
		paymentUrl: Joi.string(),
		notes: Joi.string().max(255).messages({
			'string.max': messages.validate.max.order_notes
		})
	})
};

module.exports = {
	list,
	create
};
