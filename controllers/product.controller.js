const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const httpStatus = require('http-status');
const { pickFilter, pick } = require('../utils/pick');
const { filterTypes } = require('../configs/settings');

const listProducts = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const products = await productService.getListProducts(filter, options);
	res.status(httpStatus.OK).send(products);
});

const listTrashProducts = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const products = await productService.getListTrashProducts(filter, options);
	res.status(httpStatus.OK).send(products);
});

const validateProduct = catchAsync(async (req, res) => {
	res.status(httpStatus.OK).send(req.body);
})

const detailProduct = catchAsync(async (req, res) => {
	const productId = req.params.productId;
	const product = await productService.getProductById(productId)
	res.status(httpStatus.OK).send(product);
})

const createProduct = catchAsync(async (req, res) => {
	const product = await productService.createProduct(req.body,req.files)
	res.status(httpStatus.OK).send(product);
})

const updateProduct = catchAsync(async (req, res) => {
	const productId = req.params.productId;
	const product = await productService.updateProduct(productId,req.body,req.files)
	res.status(httpStatus.OK).send(product);
})

const deleteProduct = catchAsync(async (req, res) => {
	const productId = req.params.productId;
	await productService.deleteProduct(req.userId,productId)
	res.status(httpStatus.OK).send(true);
})

const destroyProduct = catchAsync(async (req, res) => {
	const productId = req.params.productId;
	await productService.destroyProduct(productId)
	res.status(httpStatus.OK).send(true);
})

const restoreProduct = catchAsync(async (req, res) => {
	const productId = req.params.productId;
	await productService.restoreProduct(productId)
	res.status(httpStatus.OK).send(true);
})

module.exports = {
	listProducts,
	createProduct,
	validateProduct,
	updateProduct,
	deleteProduct,
	destroyProduct,
	listTrashProducts,
	detailProduct,
	restoreProduct
};
