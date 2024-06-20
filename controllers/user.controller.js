const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const exportService = require('../services/file.service');
const httpStatus = require('http-status');
const { pickFilter, pick } = require('../utils/pick');
const { filterTypes } = require('../configs/settings');

const createUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
	const userId = req.params.userId;
	const user = await userService.updateUser(userId, req.body);
	res.status(httpStatus.OK).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
	await userService.deleteUser(req.userId,req.params.userId);
	res.status(httpStatus.OK).send(true);
});

const destroyUser = catchAsync(async (req, res) => {
	await userService.destroyUser(req.params.userId);
	res.status(httpStatus.OK).send(true);
});

const listUsers = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
		'email',
		'phone',
		'role'
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const users = await userService.getListUser(filter, options);
	res.status(httpStatus.OK).send(users);
});

const listTrashUsers = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
		'email',
		'phone',
		'role'
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const users = await userService.getListTrashUser(filter, options);
	res.status(httpStatus.OK).send(users);
})

const detailUser = catchAsync(async (req, res) => {
	const userId = req.params.userId;
	const user = await userService.getUserById(userId);
	res.status(httpStatus.OK).send(user);
})

const exportUserToFileExcel  = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
		'email',
		'phone',
		'role'
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const users = await userService.getListUserExport(filter, options);
	const excelBuffer = await exportService.exportFileExcel(users,res)
	res.send(excelBuffer);
})

module.exports = {
	createUser,
	listUsers,
	updateUser,
	deleteUser,
	listTrashUsers,
	detailUser,
	exportUserToFileExcel,
	destroyUser
};
