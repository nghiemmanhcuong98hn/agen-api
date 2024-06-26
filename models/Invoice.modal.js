const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const { mongooseDeleteOptions } = require('../configs/settings');

// Define the InvoiceSchema
const InvoiceSchema = mongoose.Schema(
	{
		invoiceNumber: {
			type: String,
			required: true,
			unique: true
		},
		customerName: {
			type: String,
			required: true
		},
		customerEmail: {
			type: String,
			required: true
		},
		products: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Product'
			}
		],
		totalAmount: {
			type: Number,
			required: true
		},
		issuedDate: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true // This will add createdAt and updatedAt fields
	}
);

// add plugin that converts mongoose to json
InvoiceSchema.plugin(toJSON);
InvoiceSchema.plugin(paginate);
InvoiceSchema.plugin(mongooseDelete, mongooseDeleteOptions);

// Create the Invoice model
const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
