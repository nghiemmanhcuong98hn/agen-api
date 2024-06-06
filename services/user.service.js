const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.modal');

/**
 * create user
 * @param {Object} userBody
 * @return {Promise<User>}
 */

const createUser = async userBody => {
	if (await User.isEmailTaken(userBody.email)) {
		throw new ApiError(httpStatus.CONFLICT, 'Email này đã được sử dụng.');
	}
	const res = await User.create(userBody);
	const { password, ...user } = res._doc;
	return user;
};

/**
 *
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async email => {
	return User.findOne({ email });
};

/**
 *
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getUserById = async userId => {
	return User.findById(userId);
};

module.exports = {
	createUser,
	getUserByEmail,
	getUserById
};
