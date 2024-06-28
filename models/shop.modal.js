const mongoose = require('mongoose');
const validator = require('validator');

// Define the ShopSchema
const ShopSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return validator.isMobilePhone(v);
				},
				message: () => messages.validate.format.phone
			}
		},
		backupPhone: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return validator.isMobilePhone(v);
				},
				message: () => messages.validate.format.phone
			}
		},
		address: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate: {
				validator: function (v) {
					return validator.isEmail(v);
				},
				message: () => messages.validate.format.email
			}
		},
		taxCode: {
			type: String,
			default: null
		},
		googleMapUrl: {
			type: String,
			default: null
		},
		social: {
			facebookUrl: {
				type: String,
				default: null
			},
			tiktokUrl: {
				type: String,
				default: null
			},
			youtubeUrl: {
				type: String,
				default: null
			},
			instagramUrl: {
				type: String,
				default: null
			}
		}
	},
	{
		timestamps: true // This will add createdAt and updatedAt fields
	}
);

// Create the Shop model
const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
