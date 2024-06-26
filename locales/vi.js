module.exports = {
	validate: {
		required: {
			email: 'Email là bắt buộc.',
			name: 'Tên người dùng là bắt buộc.',
			password: 'Mật khẩu là bắt buộc.',
			phone: 'Số điện thoại là bắt buộc.',
			address: 'Địa chỉ là bắt buộc.',
		},
		format: {
			email: 'Email không hợp lệ.',
			password: 'Mật khẩu không hợp lệ.',
			password2: 'Mật khẩu cần dài ít nhất 8 ký tự và có ít nhất 1 chữ hoa 1 chữ thường.',
			phone: 'Số điện thoại không hợp lệ.',
			role: 'Quyền không hợp lệ.',
		},
		empty:{
			email: 'Email không được để trống.',
			name: 'Tên người dùng không được để trống.',
			phone: 'Số điện thoại không được để trống.',
		},
		min: {
			name: 'Tên người dùng phải có ít nhất {#limit} ký tự.',
			address: 'Địa chỉ người dùng phải có ít nhất {#limit} ký tự.',
		},
		max: {
			name: 'Tên người dùng không được quá {#limit} ký tự.',
			address: 'Địa chỉ người dùng không được quá {#limit} ký tự.',
		},
		email_already_taken: 'Email này đã được sử dụng.',
		user_notfound:'Không tìm thấy tài khoản.'
	}
};
