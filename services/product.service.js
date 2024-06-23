const Product = require('../models/product.modal');
const ApiError = require('../utils/ApiError');
const messages = require('../configs/messages');
const { createProductImages, deleteProductImages } = require('./productImage.service');
const httpStatus = require('http-status');
const { default: mongoose } = require('mongoose');

/**
 *
 * @param {string} productId
 * @returns {Promise<Product>}
 */
const getProductById = async productId => {
	if (!mongoose.Types.ObjectId.isValid(productId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.product_notfound);
	}

	const product = await Product.findById(productId);
	if (!product) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.product_notfound);
	}
	return product;
};

/**
 * get List Product
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Product>}
 */
const getListProducts = async (filter, options) => {
	return Product.paginate(filter, options);
};

/**
 * get List trash Product
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Product>}
 */
const getListTrashProducts = async (filter, options) => {
	// The 3rd argument allows getting only the middle trash list
	return Product.paginate(filter, options,true);
};

/**
 * create product
 * @param {Object} body
 * @param {Object} files
 * @returns {Promise<Product>}
 */
const createProduct = async (body, images) => {
	const { file, files } = images;
	if (file?.[0]) body.image = file[0]?.path;
	const product = await Product.create(body);
	if (files && files.length > 0) {
		const images = await createProductImages(files, product._id);
		return await Product.findByIdAndUpdate(product._id, { images }, { new: true });
	}
	return product;
};

/**
 * update product
 * @param {Object} body
 * @param {Object} images
 * @returns {Promise<Product>}
 */
const updateProduct = async (productId, body, images) => {
	const product = await getProductById(productId);
	let imageList = [...product.images];
	const { file, files } = images;
	if (file?.[0]) body.image = file[0]?.path;
	if (files && files.length > 0) {
		const images = await createProductImages(files, product._id);
		imageList = [...imageList,...images];
	}
	if (body.delete_image_ids && body.delete_image_ids.length > 0) {
		await deleteProductImages(body.delete_image_ids);
		imageList = imageList
			.map(i => i.toString())
			.filter(image => !body.delete_image_ids.includes(image));
	}
	return await Product.findByIdAndUpdate(
		product._id,
		{ ...body, images: imageList },
		{ new: true }
	);
};

/**
 * delete product
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProduct = async(deleteBy,productId) => {
	const product = await getProductById(productId)
	return await product.delete(deleteBy)
}

/**
 * destroy product
 * @param {String} productId
 * @return {Promise<Product>}
 */
const destroyProduct = async (productId) => {
	return await Product.deleteOne({_id: productId});
};

/**
 * restore product
 * @param {String} productId
 * @return {Promise<>}
 */
const restoreProduct = async (productId) => {
	return await Product.restore({_id: productId});
};

module.exports = {
	getListProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	destroyProduct,
	getProductById,
	getListTrashProducts,
	restoreProduct
};
