const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../configs/config');
const roles = require('../configs/roles');

const generateToken = (userId, expiresIn,role = roles.user) => {
	const payload = {
		userId,
		role,
		iat: moment().unix(),
		exp: expiresIn ?? moment().add(1, 'year').unix()
	};

	return jwt.sign(payload, config.jwt.secret);
};

const generateTokens = (userId, expiresIn) => {
	
};

module.exports = {
	generateToken
};
