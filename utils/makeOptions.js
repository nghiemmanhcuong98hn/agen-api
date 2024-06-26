const makeOptions = options => {
	let sort = '';
	if (options.sortBy) {
		const sortingCriteria = [];
		options.sortBy.split(',').forEach(sortOption => {
			const [key, order] = sortOption.split(':');
			sortingCriteria.push((order === 'desc' ? '-' : '') + key);
		});
		sort = sortingCriteria.join(' ');
	} else {
		sort = 'createdAt';
	}

	const limit =
		options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
	const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
	const skip = (page - 1) * limit;

	return { sort, limit, skip };
};

module.exports = makeOptions;
