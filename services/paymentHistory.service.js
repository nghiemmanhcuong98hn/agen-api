const { paymentMethods } = require('../configs/settings');
const PaymentHistory = require('../models/paymentHistory.modal');

/**
 *
 * @param {Object} body
 * @returns {Promise<PaymentHistory>}
 */
const createPaymentHistory = async ({ body, paymentMethod, transactionId }) => {
	let data;
	switch (paymentMethod) {
		// MOMO
		case paymentMethods.momo:
			data = {
				paymentUrl: body.payUrl,
				returnCode: body.resultCode,
				returnMessage: body.message,
				transactionId: body.orderId,
				partnerCode: body.partnerCode,
				requestId: body.requestId
			};
			break;
		// ZALO PAY
		case paymentMethods.zalo:
			data = {
				paymentUrl: body.order_url,
				returnCode: body.return_code ?? body.sub_return_code,
				returnMessage: body.return_message ?? body.sub_return_message,
				transactionId: transactionId,
				orderToken: body.order_token
			};
			break;
		default:
			break;
	}
	return await PaymentHistory.create(data);
};

module.exports = {
	createPaymentHistory
};
