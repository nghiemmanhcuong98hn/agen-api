const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router.get('/',validate(userValidation.listUser), userController.listUsers);
router.get('/trash',validate(userValidation.listUser), userController.listTrashUsers);
router.get('/export', userController.exportUserToFileExcel);
router.get('/:userId', userController.detailUser);
router.post('/',validate(userValidation.createUser), userController.createUser);
router.put('/:userId',validate(userValidation.updateUser), userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.delete('/destroy/:userId', userController.destroyUser);

module.exports = router;
