const { default: mongoose } = require('mongoose');
const Brand = require('../models/brand.modal');
const fileService = require('../services/file.service');
const messages = require('../configs/messages');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * get brand by id
 * @param {ObjectId} id
 * @returns {Promise<Brand>}
 */
const getBrandById = async brandId => {
	if (!mongoose.Types.ObjectId.isValid(brandId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.brand_notfound);
	}
	const brand = await Brand.findById(brandId);
	if (!brand) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.brand_notfound);
	}
	return brand;
};

/**
 * create brand
 * @param {Object} body
 * @returns {Promise<Brand>}
 */
const createBrand = async body => {
	if (await Brand.isNameTaken(body.name)) {
		throw new ApiError(httpStatus.CONFLICT, messages.validate.brand_name_already_taken);
	}

	return await Brand.create(body);
};

/**
 * create brand
 * @param {ObjectId} brandId
 * @param {Object} body
 * @returns {Promise<Brand>}
 */
const updateBrand = async (brandId, body) => {
	const brand = await getBrandById(brandId);

	if ((await Brand.isNameTaken(body.name)) && brand.name !== body.name) {
		throw new ApiError(httpStatus.CONFLICT, messages.validate.brand_name_already_taken);
	}

	return await Brand.findByIdAndUpdate(brandId, body, { new: true });
};

/**
 * delete brand
 * @param {String} deleteBy
 * @param {String} brandId
 * @return {Promise<Brand>}
 */
const deleteBrand = async (deleteBy, brandId) => {
	const brand = await getBrandById(brandId);
	return await brand.delete(deleteBy);
};

/**
 * destroy brand
 * @param {String} brandId
 * @return {Promise<Brand>}
 */
const destroyBrand = async brandId => {
	return await Brand.deleteOne({ _id: brandId });
};

/**
 * get list brands
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Brand[]>}
 */
const getListBrand = async (filter, options) => {
	return Brand.paginate(filter, options);
};

/**
 * get list brands
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Brand[]>}
 */
const getListTrashBrand = async (filter, options) => {
	// The 3rd argument allows getting only the middle trash list
	return Brand.paginate(filter, options, true);
};

/**
 * import file
 *
 */
const importBrands = async file => {
	const brands = await fileService.importExcel(file);
	const res = await Promise.all(
		brands.map(brand => {
			return Brand.create(brand);
		})
	);
	return res;
};

module.exports = {
	getListBrand,
	createBrand,
	updateBrand,
	deleteBrand,
	getListTrashBrand,
	getBrandById,
	destroyBrand,
	importBrands
};
