const express = require('express')
const authRouter = require('./auth.route')

const router = express.Router()

const routers = [
	{
		path: '/auth',
		route: authRouter
	}
]

routers.forEach(route => {
	router.use(route.path, route.route)
})

module.exports = router
