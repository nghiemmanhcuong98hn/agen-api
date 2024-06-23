const express = require('express')
const authRouter = require('./auth.route')
const contactRouter = require('./contact.route')

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
]

routers.forEach(route => {
	router.use(route.path, route.route)
})

module.exports = router
