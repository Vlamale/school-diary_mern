const School = require('../models/school')

class SchoolController {
    async getAll(req, res) {
        const schools = await School.find()
        return res.json(schools)
    }
    async create(req, res) {
        const {schoolName} = req.body
        const school = await School.create({schoolName})
        return res.json(school)
    }
}

module.exports = new SchoolController()