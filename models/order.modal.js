const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const messages = require('../configs/messages');
const autopopulate = require('mongoose-autopopulate');
const {
	orderTransportStatus,
	orderPaymentStatus,
	paymentMethods,
	platformList
} = require('../configs/settings');

const OrderSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: function (v) {
					return validator.isEmail(v);
				},
				message: () => messages.validate.format.email
			},
			index: true
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
		products: [
			{
				product: {
					type: mongoose.Types.ObjectId,
					ref: 'Product',
					autopopulate: ['price', 'name']
				},
				quantity: {
					type: Number,
					min: 0,
					required: true
				}
			}
		],
		address: {
			city: {
				type: String,
				required: true,
				trim: true
			},
			detail: {
				type: String,
				required: true,
				trim: true
			},
			zipCode: {
				type: Number,
				min: 5,
				max: 10,
				trim: true,
				default: null
			}
		},
		paymentMethod: {
			type: String,
			required: true,
			enum: Object.values(paymentMethods)
		},
		paymentStatus: {
			type: String,
			default: orderPaymentStatus.confirm
		},
		transportStatus: {
			type: String,
			default: orderTransportStatus.confirm
		},
		platform: {
			type: String,
			required: true,
			enum: Object.values(platformList)
		},
		orderValue: {
			type: Number,
			required: true,
			min: 0
		},
		isGift: {
			type: Boolean,
			default: false
		},
		notes: {
			type: String,
			max: 255,
			default: null
		},
		coupon: {
			type: mongoose.Types.ObjectId,
			ref: 'Coupon',
			trim: true,
			default: null,
			autopopulate: false
		},
		isPrepayment: {
			type: Boolean,
			default: false
		},
		invoice: {
			type: mongoose.Types.ObjectId,
			ref: 'Invoice',
			default: null,
			autopopulate: false
		},
		paymentHistories: [
			{ type: mongoose.Types.ObjectId, ref: 'PaymentHistory', autopopulate: true }
		]
	},
	{
		timestamps: true
	}
);

// add plugin that converts mongoose to json
OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);
OrderSchema.plugin(autopopulate);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
