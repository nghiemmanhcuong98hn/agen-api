const mongoose = require('mongoose');

const ProductImageSchema = mongoose.Schema(
	{
		pathname: {
			type: String,
			required: true
		},
		filename:{
			type: String,
			required: true
		},
		product_id: {
			type: mongoose.Types.ObjectId
		}
	},
	{
		timestamps: true
	}
);

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);
module.exports = ProductImage;
