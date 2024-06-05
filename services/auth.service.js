const User = require('../models/user.modal');

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
	const user = await User.findOne({ email });
};
