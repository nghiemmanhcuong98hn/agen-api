const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const autopopulate = require('mongoose-autopopulate');
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
		customerPhone: {
			type: String,
			required: true
		},
		customerAddress: {
			type: String,
			required: true
		},
		products: [
			{
				productId: {
					type: mongoose.Types.ObjectId,
					ref: 'Product',
					autopopulate: { select: ['name', 'price'] }
				},
				quantity: {
					type: Number,
					min: 0,
					required: true
				}
			}
		],
		totalAmount: {
			type: Number,
			required: true
		},
		isExported: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true // This will add createdAt and updatedAt fields
	}
);

// add plugin that converts mongoose to json
InvoiceSchema.plugin(toJSON);
InvoiceSchema.plugin(paginate);
InvoiceSchema.plugin(autopopulate);
InvoiceSchema.plugin(mongooseDelete, mongooseDeleteOptions);

// Create the Invoice model
const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
