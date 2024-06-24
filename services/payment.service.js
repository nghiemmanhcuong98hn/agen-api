const { default: axios } = require('axios');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../configs/config');
const moment = require('moment');

const paymentMomo = async ({ orderId, products = [], userInfo = {}, orderValue, requestId }) => {
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

const zaloPayment = async () => {
	const config = {
		app_id: '2553',
		key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
		key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
		endpoint: 'https://sb-openapi.zalopay.vn/v2/create'
	};

	const embed_data = {
		//sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
		redirecturl: 'https://phongthuytaman.com'
	};

	const items = [];
	const transID = Math.floor(Math.random() * 1000000);

	const order = {
		app_id: config.app_id,
		app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
		app_user: 'user123',
		app_time: Date.now(), // miliseconds
		item: JSON.stringify(items),
		embed_data: JSON.stringify(embed_data),
		amount: 50000,
		//khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
		//Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
		callback_url: 'https://b074-1-53-37-194.ngrok-free.app/callback',
		description: `Lazada - Payment for the order #${transID}`,
		bank_code: ''
	};

	// appid|app_trans_id|appuser|amount|apptime|embeddata|item
	const data =
		config.app_id +
		'|' +
		order.app_trans_id +
		'|' +
		order.app_user +
		'|' +
		order.amount +
		'|' +
		order.app_time +
		'|' +
		order.embed_data +
		'|' +
		order.item;
	order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

	try {
		const result = await axios.post(config.endpoint, null, { params: order });
		return result.data;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
	}
};

module.exports = {
	paymentMomo,
	zaloPayment
};
