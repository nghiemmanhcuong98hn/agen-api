const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const { mongooseDeleteOptions } = require('../configs/settings');

mongoose.plugin(slug);

const BrandSchema = mongoose.Schema({
	name: {
		type: String,
		min: 5,
		max: 50,
		required: true,
		trim: true,
		unique: true
	},
	char: {
		type: String,
		max: 1
	},
	image: {
		type: String,
		required: false
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
BrandSchema.plugin(toJSON);
BrandSchema.plugin(paginate);
BrandSchema.plugin(mongooseDelete, mongooseDeleteOptions);

BrandSchema.pre('save', async function (next) {
	if (this.isModified('name')) {
		this.char = this.name.charAt(0).toUpperCase();
	}
	next();
});

BrandSchema.statics.isNameTaken = async function (name) {
	const brand = await this.findOne({ name });
	return !!brand;
};

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;
