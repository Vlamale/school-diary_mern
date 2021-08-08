const Subject = require('../models/subject')

class SubjectController {
    async getAll(req, res) {
        const subjects = await Subject.find()
        return res.json(subjects)
    }
    async create(req, res) {
        const {subjectName} = req.body
        const subject = await Subject.create({subjectName})
        return res.json(subject)
    }
}

module.exports = new SubjectController()