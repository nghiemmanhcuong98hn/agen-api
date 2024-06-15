const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../configs/config');
const roles = require('../configs/roles');

const generateToken = (userId, expiresIn, role = roles.user) => {
	const payload = {
		userId,
		role,
		iat: moment().unix(),
		exp: expiresIn ?? moment().add(1, 'year').unix()
	};

	return jwt.sign(payload, config.jwt.secret);
};

const generateTokens = userId => {
	const expiresInToken = moment().add(30, 'minutes').unix();
	const expiresInRefreshToken = moment().add(1, 'month').unix();
	const token = generateToken(userId, expiresInToken, roles.admin);
	const refreshToken = generateToken(userId, expiresInRefreshToken, roles.admin);

	return {
		token,
		refreshToken
	};
};

module.exports = {
	generateToken,
	generateTokens
};
