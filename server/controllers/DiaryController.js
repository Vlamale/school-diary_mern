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
            const { mark, userId, subjectId } = req.body
            console.log(req.body)

            const user = await User.findById(userId)

            if (!user.classroomNumber || !user.classroomLetter) {
                return
            }
            const createdAt = new Date(new Date().toISOString().split('T')[0]).toISOString()
            const markOnThisDay = await Mark.findOne({ 
                userId, 
                subjectId, 
                createdAt: {
                    $gte: createdAt
                }
            })
             
            if (markOnThisDay) {
                return next(ApiError.badRequest('Mark on this day for this subject already exist!'))
            }
            const createdMark = await Mark.create({
                mark,
                userId,
                subjectId,
                classroomId: user.classroomId,
                classroomNumber: user.classroomNumber,
                classroomLetter: user.classroomLetter,
                createdAt
            })
            return res.json({ createdMark })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new DiaryController()