const express = require('express');
const validate = require('../../middlewares/validate');
const brandValidation = require('../../validations/brand.validation');
const brandController = require('../../controllers/brand.controller');
const upload = require('../../utils/upload');
const router = express.Router();

router.get('/', validate(brandValidation.list), brandController.listBrand);
router.get('/trash', validate(brandValidation.list), brandController.listTrashBrand);
router.get('/:brandId', brandController.detailBrand);
router.post('/', validate(brandValidation.create), brandController.createBrand);
router.post('/import',upload.single('file'), brandController.importBrands);
router.put('/:brandId', validate(brandValidation.update), brandController.updateBrand);
router.delete('/:brandId', brandController.deleteBrand);
router.delete('/destroy/:brandId', brandController.destroyBrand);

module.exports = router;
