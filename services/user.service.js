const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const makeOptions = require('../utils/makeOptions');
const User = require('../models/user.modal');
const roles = require('../configs/roles');
const messages = require('../configs/messages');
const { default: mongoose } = require('mongoose');

/**
 *
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async email => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.user_notfound);
	}
	return user;
};

/**
 *
 * @param {string} userId
 * @returns {Promise<User>}
 */
const getUserById = async userId => {
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.user_notfound);
	}

	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.user_notfound);
	}
	return user;
};

/**
 * create user
 * @param {Object} userBody
 * @return {Promise<User>}
 */
const createUser = async userBody => {
	if (await User.isEmailTaken(userBody.email)) {
		throw new ApiError(httpStatus.CONFLICT, messages.validate.email_already_taken);
	}
	const res = await User.create({ ...userBody, role: roles.admin });
	const { password, ...user } = res._doc;
	return user;
};

/**
 * update user
 * @param {String} userId
 * @param {Object} userBody
 * @return {Promise<User>}
 */
const updateUser = async (userId, userBody) => {
	const user = await getUserById(userId);

	if ((await User.isEmailTaken(userBody.email)) && user.email !== userBody.email) {
		throw new ApiError(httpStatus.CONFLICT, messages.validate.email_already_taken);
	}
	return await User.findByIdAndUpdate(userId, userBody, { new: true, select: '-password' });
};

/**
 * delete user
 * @param {String} deleteBy
 * @param {String} userId
 * @return {Boolean}
 */
const deleteUser = async (deleteBy, userId) => {
	const user = await getUserById(userId);
	return await user.delete(deleteBy);
};

/**
 * get List User
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<User>}
 */
const getListUser = async (filter, options) => {
	return User.paginate(filter, options);
};

/**
 * get List User Export
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<User>}
 */
const getListUserExport = async (filter, options) => {
	const { limit, skip, sort } = makeOptions(options);
	let users = await User.find(filter, options)
		.select('-password')
		.lean()
		.sort(sort)
		.skip(skip)
		.limit(limit);
	users = users.map(user => {
		delete user.__v;
		return {
			...user,
			_id: user._id.toString(),
			deletedBy: user.deletedBy?.toString(),
		};
	});
	return users;
};

/**
 * get List Trash User
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<User>}
 */
const getListTrashUser = async (filter, options) => {
	// The 3rd argument allows getting only the middle trash list
	return User.paginate(filter, options, true);
};

/**
 * destroy user
 * @param {String} userId
 * @return {Promise<User>}
 */
const destroyUser = async (userId) => {
	return await User.deleteOne({_id: userId});
};

module.exports = {
	createUser,
	getUserByEmail,
	getUserById,
	getListUser,
	updateUser,
	deleteUser,
	getListTrashUser,
	getListUserExport,
	destroyUser
};
