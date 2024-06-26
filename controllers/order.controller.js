const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');
const { pickFilter, pick } = require('../utils/pick');
const { filterTypes } = require('../configs/settings');

const createOrder = catchAsync(async (req, res) => {
	const body = req.body;
	const order = await orderService.createOrder(body);
	res.status(httpStatus.CREATED).send(order);
});

const listOrders = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'email', type: filterTypes.search },
		{ key: 'phone', type: filterTypes.search },
		{ key: 'orderId', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const orders = await orderService.getListOrders(filter, options);
	res.status(httpStatus.OK).send(orders);
})

const detailOrder = catchAsync(async (req, res) => {
	const orderId = req.params.orderId;
	const order = await orderService.getDetailOrder(orderId);
	res.status(httpStatus.CREATED).send(order);
})

module.exports = {
	createOrder,
	listOrders,
	detailOrder
};
