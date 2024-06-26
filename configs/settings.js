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
		'create',
		'countDocuments'
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
	confirm:'Chờ xác nhận',
	pending:'Chờ thanh toán',
	paid:'Đã thanh toán',
	cancel:'Hủy thanh toán',
}

const orderTransportStatus = {
	confirm:'Chờ xác nhận',
	pending:'Chờ vận chuyển',
	being:'Đang vận chuyển',
	success:'Giao hàng thành công',
	refund:'Hoàn hàng',
}

const paymentMethods = {
	momo:'MOMO',
	zalo:'ZALOPAY',
	cod:'Thanh toán khi nhận hàng',
	transfer:'Chuyển khoản'
}

const platformList  = {
	tiktok:'tiktok',
	shoppe:'shoppe',
	facebook:'facebook',
	website:'website',
	direct :'trực tiếp',
}

const filterStatisticalTablesTime = {
	month:[],
	year:[],
}

module.exports = {
	privateKeys,
	filterTypes,
	mongooseDeleteOptions,
	capacitiesEnum,
	sexEnum,
	orderPaymentStatus,
	orderTransportStatus,
	paymentMethods,
	platformList
};
