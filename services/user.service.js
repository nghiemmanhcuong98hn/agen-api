const httpStatus = require('http-status');
const User = require('../models/user.modal');

/**
 * create user
 * @param {Object} userBody
 * @return {Promise<User>}
 */

const createUser = async userBody => {
	if (await User.isEmailTaken(userBody.email)) {
		throw new Error('Email already taken');
	}
	return User.create(userBody);
};


module.exports = {
    createUser
}