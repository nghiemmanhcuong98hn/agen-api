const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');
const { pickFilter, pick } = require('../utils/pick');

const createOrder = catchAsync(async (req, res) => {
	const body = req.body;
	const order = await orderService.createOrder(body);
	res.status(httpStatus.CREATED).send(order);
});

module.exports = {
	createOrder
};
