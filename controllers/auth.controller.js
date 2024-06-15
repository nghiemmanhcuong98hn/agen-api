const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const httpStatus = require('http-status');

const login = catchAsync(async (req, res) => {
	const user = await authService.loginWithEmailAndPassword(req.body);
	const token = await tokenService.generateToken(user?._id);
	res.status(httpStatus.OK).send({
		user,
		token
	});
});

const loginCms = catchAsync(async (req, res) => {
	const user = await authService.loginWithEmailAndPasswordCms(req.body);
	const {token,refreshToken} = await tokenService.generateTokens(user?._id);
	res.status(httpStatus.OK).send({
		user,
		token,
		refreshToken
	});
});

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	const token = await tokenService.generateToken(user?._id);
	res.status(httpStatus.CREATED).send({
		user,
		token
	});
});

module.exports = {
	login,
	loginCms,
	register
};
