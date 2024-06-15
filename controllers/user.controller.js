const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status');
const { pickFilter, pick } = require('../utils/pick');
const {filterTypes} = require('../configs/settings');

const createUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).send(user);
});

const listUsers = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
		'email',
		'phone',
		'role',
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const users = await userService.getListUser(filter, options);
	res.status(httpStatus.CREATED).send(users);
});

module.exports = {
	createUser,
	listUsers
};
