const mongoose = require('mongoose');
const { orderPaymentStatus } = require('../configs/settings');

// Define the PaymentHistorySchema
const PaymentHistorySchema = mongoose.Schema(
	{
		paymentStatus: {
			type: String,
			default: orderPaymentStatus.confirm
		},
		paymentUrl: {
			type: String,
			default: null,
			required: true
		},
		returnCode: {
			type: Number,
			required: true
		},
		returnMessage: {
			type: String,
			required: true
		},
		transactionId: {
			type: String,
			index: true,
			default: null,
			required: true
		},
		requestId: {
			type: String,
			default: null
		},
		partnerCode: {
			type: String,
			default: null
		},
		orderToken: {
			type: String,
			default: null
		},
	},
	{
		timestamps: true // This will add createdAt and updatedAt fields
	}
);

// Create the paymentHistory model
const PaymentHistory = mongoose.model('PaymentHistory', PaymentHistorySchema);

module.exports = PaymentHistory;
