const { default: mongoose } = require('mongoose');
const Blog = require('../models/blog.modal');
const messages = require('../configs/messages');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const makeOptions = require('../utils/makeOptions');

/**
 * get blog by id
 * @param {ObjectId} id
 * @returns {Promise<Blog>}
 */
const getBlogById = async blogId => {
	if (!mongoose.Types.ObjectId.isValid(blogId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.blog_notfound);
	}
	const blog = await Blog.findById(blogId);
	if (!blog) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.blog_notfound);
	}
	return blog;
};

/**
 * create blog
 * @param {Object} body
 * @returns {Promise<Blog>}
 */
const createBlog = async ({body,image,author}) => {
	if(!image) {
		throw new ApiError(httpStatus.BAD_REQUEST, messages.validate.required.blog_image);
	}
	body.image = image
	body.author = author
	return await Blog.create(body);
};

/**
 * create blog
 * @param {ObjectId} blogId
 * @param {Object} body
 * @returns {Promise<Blog>}
 */
const updateBlog = async ({blogId, body,image}) => {
	await getBlogById(blogId);
	if(image) body.image = image
	return await Blog.findByIdAndUpdate(blogId, body, { new: true });
};

/**
 * delete blog
 * @param {String} deleteBy
 * @param {String} blogId
 * @return {Promise<Blog>}
 */
const deleteBlog = async (deleteBy, blogId) => {
	const blog = await getBlogById(blogId);
	return await blog.delete(deleteBy);
};

/**
 * destroy blog
 * @param {String} blogId
 * @return {Promise<Blog>}
 */
const destroyBlog = async blogId => {
	return await Blog.deleteOne({ _id: blogId });
};

/**
 * get list blogs
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Blog[]>}
 */
const getListBlogs = async (filter, options) => {
	return Blog.paginate(filter, options);
};

/**
 * get list trash blogs
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Blog[]>}
 */
const getListTrashBlogs = async (filter, options) => {
	// The 3rd argument allows getting only the middle trash list
	return Blog.paginate(filter, options, true);
};

/**
 * restore blog
 * @param {String} blogId
 * @return {Promise<>}
 */
const restoreBlog = async (blogId) => {
	return await Blog.restore({_id: blogId});
};


module.exports = {
	getListBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
	getListTrashBlogs,
	getBlogById,
	destroyBlog,
	restoreBlog
};
