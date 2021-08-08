const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', checkRoleMiddleware('ADMIN'), userController.registration)
router.post('/login', userController.login)
router.post('/changeclassroom', userController.changeClassroom)
router.get('/auth', userController.check)

module.exports = router