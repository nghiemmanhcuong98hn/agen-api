const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const messages = require('../configs/messages');
const { mongooseDeleteOptions } = require('../configs/settings');

mongoose.plugin(slug);

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		max: 1000,
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
	imageList: {
		type: [String],
		default: []
	},
	price: {
		type: Number,
		required: true
	},
	capacities: {
		type: [String],
		validate: {
			validator: function (v) {
				return v.length > 0;
			},
			message: () => messages.validate.required.capacities
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
      releaseDate:{
            type: String,
            required: true
      },
      sex:{
            type: [String],
            enum: ['nam', 'nữ','unisex'],
            validate: {
			validator: function (v) {
				return v.length > 0;
			},
			message: () => messages.validate.required.sex
		}
      },
      age:{
            type: Number,
		required: true
      },
      odorRetention:{
            
      },
	slug: { type: String, slug: 'name', unique: true },
	deleted: {
		type: Boolean,
		default: false
	},
	deletedAt: {
		type: Date
	},
	deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// add plugin that converts mongoose to json
ProductSchema.plugin(toJSON);
ProductSchema.plugin(paginate);
ProductSchema.plugin(mongooseDelete, mongooseDeleteOptions);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;