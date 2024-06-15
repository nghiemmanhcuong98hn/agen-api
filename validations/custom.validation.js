const messages = require('../configs/messages');

const password = (value, helpers) => {
	if (value.length < 8) {
		return helpers.message(messages.validate.format.password2);
	}
	if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
		return helpers.message(messages.validate.format.password2);
	}
	return value;
};

module.exports = {
	password
};
