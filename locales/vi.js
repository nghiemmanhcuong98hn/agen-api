const config = require('../configs/config')

module.exports = {
	validate: {
		required: {
			file:'Không có tập tin nào được tải lên.',
			email: 'Email là bắt buộc.',
			name: 'Tên người dùng là bắt buộc.',
			password: 'Mật khẩu là bắt buộc.',
			phone: 'Số điện thoại là bắt buộc.',
			address: 'Địa chỉ là bắt buộc.',
			brand_name: 'Tên thương hiệu là bắt buộc.',
			contact_name: 'Tên người gửi là bắt buộc.',
			contact_content: 'Nội dung liên hệ là bắt buộc.',
			contact_is_reply: 'Trạng thái trả lời liên hệ là bắt buộc.',
			blog_category_name: 'Tên danh mục bài viết là bắt buộc.',
			product_name: 'Tên sản phẩm là bắt buộc.',
			product_description: 'Mô tả sản phẩm là bắt buộc.',
			product_brand: 'Thương hiệu sản phẩm là bắt buộc.',
			product_image: 'Ảnh sản phẩm là bắt buộc.',
			product_price: 'Giá sản phẩm là bắt buộc.',
			product_capacities:'Dung tích là bắt buộc.',
			product_sex:'Giới tính sử dụng là bắt buộc.',
			product_flavor_tone:'Tông hương là bắt buộc.',
			product_top_scent:'Hương đầu là bắt buộc.',
			product_release_date:'Năm xuất bản là bắt buộc.',
			product_age:'Độ tuổi sử dụng là bắt buộc.',
			product_odor_retention:'Độ lưu mùi là bắt buộc.',
			product_odor_retention_form:'Độ lưu mùi trong khoảng từ là bắt buộc.',
			product_odor_retention_to:'Độ lưu mùi đến khoảng là bắt buộc.',
			product_season:'Lưu hương theo mùa là bắt buộc.',
			product_season_spring:'Lưu hương theo mùa xuấn là bắt buộc.',
			product_season_summer:'Lưu hương theo mùa hạ là bắt buộc.',
			product_season_autumn:'Lưu hương theo mùa thu là bắt buộc.',
			product_season_winter:'Lưu hương theo mùa đông là bắt buộc.',
			product_season_time:'Thời gian sử dụng là bắt buộc.',
			product_season_time_day:'Thời gian sử dụng buổi sáng là bắt buộc.',
			product_season_time_night:'Thời gian sử dụng buổi tối là bắt buộc.',
			blog_title:'Tiếu đề bài viết là bắt buộc.',
			blog_content:'Nội dung bài viết là bắt buộc.',
			blog_image:'Ảnh bài viết là bắt buộc.',
		},
		format: {
			email: 'Email không hợp lệ.',
			password: 'Mật khẩu không hợp lệ.',
			password2: 'Mật khẩu cần dài ít nhất 8 ký tự và có ít nhất 1 chữ hoa 1 chữ thường.',
			phone: 'Số điện thoại không hợp lệ.',
			role: 'Quyền không hợp lệ.',
			product_price: 'Giá sản phẩm không hợp lệ.',
			product_flavor_tone: 'Tông hương không hợp lệ.',
			product_top_scent: 'Hương đầu không hợp lệ.',
			product_middle_scent: 'Hương giữa không hợp lệ.',
			product_final_scent: 'Hương cuối không hợp lệ.',
			product_release_date:' Năm xuất bản không hợp lệ.',
			product_age:'Độ tuổi sử dụng không hợp lệ.',
			product_odor_retention:'Độ lưu mùi không hợp lệ.',
			product_odor_retention_form:'Độ lưu mùi trong khoảng từ không hợp lệ.',
			product_odor_retention_to:'Độ lưu mùi đến khoảng không hợp lệ.',
			product_season:'Lưu hương theo mùa không hợp lệ.',
			product_season_spring:'Lưu hương theo mùa xuấn không hợp lệ phải trong khoảng từ 0->100.',
			product_season_summer:'Lưu hương theo mùa hạ không hợp lệ phải trong khoảng từ 0->100.',
			product_season_autumn:'Lưu hương theo mùa thu không hợp lệ phải trong khoảng từ 0->100.',
			product_season_winter:'Lưu hương theo mùa đông không hợp lệ phải trong khoảng từ 0->100.',
			product_season_time:'Thời gian sử dụng không hợp lệ.',
			product_season_time_day:'Thời gian sử dụng buổi sáng không hợp lệ phải trong khoảng từ 0->100.',
			product_season_time_night:'Thời gian sử dụng buổi tối không hợp lệ phải trong khoảng từ 0->100.',
			product_capacities:'Dung tích phải là một trong ',
			product_sex:'Giới tính sử dụng phải là một trong ',
		},
		empty:{
			email: 'Email không được để trống.',
			name: 'Tên người dùng không được để trống.',
			phone: 'Số điện thoại không được để trống.',
			product_brand: 'Thương hiệu sản phẩm không được để trống.',
			product_description: 'Mô tả sản phẩm không được để trống.',
			product_name: 'Tên sản phẩm không được để trống.',
			product_price: 'Giá sản phẩm không được để trống.',
			product_flavor_tone:'Tông hương không được để trống.',
			product_top_scent:'Hương đầu không được để trống.',
			product_release_date:' Năm xuất bản không được để trống.',
		},
		min: {
			name: 'Tên người dùng phải có ít nhất {#limit} ký tự.',
			address: 'Địa chỉ người dùng phải có ít nhất {#limit} ký tự.',
			brand_name: 'Tên thương hiệu phải có ít nhất {#limit} ký tự.',
			product_sex:'Phải có ít nhất 1 giới tính sử dụng được chọn.',
			product_name: 'Tên sản phẩm phải có ít nhất {#limit} ký tự.',
			product_description: 'Mô tả sản phẩm phải có ít nhất {#limit} ký tự.',
			product_capacities:'Phải có ít nhất 1 dung tích được chọn.',
			blog_category_name: 'Tên danh mục bài viết phải có ít nhất {#limit} ký tự.',
			blog_title:'Tiếu đề bài viết phải có ít nhất {#limit} ký tự.',
		},
		max: {
			name: 'Tên người dùng không được quá {#limit} ký tự.',
			address: 'Địa chỉ người dùng không được quá {#limit} ký tự.',
			brand_name: 'Tên thương hiệu không được quá {#limit} ký tự.',
			product_name: 'Tên sản phẩm không được quá {#limit} ký tự.',
			product_description: 'Mô tả sản phẩm không được quá {#limit} ký tự.',
			blog_category_name: 'Tên danh mục bài viết không được quá {#limit} ký tự.',
			blog_title:'Tiếu đề bài viết không được quá {#limit} ký tự.',
			contact_content:'Nội dung liên hệ không được quá {#limit} ký tự.',
		},
		file:{
			max_size:`Tệp quá lớn. Kích thước tối đa là ${config.cloudinary.limitFileSize}MB.`,
			max_count:`Quá nhiều tập tin. Tối đa là ${config.cloudinary.limitFiles} tập tin.`,
			format:'Định dạng tệp không mong muốn.',
			default:'Đã xảy ra lỗi khi tải tệp lên. Vui lòng thử lại.'
		},
		email_already_taken: 'Email này đã được sử dụng.',
		brand_name_already_taken:'Tên thương hiệu này đã được sử dụng.',
		blog_category_name_already_taken:'Tên danh mục bài viết này đã được sử dụng.',
		token_invalid:'Mã token không hợp lệ.',
		user_notfound:'Không tìm thấy tài khoản.',
		brand_notfound:'Không tìm thấy thương hiệu.',
		product_notfound:'Không tìm thấy sản phẩm.',
		token_notfound:'Không tìm thấy mã token truy cập.',
		blog_category_notfound:'Không tìm thấy danh mục bài viết.',
		blog_notfound:'Không tìm thấy bài viết.',
		contact_notfound:'Không tìm thấy liên hệ nào.',
	}
};
