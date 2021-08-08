const Router = require('express')
const router = new Router()
const schoolController = require('../controllers/SchoolController')

router.get('/', schoolController.getAll)
router.post('/', schoolController.create)

module.exports = router