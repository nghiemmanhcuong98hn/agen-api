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

module.exports = {
	privateKeys,
	filterTypes,
	mongooseDeleteOptions,
	capacitiesEnum,
	sexEnum
};
