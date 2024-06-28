const express = require('express');
const validate = require('../../middlewares/validate');
const shopValidation = require('../../validations/shop.validation');
const shopController = require('../../controllers/shop.controller');
const router = express.Router();

router.get('/', shopController.getShop);
router.post('/create', validate(shopValidation.create), shopController.createShop);
router.put('/update', validate(shopValidation.update), shopController.updateShop);

module.exports = router;
