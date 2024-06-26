const mongoose = require('mongoose');
const validator = require('validator');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const { mongooseDeleteOptions } = require('../configs/settings');
const messages = require('../configs/messages');

const ContactSchema = mongoose.Schema(
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
			}
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
		content: {
			type: String,
			max: 2000,
			required: true
		},
		image: {
			type: String,
			required: false
		},
		isReply: {
			type: Boolean,
			default: false
		},
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
ContactSchema.plugin(toJSON);
ContactSchema.plugin(paginate);
ContactSchema.plugin(mongooseDelete, mongooseDeleteOptions);

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
