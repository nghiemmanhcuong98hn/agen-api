const cloudinary = require('cloudinary').v2;
const httpStatus = require('http-status');
const ProductImage = require('../models/product_image.modal');
const ApiError = require('../utils/ApiError');

const createProductImages = async (files, productId) => {
	const images = await Promise.all(
		files.map(file => {
			return ProductImage.create({
				pathname: file.path,
				filename: file?.filename,
				product_id: productId
			}).catch(err => {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					'ERROR when create image.'
				);
			});
		})
	);
	return images?.map(image => image._id);
};

const deleteProductImages = async imageIds => {
	await Promise.all(
		imageIds.map(id => {
			return ProductImage.findByIdAndDelete(id)
				.then(async image => {
					await cloudinary.api
						.delete_resources([image?.filename], {
							type: 'upload',
							resource_type: 'image'
						})
						.catch(() => {
							throw new ApiError(
								httpStatus.BAD_REQUEST,
								'ERROR when delete image in cloudinary.'
							);
						});
				})
				.catch(() => {
					throw new ApiError(
						httpStatus.BAD_REQUEST,
						'ERROR when findByIdAndDelete image.'
					);
				});
		})
	);
};

module.exports = {
	createProductImages,
	deleteProductImages
};
