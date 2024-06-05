const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
	body: Joi.object().keys({
		name: Joi.string().required().min(5).max(50),
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password)
	})
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password)
	})
};

const forgotPassword = {
	body: Joi.object().keys({
		email: Joi.string().required().email()
	})
};

module.exports = {
	register,
	login,
	forgotPassword
};
