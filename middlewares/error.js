const httpStatus = require('http-status')
const config = require('../configs/config')
const logger = require('../configs/logger')

const errorHandler = (err, req, res, next) => {
	// Đặt mặc định mã trạng thái là 500 nếu không có mã trạng thái
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'

	if (config.env === 'development') {
		logger.error(err)
	}

	// Gửi phản hồi lỗi cho client
	res.status(statusCode).json({
		status: 'error',
		statusCode: statusCode,
		message: message,
		// Hiển thị stack trace nếu đang ở môi trường phát triển
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
	})
}

module.exports = {
	errorHandler
}
