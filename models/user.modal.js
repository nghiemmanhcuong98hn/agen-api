const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const roles = require('../configs/roles')
const messages = require('../configs/messages');
const { toJSON, paginate } = require('./plugins');

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
				message: props => messages.validate.format.email
			}
		},
		phone:{
			type: String,
			validate: {
				validator: function (v) {
					return validator.isMobilePhone(v);
				},
				message: props => messages.validate.format.phone
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
				message: () => messages.validate.format.password
			},
			private:true // used by the toJSON plugin
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

// add plugin that converts mongoose to json
UserSchema.plugin(toJSON);
UserSchema.plugin(paginate);

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
