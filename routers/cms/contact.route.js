const express = require('express');
const validate = require('../../middlewares/validate');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');
const router = express.Router();

router.get('/', validate(contactValidation.list), contactController.listContacts);
router.get('/trash', validate(contactValidation.list), contactController.listTrashContacts);
router.get('/:contactId', contactController.detailContact);
router.put('/:contactId', validate(contactValidation.updateStatus), contactController.updateStatusContact);
router.put('/restore/:contactId', contactController.restoreContact);
router.delete('/:contactId', contactController.deleteContact);
router.delete('/destroy/:contactId', contactController.destroyContact);

module.exports = router;
