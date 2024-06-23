const Joi = require('joi');
const messages = require('../configs/messages');
const { capacitiesEnum, sexEnum } = require('../configs/settings');

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
			'any.required': messages.validate.required.product_name,
			'string.empty': messages.validate.empty.product_description
		}),
		description: Joi.string().required().min(5).max(2000).messages({
			'string.min': messages.validate.min.product_description,
			'string.max': messages.validate.max.product_description,
			'any.required': messages.validate.required.product_description,
			'string.empty': messages.validate.empty.product_description
		}),
		brand: Joi.string().required().messages({
			'any.required': messages.validate.required.product_brand,
			'string.empty': messages.validate.empty.product_brand
		}),
		price: Joi.number().required().messages({
			'any.required': messages.validate.required.product_price,
			'number.base': messages.validate.format.product_price,
			'string.empty': messages.validate.empty.product_price
		}),
		capacities: Joi.alternatives()
			.try(
				Joi.array()
					.items(Joi.string().valid(...capacitiesEnum))
					.min(1)
					.messages({
						'string.empty': `${
							messages.validate.format.product_capacities
						} [${capacitiesEnum.join(', ')}].`
					})
			)
			.required()
			.messages({
				'any.only': `${messages.validate.format.product_capacities} [${capacitiesEnum.join(
					', '
				)}].`,
				'array.min': messages.validate.min.product_capacities,
				'any.required': messages.validate.required.product_capacities,
				'array.base': `${
					messages.validate.format.product_capacities
				} [${capacitiesEnum.join(', ')}].`,
				'array.includes': `${
					messages.validate.format.product_capacities
				} [${capacitiesEnum.join(', ')}].`
			}),
		flavorTone: Joi.string().required().messages({
			'any.required': messages.validate.required.product_flavor_tone,
			'string.empty': messages.validate.empty.product_flavor_tone,
			'string.base': messages.validate.format.product_flavor_tone
		}),
		topScent: Joi.string().required().messages({
			'any.required': messages.validate.required.product_top_scent,
			'string.empty': messages.validate.empty.product_top_scent,
			'string.base': messages.validate.format.product_top_scent
		}),
		middleScent: Joi.string().allow('').messages({
			'string.base': messages.validate.format.product_middle_scent
		}),
		finalScent: Joi.string().allow('').messages({
			'string.base': messages.validate.format.product_final_scent
		}),
		releaseDate: Joi.string().required().messages({
			'any.required': messages.validate.required.product_release_date,
			'string.empty': messages.validate.empty.product_release_date,
			'string.base': messages.validate.format.product_release_date
		}),
		sex: Joi.alternatives()
			.try(
				Joi.array()
					.items(Joi.string().valid(...sexEnum))
					.min(1)
					.messages({
						'string.empty': `${messages.validate.format.product_sex} [${sexEnum.join(
							', '
						)}].`
					})
			)
			.required()
			.messages({
				'any.only': `${messages.validate.format.product_sex} [${sexEnum.join(', ')}].`,
				'array.min': messages.validate.min.product_sex,
				'any.required': messages.validate.required.product_sex,
				'array.base': `${messages.validate.format.product_sex} [${sexEnum.join(', ')}].`,
				'array.includes': `${messages.validate.format.product_sex} [${sexEnum.join(', ')}].`
			}),
		age: Joi.number().min(5).max(100).required().messages({
			'any.required': messages.validate.required.product_age,
			'number.base': messages.validate.format.product_age,
			'number.min': messages.validate.format.product_age,
			'number.max': messages.validate.format.product_age
		}),
		odorRetention: Joi.object({
			form: Joi.number().required().messages({
				'number.base': messages.validate.format.product_odor_retention_form,
				'any.required': messages.validate.required.product_odor_retention_form
			}),
			to: Joi.number().required().messages({
				'number.base': messages.validate.format.product_odor_retention_to,
				'any.required': messages.validate.required.product_odor_retention_to
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.product_odor_retention,
				'any.required': messages.validate.required.product_odor_retention
			}),
		season: Joi.object({
			spring: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_spring,
				'any.required': messages.validate.required.product_season_spring,
				'number.min': messages.validate.format.product_season_spring,
				'number.max': messages.validate.format.product_season_spring
			}),
			summer: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_summer,
				'any.required': messages.validate.required.product_season_summer,
				'number.min': messages.validate.format.product_season_summer,
				'number.max': messages.validate.format.product_season_summer
			}),
			autumn: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_autumn,
				'any.required': messages.validate.required.product_season_autumn,
				'number.min': messages.validate.format.product_season_autumn,
				'number.max': messages.validate.format.product_season_autumn
			}),
			winter: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_winter,
				'any.required': messages.validate.required.product_season_winter,
				'number.min': messages.validate.format.product_season_winter,
				'number.max': messages.validate.format.product_season_winter
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.product_season,
				'any.required': messages.validate.required.product_season
			}),
		times: Joi.object({
			day: Joi.number().required().min(0).max(100).messages({
				'number.base': messages.validate.format.product_season_time_day,
				'any.required': messages.validate.required.product_season_time_day,
				'number.min': messages.validate.format.product_season_time_day,
				'number.max': messages.validate.format.product_season_time_day
			}),
			night: Joi.number().required().min(0).max(100).messages({
				'number.base': messages.validate.format.product_season_time_night,
				'any.required': messages.validate.required.product_season_time_night,
				'number.min': messages.validate.format.product_season_time_night,
				'number.max': messages.validate.format.product_season_time_night
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.product_season_time,
				'any.required': messages.validate.required.product_season_time
			}),
		popular: Joi.boolean(),
		new: Joi.boolean(),
	})
};

