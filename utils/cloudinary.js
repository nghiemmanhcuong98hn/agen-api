const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../configs/config');

cloudinary.config({
	cloud_name: config.cloudinary.name,
	api_key: config.cloudinary.key,
	api_secret: config.cloudinary.secret
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'agen_images',
		allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
		transformation: [
			{ width: 800, height: 600, crop: 'auto', fetch_format: 'auto', gravity: 'auto' }
		]
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

const uploadCloudinary = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 } });

module.exports = {
	uploadCloudinary
};
