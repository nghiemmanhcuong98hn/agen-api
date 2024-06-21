const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const brandRouter = require('./brand.route');
const productRouter = require('./product.route');
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
		route: userRouter,
	},
	{
		path: '/brand',
		route: brandRouter,
	},
	{
		path: '/product',
		route: productRouter,
	}
];

routers.forEach(route => {
	if (!route.ignoreToken) {
		router.use(route.path,verifyToken, route.route);
	} else {
		router.use(route.path, route.route);
	}
});

module.exports = router;
