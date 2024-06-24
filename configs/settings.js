const privateKeys = ['role'];

const filterTypes = {
	search: 'search',
	date: 'date'
};

const mongooseDeleteOptions = {
	deletedAt: true,
	deletedBy: true,
	overrideMethods: [
		'count',
		'findOne',
		'findOneAndUpdate',
		'findById',
		'findOneAndDelete',
		'create'
	]
};

const capacitiesEnum = [
	'10ml',
	'25ml',
	'30ml',
	'50ml',
	'75ml',
	'100ml',
	'125ml',
	'150ml',
	'175ml',
	'200ml'
];

const sexEnum = ['nam', 'nữ', 'unisex'];
const orderPaymentStatus = {
	1:'Chờ thanh toán',
	2:'Đã thanh toán',
}

const orderTransportStatus = {
	1:'Chờ xác nhận',
	2:'Chờ vận chuyển',
	3:'Đang vận chuyển',
	4:'Giao hàng thành công',
	5:'Hoàn hàng',
}

const paymentMethods = {
	1:'MOMO',
	2:'ZALOPAY',
	3:'Thanh toán khi nhân hàng',
	4:'Chuyển khoản'
}

module.exports = {
	privateKeys,
	filterTypes,
	mongooseDeleteOptions,
	capacitiesEnum,
	sexEnum,
	orderPaymentStatus,
	orderTransportStatus,
	paymentMethods
};
