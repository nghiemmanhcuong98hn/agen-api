const express = require('express')
const authRouter = require('./auth.route')
const userRouter = require('./user.route')

const router = express.Router()

const routers = [
	{
		path: '/auth',
		route: authRouter
	},
	{
		path: '/user',
		route: userRouter
	},
]

routers.forEach(route => {
	router.use(route.path, route.route)
})

module.exports = router
