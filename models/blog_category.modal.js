const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const { mongooseDeleteOptions } = require('../configs/settings');

mongoose.plugin(slug);

const BlogCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			min: 5,
			max: 50,
			required: true,
			trim: true,
			unique: true
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
	},
	{
		timestamps: true
	}
);

// add plugin that converts mongoose to json
BlogCategorySchema.plugin(toJSON);
BlogCategorySchema.plugin(paginate);
BlogCategorySchema.plugin(mongooseDelete, mongooseDeleteOptions);

BlogCategorySchema.statics.isNameTaken = async function (name) {
	const blogCategory = await this.findOne({ name });
	return !!blogCategory;
};

const BlogCategory = mongoose.model('BlogCategories', BlogCategorySchema);
module.exports = BlogCategory;
