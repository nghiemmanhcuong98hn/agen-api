class ApiError extends Error {
	constructor(status, message, stack = '') {
		super(message)
		this.status = status
		if (stack) {
			this.stack = stack
		} else {
			this.stack = Error.captureStackTrace(this, this.constructor)
		}
	}
}

module.exports = ApiError