const update = {
	body: Joi.object().keys({
		name: Joi.string().required().min(5).max(500).messages({
			'string.min': messages.validate.min.product_name,
			'string.max': messages.validate.max.product_name,
			'any.required': messages.validate.required.product_name,
			'string.empty': messages.validate.empty.product_description
		}),
		description: Joi.string().required().min(5).max(2000).messages({
			'string.min': messages.validate.min.product_description,
			'string.max': messages.validate.max.product_description,
			'any.required': messages.validate.required.product_description,
			'string.empty': messages.validate.empty.product_description
		}),
		brand: Joi.string().required().messages({
			'any.required': messages.validate.required.product_brand,
			'string.empty': messages.validate.empty.product_brand
		}),
		price: Joi.number().required().messages({
			'any.required': messages.validate.required.product_price,
			'number.base': messages.validate.format.product_price,
			'string.empty': messages.validate.empty.product_price
		}),
		delete_image_ids: Joi.array(),
		capacities: Joi.alternatives()
			.try(
				Joi.array()
					.items(Joi.string().valid(...capacitiesEnum))
					.min(1)
					.messages({
						'string.empty': `${
							messages.validate.format.product_capacities
						} [${capacitiesEnum.join(', ')}].`
					})
			)
			.required()
			.messages({
				'any.only': `${messages.validate.format.product_capacities} [${capacitiesEnum.join(
					', '
				)}].`,
				'array.min': messages.validate.min.product_capacities,
				'any.required': messages.validate.required.product_capacities,
				'array.base': `${
					messages.validate.format.product_capacities
				} [${capacitiesEnum.join(', ')}].`,
				'array.includes': `${
					messages.validate.format.product_capacities
				} [${capacitiesEnum.join(', ')}].`
			}),
		flavorTone: Joi.string().required().messages({
			'any.required': messages.validate.required.product_flavor_tone,
			'string.empty': messages.validate.empty.product_flavor_tone,
			'string.base': messages.validate.format.product_flavor_tone
		}),
		topScent: Joi.string().required().messages({
			'any.required': messages.validate.required.product_top_scent,
			'string.empty': messages.validate.empty.product_top_scent,
			'string.base': messages.validate.format.product_top_scent
		}),
		middleScent: Joi.string().allow('').messages({
			'string.base': messages.validate.format.product_middle_scent
		}),
		finalScent: Joi.string().allow('').messages({
			'string.base': messages.validate.format.product_final_scent
		}),
		releaseDate: Joi.string().required().messages({
			'any.required': messages.validate.required.product_release_date,
			'string.empty': messages.validate.empty.product_release_date,
			'string.base': messages.validate.format.product_release_date
		}),
		sex: Joi.alternatives()
			.try(
				Joi.array()
					.items(Joi.string().valid(...sexEnum))
					.min(1)
					.messages({
						'string.empty': `${messages.validate.format.product_sex} [${sexEnum.join(
							', '
						)}].`
					})
			)
			.required()
			.messages({
				'any.only': `${messages.validate.format.product_sex} [${sexEnum.join(', ')}].`,
				'array.min': messages.validate.min.product_sex,
				'any.required': messages.validate.required.product_sex,
				'array.base': `${messages.validate.format.product_sex} [${sexEnum.join(', ')}].`,
				'array.includes': `${messages.validate.format.product_sex} [${sexEnum.join(', ')}].`
			}),
		age: Joi.number().min(5).max(100).required().messages({
			'any.required': messages.validate.required.product_age,
			'number.base': messages.validate.format.product_age,
			'number.min': messages.validate.format.product_age,
			'number.max': messages.validate.format.product_age
		}),
		odorRetention: Joi.object({
			form: Joi.number().required().messages({
				'number.base': messages.validate.format.product_odor_retention_form,
				'any.required': messages.validate.required.product_odor_retention_form
			}),
			to: Joi.number().required().messages({
				'number.base': messages.validate.format.product_odor_retention_to,
				'any.required': messages.validate.required.product_odor_retention_to
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.product_odor_retention,
				'any.required': messages.validate.required.product_odor_retention
			}),
		season: Joi.object({
			spring: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_spring,
				'any.required': messages.validate.required.product_season_spring,
				'number.min': messages.validate.format.product_season_spring,
				'number.max': messages.validate.format.product_season_spring
			}),
			summer: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_summer,
				'any.required': messages.validate.required.product_season_summer,
				'number.min': messages.validate.format.product_season_summer,
				'number.max': messages.validate.format.product_season_summer
			}),
			autumn: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_autumn,
				'any.required': messages.validate.required.product_season_autumn,
				'number.min': messages.validate.format.product_season_autumn,
				'number.max': messages.validate.format.product_season_autumn
			}),
			winter: Joi.number().min(0).max(100).required().messages({
				'number.base': messages.validate.format.product_season_winter,
				'any.required': messages.validate.required.product_season_winter,
				'number.min': messages.validate.format.product_season_winter,
				'number.max': messages.validate.format.product_season_winter
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.product_season,
				'any.required': messages.validate.required.product_season
			}),
		times: Joi.object({
			day: Joi.number().required().min(0).max(100).messages({
				'number.base': messages.validate.format.product_season_time_day,
				'any.required': messages.validate.required.product_season_time_day,
				'number.min': messages.validate.format.product_season_time_day,
				'number.max': messages.validate.format.product_season_time_day
			}),
			night: Joi.number().required().min(0).max(100).messages({
				'number.base': messages.validate.format.product_season_time_night,
				'any.required': messages.validate.required.product_season_time_night,
				'number.min': messages.validate.format.product_season_time_night,
				'number.max': messages.validate.format.product_season_time_night
			})
		})
			.required()
			.messages({
				'object.base': messages.validate.format.product_season_time,
				'any.required': messages.validate.required.product_season_time
			}),
		popular: Joi.boolean(),
		new: Joi.boolean(),
	})
};

const deleteProduct = {
	params:Joi.object().keys({
		productId: Joi.string().required()
	})
}

module.exports = {
	list,
	create,
	update,
	deleteProduct
};
