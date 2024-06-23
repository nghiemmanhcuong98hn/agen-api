const config = require('../configs/config')

module.exports = {
	validate: {
		required: {
			email: 'Email is required.',
			name: 'Username is required.',
			password: 'Password is required.'
		},
		format: {
			email: 'Invalid email.'
		},
		min: {
			name: 'Username must be at least {#limit} characters.'
		},
		max: {
			name: 'Username must not exceed {#limit} characters.'
		}
	}
};
