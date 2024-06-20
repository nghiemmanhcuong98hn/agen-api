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

module.exports = {
	privateKeys,
	filterTypes,
	mongooseDeleteOptions
};
