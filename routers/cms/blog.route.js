const express = require('express');
const validate = require('../../middlewares/validate');
const blogValidation = require('../../validations/blog.validation');
const blogController = require('../../controllers/blog.controller');
const { uploadFile } = require('../../middlewares/uploadFile');
const { uploadCloudinary } = require('../../utils/cloudinary');
const router = express.Router();

router.get('/', validate(blogValidation.list), blogController.listBlogs);
router.get('/trash', validate(blogValidation.list), blogController.listTrashBlogs);
router.get('/:blogId', blogController.detailBlog);
router.post('/',uploadFile(uploadCloudinary.single('file')),validate(blogValidation.create), blogController.createBlog);
router.put('/:blogId',uploadFile(uploadCloudinary.single('file')), validate(blogValidation.update), blogController.updateBlog);
router.put('/restore/:blogId', blogController.restoreBlog);
router.delete('/:blogId', blogController.deleteBlog);
router.delete('/destroy/:blogId', blogController.destroyBlog);

module.exports = router;
