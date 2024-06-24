const { default: axios } = require('axios');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../configs/config');
const moment = require('moment');

const paymentMomo = async ({
	orderId,
	products = [],
	username,
	phone,
	email,
	orderValue,
	requestId
}) => {
	//parameters
	var accessKey = `${config.momo.accessKey}`;
	var secretKey = `${config.momo.secretKey}`;
	var redirectUrl = `${config.paymentRedirectUrl}`;
	var ipnUrl = `${config.paymentCallbackUrl}`;
	var userInfo = {"phoneNumber": phone, "email": email, "name": username};
	var requestId = requestId;
	var orderInfo = 'pay with MoMo';
	var partnerCode = 'MOMO';
	var requestType = 'payWithMethod';
	var amount = orderValue?.toString();
	var items = products?.map(item => {
		return {
			name: item?.productId.toString(),
			quantity: item.quantity
		};
	});
	var autoCapture = true;
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
		signature,
		items,
		userInfo
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

const zaloPayment = async ({ orderId, products = [], username, phone, email, orderValue }) => {
	const embed_data = {
		//sau khi hoàn tất thanh toán sẽ đi vào link này (thường là link web thanh toán thành công của mình)
		redirecturl: config.paymentRedirectUrl
	};

	const items = products?.map(item => {
		return {
			name: item?.productId.toString(),
			quantity: item.quantity
		};
	});

	const order = {
		app_id: `${config.zalo.appId}`,
		app_trans_id: `${moment().format('YYMMDD')}_${orderId}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
		app_user: 'user123',
		app_time: Date.now(), // miliseconds
		item: JSON.stringify(items),
		embed_data: JSON.stringify(embed_data),
		amount: orderValue,
		//khi thanh toán xong, zalopay server sẽ POST đến url này để thông báo cho server của mình
		//Chú ý: cần dùng ngrok để public url thì Zalopay Server mới call đến được
		callback_url: `${config.paymentCallbackUrl}`,
		description: `Zalo - Payment for the order #${orderId}`,
		phone,
		email,
		title: 'Đơn hàng ' + username + '_' + moment(new Date()).format('yyyy-mm-dd HH:mm')
	};

	// appid|app_trans_id|appuser|amount|apptime|embeddata|item
	const data =
		config.zalo.appId +
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
	order.mac = CryptoJS.HmacSHA256(data, `${config.zalo.key1}`).toString();

	try {
		const result = await axios.post(`${config.zalo.paymentApi}`, null, { params: order });
		return result.data;
	} catch (error) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
	}
};

module.exports = {
	paymentMomo,
	zaloPayment
};
