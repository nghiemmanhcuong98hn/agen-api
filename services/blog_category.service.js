const { default: mongoose } = require('mongoose');
const BlogCategory = require('../models/blog_category.modal');
const fileService = require('./file.service');
const messages = require('../configs/messages');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const makeOptions = require('../utils/makeOptions');

/**
 * get blog category by id
 * @param {ObjectId} BlogCategoryId
 * @returns {Promise<BlogCategory>}
 */
const getBlogCategoryById = async BlogCategoryId => {
	if (!mongoose.Types.ObjectId.isValid(BlogCategoryId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.blog_category_notfound);
	}
	const blogCategory = await BlogCategory.findById(BlogCategoryId);
	if (!blogCategory) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.blog_category_notfound);
	}
	return blogCategory;
};

/**
 * create blog category
 * @param {Object} body
 * @returns {Promise<BlogCategory>}
 */
const createBlogCategory = async body => {
	if (await BlogCategory.isNameTaken(body.name)) {
		throw new ApiError(httpStatus.CONFLICT, messages.validate.blog_category_name_already_taken);
	}

	return await BlogCategory.create(body);
};

/**
 * create blog category
 * @param {ObjectId} BlogCategoryId
 * @param {Object} body
 * @returns {Promise<BlogCategory>}
 */
const updateBlogCategory = async (BlogCategoryId, body) => {
	const blogCategory = await getBlogCategoryById(BlogCategoryId);

	if ((await BlogCategory.isNameTaken(body.name)) && blogCategory.name !== body.name) {
		throw new ApiError(httpStatus.CONFLICT, messages.validate.blog_category_name_already_taken);
	}

	return await BlogCategory.findByIdAndUpdate(BlogCategoryId, body, { new: true });
};

/**
 * delete blog category
 * @param {String} deleteBy
 * @param {String} BlogCategoryId
 * @return {Promise<BlogCategory>}
 */
const deleteBlogCategory = async (deleteBy, BlogCategoryId) => {
	const blogCategory = await getBlogCategoryById(BlogCategoryId);
	return await blogCategory.delete(deleteBy);
};

/**
 * destroy blog category
 * @param {String} BlogCategoryId
 * @return {Promise<BlogCategory>}
 */
const destroyBlogCategory = async BlogCategoryId => {
	return await BlogCategory.deleteOne({ _id: BlogCategoryId });
};

/**
 * get list blog categories
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<BlogCategory[]>}
 */
const getListBlogCategories = async (filter, options) => {
	return BlogCategory.paginate(filter, options);
};

/**
 * get list trash blog categories
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<BlogCategory[]>}
 */
const getListTrashBlogCategories = async (filter, options) => {
	// The 3rd argument allows getting only the middle trash list
	return BlogCategory.paginate(filter, options, true);
};

/**
 * import list blog categories
 * @param {Object} file
 *  @returns {Array<string>}
 */
const importBlogCategories = async file => {
	const errors = [];
	const blogCategories = await fileService.importExcel(file);

	await Promise.all(
		blogCategories.map(category => {
			return BlogCategory.create({name:category.name}).catch(error =>
				errors.push(
					error?.keyValue?.name + ' ' + messages.validate.blog_category_name_already_taken
				)
			);
		})
	);
	return errors;
};

/**
 * get List log categories Export
 * @param {Object} filter
 * @param {Object} options
 * @returns {Array<BlogCategory>}
 */
const getListBlogCategoryExport = async (filter, options) => {
	const { limit, skip, sort } = makeOptions(options);
	let blogCategories = await BlogCategory.find(filter, options)
		.lean()
		.sort(sort)
		.skip(skip)
		.limit(limit);
	blogCategories = blogCategories.map(category => {
		delete category.__v;
		return {
			...category,
			_id: category._id.toString(),
			deletedBy: category.deletedBy?.toString(),
		};
	});
	return blogCategories;
};

/**
 * restore blog category
 * @param {String} blogCategoryId
 * @return {Promise<>}
 */
const restoreBlogCategory = async (blogCategoryId) => {
	return await BlogCategory.restore({_id: blogCategoryId});
};

module.exports = {
	getListBlogCategories,
	createBlogCategory,
	updateBlogCategory,
	deleteBlogCategory,
	getListTrashBlogCategories,
	getBlogCategoryById,
	destroyBlogCategory,
	importBlogCategories,
	getListBlogCategoryExport,
	restoreBlogCategory
};
