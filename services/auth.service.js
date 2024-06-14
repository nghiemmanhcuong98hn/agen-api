const httpStatus = require('http-status');
const User = require('../models/user.modal');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');
const roles = require('../configs/roles')

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
	return user;
};

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns {User}
 */
const loginWithEmailAndPasswordCms = async body => {
	const user = await userService.getUserByEmail(body.email);
	if (!user || user.role !== roles.admin) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Email chưa được đăng ký.');
	}

	if (!(await user.comparePassword(body.password))) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Mật khẩu không chính xác.');
	}
	return user;
};

module.exports = {
	loginWithEmailAndPassword,
	loginWithEmailAndPasswordCms
};
