const Order = require('../models/order.modal');
const { paymentMethods } = require('../configs/settings');
const { paymentMomo, zaloPayment } = require('./payment.service');
const randomstring = require('randomstring');

const createOrder = async body => {
	const orderId = randomstring.generate({
		length: 12,
		charset: 'alphanumeric'
	});
	const order = await Order.create({ ...body, orderId });
	const data = {
		orderId: order?.orderId,
		products: order?.products,
		requestId: order?._id,
		orderValue: order?.orderValue,
		username: order?.name,
		email: order?.email,
		phone: order?.phone,
	};
	if (body.paymentMethod === paymentMethods[1]) {
		return await paymentMomo(data);
	} else if (body.paymentMethod === paymentMethods[2]) {
		return await zaloPayment(data);
	}
	return order;
};

module.exports = {
	createOrder
};
