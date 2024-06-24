const { default: axios } = require('axios');
const crypto = require('crypto');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../configs/config');

const paymentMomo = async ({ orderId, products = [], userInfo = {}, orderValue,requestId }) => {
	//parameters
	var accessKey = `${config.momo.accessKey}`;
	var secretKey = `${config.momo.secretKey}`;
	var orderInfo = 'pay with MoMo';
	var partnerCode = 'MOMO';
	var redirectUrl = `${config.momo.redirectUrl}`;
	var ipnUrl = `${config.momo.redirectUrl}`;
	var requestType = 'payWithMethod';
	var amount = orderValue?.toString();
	var requestId = requestId;
	var autoCapture = true;
	var items = products;
	var userInfo = userInfo;
	var lang = 'vi';
	var extraData = '';
	var orderGroupId = '';

	//before sign HMAC SHA256 with format
	//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
	var rawSignature =
		'accessKey=' +
		accessKey +
		'&amount=' +
		amount +
		'&extraData=' +
		extraData +
		'&ipnUrl=' +
		ipnUrl +
		'&orderId=' +
		orderId +
		'&orderInfo=' +
		orderInfo +
		'&partnerCode=' +
		partnerCode +
		'&redirectUrl=' +
		redirectUrl +
		'&requestId=' +
		requestId +
		'&requestType=' +
		requestType;
	var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

	//json object send to MoMo endpoint
	const requestBody = JSON.stringify({
		partnerCode,
		partnerName: 'Agen shop',
		storeId: 'MomoTestStore',
		requestId,
		amount,
		orderId,
		orderInfo,
		redirectUrl,
		ipnUrl,
		lang,
		requestType,
		autoCapture,
		extraData,
		orderGroupId,
		signature
	});

	const options = {
		method: 'POST',
		url: `${config.momo.paymentApi}`,
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(requestBody)
		},
		data: requestBody
	};
	try {
		const result = await axios(options);
		return result.data;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
	}
};

module.exports = {
	paymentMomo
};
