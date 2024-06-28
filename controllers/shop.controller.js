const catchAsync = require('../utils/catchAsync');
const shopService = require('../services/shop.service');
const httpStatus = require('http-status');

const getShop = catchAsync(async (req, res) => {
	const shop = await shopService.getShop();
	res.status(httpStatus.OK).send(shop);
});


const createShop = catchAsync(async (req, res) => {
	const shop = await shopService.createShop(req.body);
	res.status(httpStatus.CREATED).send(shop);
});

const updateShop = catchAsync(async (req, res) => {
	const shop = await shopService.updateShop(req.body);
	res.status(httpStatus.OK).send(shop);
});

module.exports = {
	createShop,
	updateShop,
	getShop
};
