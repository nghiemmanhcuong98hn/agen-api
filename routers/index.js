const express = require('express')
const authRouter = require('./auth.route')
const contactRouter = require('./contact.route')
const orderRouter = require('./order.route')
const invoiceRouter = require('./invoice.route')

const router = express.Router()

const routers = [
	{
		path: '/auth',
		route: authRouter
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
		path: '/invoice',
		route: invoiceRouter
	},
]

routers.forEach(route => {
	router.use(route.path, route.route)
})

module.exports = router
