const express = require('express');
const validate = require('../../middlewares/validate');
const blogCategoryValidation = require('../../validations/blog_category.validation');
const blogCategoryController = require('../../controllers/blog_category.controller');
const upload = require('../../middlewares/upload');
const router = express.Router();

router.get('/', validate(blogCategoryValidation.list), blogCategoryController.listBlogCategories);
router.get('/trash', validate(blogCategoryValidation.list), blogCategoryController.listTrashBlogCategories);
router.get('/export', validate(blogCategoryValidation.list), blogCategoryController.exportBlogCategories);
router.get('/:blogCategoryId', blogCategoryController.detailBlogCategory);
router.post('/', validate(blogCategoryValidation.create), blogCategoryController.createBlogCategory);
router.post('/import',upload.single('file'), blogCategoryController.importBlogCategories);
router.put('/:blogCategoryId', validate(blogCategoryValidation.update), blogCategoryController.updateBlogCategory);
router.put('/restore/:blogCategoryId', blogCategoryController.restoreBlogCategory);
router.delete('/:blogCategoryId', blogCategoryController.deleteBlogCategory);
router.delete('/destroy/:blogCategoryId', blogCategoryController.destroyBlogCategory);

module.exports = router;
