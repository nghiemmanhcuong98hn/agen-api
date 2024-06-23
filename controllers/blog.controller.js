const httpStatus = require('http-status');
const { filterTypes } = require('../configs/settings');
const catchAsync = require('../utils/catchAsync');
const blogService = require('../services/blog.service');
const { pickFilter, pick } = require('../utils/pick');

const listBlogs = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'title', type: filterTypes.search }]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const blogs = await blogService.getListBlogs(filter, options);
	res.status(httpStatus.OK).send(blogs);
});

const createBlog = catchAsync(async (req, res) => {
	const body = req.body;
	const author = req.userId;
	const image = req.file?.path;
	const blog = await blogService.createBlog({body,author,image});
	res.status(httpStatus.CREATED).send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
	const blogId = req.params.blogId;
	const image = req.file?.path;
	const blog = await blogService.updateBlog({blogId, body:req.body,image});
	res.status(httpStatus.OK).send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
	await blogService.deleteBlog(req.userId, req.params.blogId);
	res.status(httpStatus.OK).send(true);
});

const destroyBlog = catchAsync(async (req, res) => {
	await blogService.destroyBlog(req.params.blogId);
	res.status(httpStatus.OK).send(true);
});

const listTrashBlogs = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'title', type: filterTypes.search }]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const blogs = await blogService.getListTrashBlogs(filter, options);
	res.status(httpStatus.OK).send(blogs);
});

const detailBlog = catchAsync(async (req, res) => {
	const blogId = req.params.blogId;
	const blog = await blogService.getBlogById(blogId);
	res.status(httpStatus.OK).send(blog);
});

const restoreBlog = catchAsync(async (req, res) => {
	const blogId = req.params.blogId;
	await blogService.restoreBlog(blogId);
	res.status(httpStatus.OK).send(true);
});

module.exports = {
	listBlogs,
	listTrashBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
	listBlogs,
	detailBlog,
	destroyBlog,
	restoreBlog
};
