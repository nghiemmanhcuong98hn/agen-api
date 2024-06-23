const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const { uploadCloudinary } = require('../../utils/cloudinary');
const { uploadFile } = require('../../middlewares/uploadFile');
const router = express.Router();

router.get('/', validate(productValidation.list), productController.listProducts);
router.get('/trash', validate(productValidation.list), productController.listTrashProducts);
router.get('/:productId', productController.detailProduct);
router.post('/validate', validate(productValidation.create), productController.validateProduct);
router.post(
	'/',
	uploadFile(
		uploadCloudinary.fields([
			{ name: 'file', maxCount: 1 },
			{ name: 'files', maxCount: 3 }
		])
	),
	validate(productValidation.create),
	productController.createProduct
);
router.put(
	'/:productId',
	uploadFile(
		uploadCloudinary.fields([
			{ name: 'file', maxCount: 1 },
			{ name: 'files', maxCount: 3 }
		])
	),
	validate(productValidation.update),
	productController.updateProduct
);
router.put('/restore/:productId', productController.restoreProduct);
router.delete(
	'/:productId',
	validate(productValidation.deleteProduct),
	productController.deleteProduct
);
router.delete(
	'/destroy/:productId',
	validate(productValidation.deleteProduct),
	productController.destroyProduct
);

module.exports = router;
