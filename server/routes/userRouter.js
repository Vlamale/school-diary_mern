const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', checkRoleMiddleware('ADMIN'), userController.registration)
router.post('/login', userController.login)
router.post('/changeclassroom', userController.changeClassroom)
router.get('/auth', userController.check)
router.get('/all-users', userController.getUsersByRole)
router.get('/user-:id', userController.getUserById)
router.get('/classroom-:id', userController.getUserByClassroom)
router.get('/delete-user-:id', checkRoleMiddleware('ADMIN'), userController.deleteUser)

module.exports = router