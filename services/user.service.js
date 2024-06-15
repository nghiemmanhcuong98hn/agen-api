const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.modal');
const roles = require('../configs/roles');

/**
 * create user
 * @param {Object} userBody
 * @return {Promise<User>}
 */

const createUser = async userBody => {
	if (await User.isEmailTaken(userBody.email)) {
		throw new ApiError(httpStatus.CONFLICT, 'Email này đã được sử dụng.');
	}
	const res = await User.create({ ...userBody, role: roles.admin });
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

/**
 *
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<User>}
 */
const getListUser = async (filter, options) => {
	return User.paginate(filter, options);
};

module.exports = {
	createUser,
	getUserByEmail,
	getUserById,
	getListUser
};
