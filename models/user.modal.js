const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: 5,
			maxLength: 50,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate: {
				validator: function (v) {
					return validator.isEmail(v);
				},
				message: props => `${props.value} invalid email!`
			}
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
			select: false,
			validate: {
				validator: function (v) {
					return v.match(/\d/) || v.match(/[a-zA-Z]/);
				},
				message: () => 'Password must contain at least one letter and one number'
			}
		}
	},
	{
		timestamps: true
	}
);

userSchema.statics.isEmailTaken = async function (email) {
	const user = await this.findOne({ email });
	return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
