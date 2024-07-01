const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const brandRouter = require('./brand.route');
const productRouter = require('./product.route');
const blogCategoryRouter = require('./blog_category.route');
const blogRouter = require('./blog.route');
const contactRouter = require('./contact.route');
const orderRouter = require('./order.route');
const statisticalRouter = require('./statistical.route');
const shopRouter = require('./shop.route');
const invoiceRouter = require('./invoice.route');
const verifyToken = require('../../middlewares/verifyToken');

const router = express.Router();

const routers = [
	{
		path: '/auth',
		route: authRouter,
		ignoreToken: true
	},
	{
		path: '/user',
		route: userRouter
	},
	{
		path: '/brand',
		route: brandRouter
	},
	{
		path: '/product',
		route: productRouter
	},
	{
		path: '/blog-category',
		route: blogCategoryRouter
	},
	{
		path: '/blog',
		route: blogRouter
	},
	{
		path: '/contact',
		route: contactRouter
	},
	{
		path: '/order',
		route: orderRouter
	},
	{
		path: '/statistical',
		route: statisticalRouter
	},
	{
		path: '/shop',
		route: shopRouter
	},
	{
		path: '/invoice',
		route: invoiceRouter
	}
];

routers.forEach(route => {
	if (!route.ignoreToken) {
		router.use(route.path, verifyToken, route.route);
	} else {
		router.use(route.path, route.route);
	}
});

module.exports = router;
