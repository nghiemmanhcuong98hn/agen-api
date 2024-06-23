const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const messages = require('../configs/messages');

const verifyToken = (req, res, next) => {
	// get token form header
	const authHeader = req.header('Authorization');
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		res.status(httpStatus.BAD_REQUEST).json({
			success: false,
			message: messages.validate.token_notfound
		});
	}

	try {
		const decoded = jwt.verify(token, config.jwt.secret);
		if(req.baseUrl.includes('api/cms') && decoded.role === 'user'){
			res.status(httpStatus.FORBIDDEN).json({
				success: false,
				message: messages.validate.token_invalid
			});
		}
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(httpStatus.FORBIDDEN).json({
			success: false,
			message: messages.validate.token_invalid
		});
	}
};

module.exports = verifyToken;
