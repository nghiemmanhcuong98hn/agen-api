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
	if (body.paymentMethod === paymentMethods[1]) {
		const data = {
			orderId: order?.orderId,
			requestId: order?._id,
			orderValue: order?.orderValue
		};
		return await paymentMomo(data);
	}else if(body.paymentMethod === paymentMethods[2]) {
		return await zaloPayment();
	}
	return order;
};

module.exports = {
	createOrder
};
