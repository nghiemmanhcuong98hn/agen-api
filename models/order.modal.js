const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const messages = require('../configs/messages');
const { orderTransportStatus, orderPaymentStatus, paymentMethods } = require('../configs/settings');

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
				productId: {
					type: mongoose.Types.ObjectId,
					ref: 'Product'
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
		orderValue: {
			type: Number,
			required: true,
			min: 0
		},
		isGift: {
			type: Boolean,
			default: false
		},
		paymentUrl: {
			type: String,
			default: null
		},
		orderId: {
			type: String,
			index: true
		},
		transactionId: {
			type: String,
			index: true,
			default: null
		},
		paymentStatus: {
			type: String,
			default: orderPaymentStatus[1]
		},
		transportStatus: {
			type: String,
			default: orderTransportStatus[1]
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
			default: null
		},
		isPrepayment: {
			type: Boolean,
			default: false
		},
		invoice: {
			type: mongoose.Types.ObjectId,
			ref: 'Invoice',
			default: null
		},
		paymentHistories: [{ type: mongoose.Types.ObjectId, ref: 'paymentHistory'}]
	},
	{
		timestamps: true
	}
);

// add plugin that converts mongoose to json
OrderSchema.plugin(toJSON);
OrderSchema.plugin(paginate);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
