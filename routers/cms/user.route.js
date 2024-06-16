const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const verifyToken = require('../../middlewares/verifyToken')
const router = express.Router();

router.get('/', verifyToken,validate(userValidation.listUser), userController.listUsers);
router.get('/trash', verifyToken,validate(userValidation.listUser), userController.listTrashUsers);
router.get('/export-excel',verifyToken, userController.exportUserToFileExcel);
router.get('/:userId', verifyToken, userController.detailUser);
router.post('/', verifyToken,validate(userValidation.createUser), userController.createUser);
router.put('/:userId', verifyToken,validate(userValidation.updateUser), userController.updateUser);
router.delete('/:userId', verifyToken, userController.deleteUser);

module.exports = router;
