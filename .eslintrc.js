module.exports = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 2021
	},
	extends: ['eslint:recommended'],
	rules: {
		// Các quy tắc tuỳ chỉnh
		// Ví dụ:
		'no-console': 'on', // Cảnh báo console.log
		'no-unused-vars': 'warn', // Cảnh báo biến không được sử dụng,
		// Quy tắc liên quan đến việc sử dụng dấu chấm phẩy
		semi: ['error', 'always'], // Luôn sử dụng dấu chấm phẩy sau mỗi câu lệnh
		'comma-dangle': ['error', 'always-multiline'], // Luôn có dấu phẩy cuối cùng trong danh sách các phần tử dưới dạng nhiều dòng

		// Quy tắc liên quan đến việc định dạng mã nguồn
		indent: ['error', 2], // Sử dụng 2 khoảng trắng cho mỗi cấp độ lồng nhau
		quotes: ['error', 'single'], // Sử dụng dấu nháy đơn cho chuỗi
		'linebreak-style': ['error', 'unix'], // Sử dụng xuống dòng unix (\n) thay vì windows (\r\n)
		'no-trailing-spaces': 'error', // Loại bỏ các khoảng trắng cuối dòng không cần thiết
		'no-multiple-empty-lines': ['error', { max: 1 }], // Chỉ cho phép tối đa 1 dòng trống liên tiếp
		'object-curly-spacing': ['error', 'always'], // Luôn thêm khoảng trắng trước và sau dấu ngoặc đơn trong các đối tượng

		// Quy tắc liên quan đến việc sử dụng biến và các khai báo
		'no-unused-vars': 'error', // Cảnh báo nếu có biến không được sử dụng
		'no-undef': 'error', // Cảnh báo nếu sử dụng biến chưa được khai báo

		// Quy tắc liên quan đến việc sử dụng hàm async/await
		'require-await': 'error', // Cảnh báo nếu sử dụng hàm async mà không có từ khóa await
		'no-return-await': 'error', // Cảnh báo nếu không cần thiết sử dụng từ khóa await trong câu lệnh return

		// Quy tắc liên quan đến việc xử lý lỗi
		'no-throw-literal': 'error', // Cảnh báo nếu ném một giá trị không phải là đối tượng Error
		'handle-callback-err': 'error', // Cảnh báo khi không xử lý lỗi trong callback

		// Quy tắc liên quan đến việc sử dụng Mongoose và MongoDB
		'node/no-missing-require': 'off'
	},
	overrides: [
		{
			files: ['*.js'],
			excludedFiles: 'node_modules',
			extends: ['plugin:node/recommended'],
			rules: {
				// Các quy tắc tuỳ chỉnh cho các tệp JavaScript
				// Ví dụ:
				'node/no-unpublished-require': 'off', // Bỏ qua cảnh báo require chưa được xuất bản
				'node/no-missing-require': 'off', // Bỏ qua cảnh báo require bị thiếu
				'node/no-missing-require': 'off', // Cho phép sử dụng require cho các module chưa được cài đặt
				'node/no-unpublished-require': 'off', // Cho phép sử dụng require cho các module chưa được xuất bản
				'node/no-extraneous-require': 'off', // Cho phép sử dụng require cho các module không cần thiết
				'node/no-unpublished-import': 'off', // Cho phép import các module chưa được xuất bản
				'node/no-extraneous-import': 'off', // Cho phép import các module không cần thiết

				// Quy tắc liên quan đến việc sử dụng cú pháp async/await
				'node/no-callback-literal': 'error', // Cảnh báo khi sử dụng callback với giá trị không phải là hàm
				'node/exports-style': ['error', 'module.exports'], // Yêu cầu sử dụng `module.exports` thay vì `exports` để xuất module

				// Quy tắc liên quan đến việc sử dụng cú pháp khai báo
				'node/prefer-global/buffer': ['error', 'always'], // Yêu cầu sử dụng `global.Buffer` thay vì `Buffer`
				'node/prefer-global/console': ['error', 'always'], // Yêu cầu sử dụng `global.console` thay vì `console`
				'node/prefer-global/process': ['error', 'always'], // Yêu cầu sử dụng `global.process` thay vì `process`
				'node/prefer-global/url': ['error', 'always'], // Yêu cầu sử dụng `global.URL` thay vì `URL`
				'node/prefer-global/url-search-params': ['error', 'always'] // Yêu cầu sử dụng `global.URLSearchParams` thay vì `URLSearchParams`
			}
		}
	],
	plugins: ['node']
}
