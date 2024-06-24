const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const messages = require('../configs/messages');
const { mongooseDeleteOptions, capacitiesEnum, sexEnum } = require('../configs/settings');

mongoose.plugin(slug);

const ProductSchema = mongoose.Schema(
	{
		name: {
			type: String,
			min: 5,
			max: 500,
			required: true,
			trim: true
		},
		description: {
			type: String,
			min: 5,
			max: 2000,
			required: true,
			trim: true
		},
		brand: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Brand'
		},
		image: {
			type: String,
			required: true
		},
		images: {
			type: [mongoose.Types.ObjectId],
			default: []
		},
		price: {
			type: Number,
			required: true
		},
		capacities: {
			type: [String],
			enum: capacitiesEnum,
			validate: {
				validator: function (v) {
					return v.length > 0;
				},
				message: () => messages.validate.required.product_capacities
			}
		},
		flavorTone: {
			type: String,
			required: true
		},
		topScent: {
			type: String,
			required: true
		},
		middleScent: {
			type: String
		},
		finalScent: {
			type: String
		},
		releaseDate: {
			type: String,
			required: true
		},
		sex: {
			type: [String],
			enum: sexEnum,
			validate: {
				validator: function (v) {
					return v.length > 0;
				},
				message: () => messages.validate.required.product_sex
			}
		},
		age: {
			type: Number,
			min: 5,
			max: 100,
			required: true
		},
		odorRetention: {
			form: {
				type: Number,
				required: true
			},
			to: {
				type: Number,
				required: true
			}
		},
		season: {
			spring: {
				type: Number,
				required: true,
				min: 0,
				max: 100
			},
			summer: {
				type: Number,
				required: true,
				min: 0,
				max: 100
			},
			autumn: {
				type: Number,
				required: true,
				min: 0,
				max: 100
			},
			winter: {
				type: Number,
				required: true,
				min: 0,
				max: 100
			}
		},
		times: {
			day: {
				type: Number,
				required: true,
				min: 0,
				max: 100
			},
			night: {
				type: Number,
				required: true,
				min: 0,
				max: 100
			}
		},
		popular: {
			type: Boolean,
			default: false
		},
		new: {
			type: Boolean,
			default: false
		},
		slug: { type: String, slug: 'name' },
		deleted: {
			type: Boolean,
			default: false
		},
		deletedAt: {
			type: Date
		},
		deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	},
	{
		timestamps: true
	}
);

// add plugin that converts mongoose to json
ProductSchema.plugin(toJSON);
ProductSchema.plugin(paginate);
ProductSchema.plugin(mongooseDelete, mongooseDeleteOptions);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
