const Order = require('../models/order.modal');
const { paymentMethods } = require('../configs/settings');
const { paymentMomo } = require('./payment.service');
const randomstring = require('randomstring');

const createOrder = async body => {
	const orderId = randomstring.generate({
		length: 12,
		charset: 'alphanumeric'
	});
	const order = await Order.create({ ...body, orderId });
	if (body.paymentMethod === paymentMethods[1]) {
		const data = {
			orderId: order?.orderId,
			requestId: order?._id,
			orderValue: order?.orderValue
		};
		return await paymentMomo(data);
	}
	return order;
};

module.exports = {
	createOrder
};
