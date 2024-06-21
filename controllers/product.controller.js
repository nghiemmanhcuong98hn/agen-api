const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const exportService = require('../services/file.service');
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

module.exports = {
	listProducts
};
