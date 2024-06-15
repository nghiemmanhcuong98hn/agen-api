const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).send(user);
});

const listUsers = catchAsync(async (req,res) => {
	const filter = pick(req.query,['name','email','phone','createdAt'])
	const options = pick(req.query,['sortBy','limit','page'])
	const users = await userService.getListUser(filter,options);
	res.status(httpStatus.CREATED).send(users);
})

module.exports = {
	createUser,
	listUsers
};
