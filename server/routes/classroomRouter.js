const Router = require('express')
const router = new Router
const ClassroomController = require('../controllers/ClassroomController')

router.get('/', ClassroomController.getAll)
router.post('/', ClassroomController.create)
router.get('/:id', ClassroomController.getOne)

module.exports = router