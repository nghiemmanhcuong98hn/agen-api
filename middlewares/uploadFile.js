const multer = require('multer');
const messages = require('../configs/messages');

const handleMulterErrors = (req, res, next, upload) => {
	upload(req, res, function (err) {
		if (err) {
			let errorMessage;
			if (err instanceof multer.MulterError) {
				// Multer-specific errors
				switch (err.code) {
					case 'LIMIT_FILE_SIZE':
						errorMessage = messages.validate.file.max_size;
						break;
					case 'LIMIT_FILE_COUNT':
						errorMessage = messages.validate.file.max_count;
						break;
					case 'LIMIT_UNEXPECTED_FILE':
						errorMessage = messages.validate.file.max_count;
						break;
					default:
						errorMessage = messages.validate.file.default;
				}
			} else if (err) {
				// General errors
				errorMessage = messages.validate.file.default;
			}
			return res.status(400).json({ error: errorMessage });
		}
		// No errors, proceed to the next middleware/controller
		next();
	});
};

const uploadFile = upload => (req, res, next) => {
	handleMulterErrors(req, res, next, upload);
};

module.exports = { uploadFile };
