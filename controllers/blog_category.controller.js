const httpStatus = require('http-status');
const { filterTypes } = require('../configs/settings');
const catchAsync = require('../utils/catchAsync');
const blogCategoryService = require('../services/blog_category.service');
const fileService = require('../services/file.service');
const { pickFilter, pick } = require('../utils/pick');

const listBlogCategories = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'name', type: filterTypes.search }]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const blogCategories = await blogCategoryService.getListBlogCategories(filter, options);
	res.status(httpStatus.OK).send(blogCategories);
});

const createBlogCategory = catchAsync(async (req, res) => {
	const body = req.body;
	const blogCategory = await blogCategoryService.createBlogCategory(body);
	res.status(httpStatus.CREATED).send(blogCategory);
});

const updateBlogCategory = catchAsync(async (req, res) => {
	const blogCategoryId = req.params.blogCategoryId;
	const blogCategory = await blogCategoryService.updateBlogCategory(blogCategoryId, req.body);
	res.status(httpStatus.OK).send(blogCategory);
});

const deleteBlogCategory = catchAsync(async (req, res) => {
	await blogCategoryService.deleteBlogCategory(req.userId, req.params.blogCategoryId);
	res.status(httpStatus.OK).send(true);
});

const destroyBlogCategory = catchAsync(async (req, res) => {
	await blogCategoryService.destroyBlogCategory(req.params.blogCategoryId);
	res.status(httpStatus.OK).send(true);
});

const listTrashBlogCategories = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'name', type: filterTypes.search }]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const blogCategories = await blogCategoryService.getListTrashBlogCategories(filter, options);
	res.status(httpStatus.OK).send(blogCategories);
});

const detailBlogCategory = catchAsync(async (req, res) => {
	const blogCategoryId = req.params.blogCategoryId;
	const blogCategory = await blogCategoryService.getBlogCategoryById(blogCategoryId);
	res.status(httpStatus.OK).send(blogCategory);
});

const importBlogCategories = catchAsync(async (req, res) => {
	const errors = await blogCategoryService.importBlogCategories(req.file);
	if (errors.length > 0) {
		res.status(httpStatus.CONFLICT).send({
			data: errors
		});
	} else {
		res.status(httpStatus.OK).send(true);
	}
});

const exportBlogCategories  = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'name', type: filterTypes.search }]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const blogCategories = await blogCategoryService.getListBlogCategoryExport(filter, options);
	const excelBuffer = await fileService.exportFileExcel(blogCategories,res)
	res.send(excelBuffer);
})

const restoreBlogCategory = catchAsync(async (req, res) => {
	const blogCategoryId = req.params.blogCategoryId;
	await blogCategoryService.restoreBlogCategory(blogCategoryId);
	res.status(httpStatus.OK).send(true);
});

module.exports = {
	listBlogCategories,
	createBlogCategory,
	updateBlogCategory,
	deleteBlogCategory,
	listTrashBlogCategories,
	detailBlogCategory,
	destroyBlogCategory,
	importBlogCategories,
	exportBlogCategories,
	restoreBlogCategory
};
