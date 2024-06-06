const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const roles = require('../configs/roles')

const UserSchema = mongoose.Schema(
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
			validate: {
				validator: function (v) {
					return v.match(/\d/) || v.match(/[a-zA-Z]/);
				},
				message: () => 'Password must contain at least one letter and one number'
			}
		},
		role:{
			type: String,
			enum : Object.values(roles),
			default: roles.user
		}
	},
	{
		timestamps: true
	}
);

UserSchema.statics.isEmailTaken = async function (email) {
	const user = await this.findOne({ email });
	return !!user;
};

UserSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
