const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../configs/config');

const generateToken = (userId, expiresIn) => {
	const payload = {
		userId,
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
