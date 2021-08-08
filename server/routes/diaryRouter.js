const Router = require('express')
const router = new Router()
const diaryController = require('../controllers/DiaryController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/:id', diaryController.getUserMarks)
router.get('/', diaryController.getSubjectMarks)
router.get('/', diaryController.getClassromMarks)
router.post('/', checkRoleMiddleware('ADMIN'), diaryController.addMark)


module.exports = router