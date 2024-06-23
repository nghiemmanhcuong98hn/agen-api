const express = require('express');
const validate = require('../middlewares/validate');
const contactValidation = require('../validations/contact.validation');
const contactController = require('../controllers/contact.controller');
const { uploadFile } = require('../middlewares/uploadFile');
const { uploadCloudinary } = require('../utils/cloudinary');
const router = express.Router();

router.post(
	'/',
	uploadFile(uploadCloudinary.single('file')),
	validate(contactValidation.create),
	contactController.createContact
);

module.exports = router;
