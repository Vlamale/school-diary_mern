const Router = require('express')
const router = new Router()
const subjectController = require('../controllers/SubjectController')

router.get('/', subjectController.getAll)
router.post('/', subjectController.create)

module.exports = router