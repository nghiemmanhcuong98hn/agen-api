const Order = require('../models/order.modal');
const { paymentMethods } = require('../configs/settings');
const { paymentMomo, zaloPayment } = require('./payment.service');
const paymentHistoryService = require('./paymentHistory.service');
const randomstring = require('randomstring');
const moment = require('moment');
const { default: mongoose } = require('mongoose');

/**
 *
 * @param {Object} body
 * @returns
 */
const createOrder = async body => {
	let response;
	let transactionId = randomstring.generate({
		length: 12,
		charset: 'alphanumeric'
	});
	transactionId = `${moment().format('YYMMDD')}_${transactionId}`;
	let order = await Order.create(body);
	const data = {
		transactionId,
		products: order?.products,
		requestId: order?._id,
		orderValue: order?.orderValue,
		username: order?.name,
		email: order?.email,
		phone: order?.phone
	};
	if (body.paymentMethod === paymentMethods[1]) {
		response = await paymentMomo(data);
	} else if (body.paymentMethod === paymentMethods[2]) {
		response = await zaloPayment(data);
	}
	if (response) {
		const paymentHistory = await paymentHistoryService.createPaymentHistory({
			body: response,
			paymentMethod: body.paymentMethod,
			transactionId
		});
		await order.updateOne({ $push: { paymentHistories: paymentHistory?._id } });
		return { paymentUrl: paymentHistory?.paymentUrl };
	}
	return order;
};

/**
 *
 * @param {Object} filters
 * @param {Object} options
 * @returns {Promise<Order[]>}
 */
const getListOrders = (filters, options) => {
	return Order.paginate(filters, options);
};

/**
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const getOrderById = async orderId => {
	if (!mongoose.Types.ObjectId.isValid(orderId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.order_notfound);
	}

	const order = await Order.findById(orderId);
	if (!order) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.order_notfound);
	}
	return order;
};

/**
 *
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const getDetailOrder = async orderId => {
	const order = await getOrderById(orderId);
	return order;
};

module.exports = {
	createOrder,
	getListOrders,
	getOrderById,
	getDetailOrder
};
