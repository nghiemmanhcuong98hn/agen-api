const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envSchema = Joi.object().keys({
	PORT: Joi.number().default(3000),
	MONGODB_URL: Joi.string().required().description('Mongo DB url'),
	JWT_SECRET: Joi.string().required().description('JWT secret key'),
	JWT_REFRESH_TOKEN_EXPIRATION_DAYS: Joi.number()
		.default(30)
		.description('days after which refresh tokens expire'),
	JWT_TOKEN_EXPIRATION_MINUTES: Joi.number()
		.default(60)
		.description('minutes after which tokens expire'),
	JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
		.default(10)
		.description('minutes after which reset password token expires'),
	SMTP_HOST: Joi.string().description('server that will send the emails'),
	SMTP_PORT: Joi.number().description('port to connect to the email server'),
	SMTP_USERNAME: Joi.string().description('username for email server'),
	SMTP_PASSWORD: Joi.string().description('password for email server'),
	EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app')
});

const { value: envVars } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongoose: {
		url: envVars.MONGODB_URL,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	},
	jwt: {
		secret: envVars.JWT_SECRET,
		refreshTokenExpirationDays: envVars.JWT_REFRESH_TOKEN_EXPIRATION_DAYS,
		tokenExpirationMinutes: envVars.JWT_TOKEN_EXPIRATION_MINUTES,
		resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES
	},
	email: {
		smtp: {
			host: envVars.SMTP_HOST,
			port: envVars.SMTP_PORT,
			auth: {
				user: envVars.SMTP_USERNAME,
				pass: envVars.SMTP_PASSWORD
			}
		},
		from: envVars.EMAIL_FROM
	}
};
