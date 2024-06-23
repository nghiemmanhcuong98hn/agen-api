const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const { toJSON, paginate } = require('./plugins');
const { mongooseDeleteOptions } = require('../configs/settings');

mongoose.plugin(slug);

const BlogSchema = mongoose.Schema(
	{
		title: {
			type: String,
			min: 10,
			max: 255,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		isPublic:{
			type: Boolean,
			default: false,
		},
		slug: { type: String, slug: 'title', unique: true },
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
BlogSchema.plugin(toJSON);
BlogSchema.plugin(paginate);
BlogSchema.plugin(mongooseDelete, mongooseDeleteOptions);

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
