const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

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
	slug: { type: String, slug: 'name', unique: true }
});
