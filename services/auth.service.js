const User = require('../models/user.modal');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');
const httpStatus = require('http-status');

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns {User}
 */
const loginWithEmailAndPassword = async body => {
	const user = await userService.getUserByEmail(body.email);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Email chưa được đăng ký.');
	}

	if (!(await user.comparePassword(body.password))) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Mật khẩu không chính xác.');
	}
	const { password, ...userInfo } = user._doc;
	return userInfo;
};

module.exports = {
	loginWithEmailAndPassword
};
