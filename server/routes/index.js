const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const subjectRouter = require('./subjectRouter')
const diaryRouter = require('./diaryRouter')
const schoolRouter = require('./schoolRouter')
const classroomRouter = require('./classroomRouter')

router.use('/user', userRouter)
router.use('/subject', subjectRouter)
router.use('/diary', diaryRouter)
router.use('/school', schoolRouter)
router.use('/classroom', classroomRouter)

module.exports = router