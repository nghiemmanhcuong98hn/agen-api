const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status');

const createUser = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.status(httpStatus.CREATED).send(user);
});

module.exports = {
	createUser
};
