const path = require('path')
const Mark = require('../models/mark')
const User = require('../models/user')
const ApiError = require('../error/ApiError')

class DiaryController {
    async getUserMarks(req, res) {
        const { id } = req.params
        const marks = await Mark.find({ userId: id })
        return res.json({ marks })
    }

    async getSubjectMarks(req, res) {
        const { subjectId } = req.query
        const marks = await Mark.find({ subjectId })

        return res.json({ marks })
    }

    async getClassromMarks(req, res) {
        const { classroomNumber, classroomLetter } = req.query
        let marks
        if (!classroomNumber) {
            marks = await Mark.find({ classroomLetter })
        } else if (!classroomLetter) {
            marks = await Mark.find({ classroomNumber })
        } else {
            marks = await Mark.find({ classroomNumber, classroomLetter })
        }
        return res.json({ marks })
    }

    async addMark(req, res, next) {
        try {
            const { mark, userId, subjectId, classroomId, createdAt } = req.body

            const user = await User.findById(userId)

            if (!user.classroomNumber || !user.classroomLetter) {
                return
            }
            const markOnThisDay = await Mark.findOne({ 
                userId, 
                subjectId, 
                createdAt: {
                    $gte: new Date(new Date().toISOString().split('T')[0]).toISOString()
                }
            })
             
            if (markOnThisDay) {
                return next(ApiError.badRequest('Mark on this day for this subject alredy exist!'))
            }
            const createMark = await Mark.create({
                mark,
                userId,
                subjectId,
                classroomId,
                classroomNumber: user.classroomNumber,
                classroomLetter: user.classroomLetter,
                createdAt
            })
            return res.json({ createMark })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new DiaryController()