const Joi = require('joi');
const httpStatus = require('http-status');
const { pick } = require('../utils/pick');
const { privateKeys } = require('../configs/settings');

const validate = schema => (req, res, next) => {
	const validSchema = pick(schema, ['params', 'query', 'body']);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object);

	if (error) {
		const errors = error.details.reduce((acc, err) => {
			const key = err.path[1];
			if (privateKeys.includes(key)) {
				acc[`message`] = err.message;
			} else {
				acc[key] = err.message;
			}
			return acc;
		}, {});
		return res.status(httpStatus.BAD_REQUEST).json({ errors: errors });
	}
	Object.assign(req, value);
	return next();
};

module.exports = validate;
