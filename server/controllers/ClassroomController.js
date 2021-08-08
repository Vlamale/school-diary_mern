const Classroom = require('../models/classroom')

class ClassroomController {
    async create(req, res) {
        const {
            classroomNumber,
            classroomLetter,
            schoolId
        } = req.body
        const classroom = Classroom.create({
            classroomNumber,
            classroomLetter,
            schoolId
        })
        return res.json(classroom)
    }

    async getAll(_, res) {
        const classrooms = await Classroom.find()
        return res.json(classrooms)
    }

    async getOne(req, res) {
        const {id} = req.query
        const classroom = await Classroom.find({_id: id})
        return res.json(classroom)
    }
}

module.exports = new ClassroomController