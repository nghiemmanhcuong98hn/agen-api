const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const verifyToken = (req, res, next) => {
	// get token form header
	const authHeader = req.header('Authorization');
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		res.status(httpStatus.BAD_REQUEST).json({
			success: false,
			message: 'Access token not found.'
		});
	}

	try {
		const decoded = jwt.verify(token, config.jwt.secret);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(httpStatus.FORBIDDEN).json({
			success: false,
			message: 'Invalid Token.'
		});
	}
};

module.exports = verifyToken;
