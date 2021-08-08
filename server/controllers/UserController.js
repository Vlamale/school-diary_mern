const User = require('../models/user')
const School = require('../models/school')
const Classroom = require('../models/classroom')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (data) => {
    return jwt.sign(
        data,
        process.env.JWT_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res) {
        const {
            email,
            password,
            firstname,
            surname,
            middleName,
            schoolName,
            schoolId,
            classroomNumber,
            classroomLetter,
            classroomId,
            role
        } = req.body

        if (!email || !password) {
            return
        }

        const candidate = await User.findOne({ email })

        if (candidate) {
            return
        }

        // const { _id } = await School.findOne({ schoolName })

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({
            email,
            password: hashPassword,
            role,
            firstname,
            surname,
            middleName,
            schoolName,
            schoolId,
            classroomNumber,
            classroomLetter,
            classroomId
        })
        const tokenData = {
            email,
            role: user.role,
            id: user._id,
            fullName: `${surname} ${firstname} ${middleName}`
        }

        const token = generateJwt(tokenData)
        return res.json({ token })
    }

    async login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return
        }
        const user = await User.findOne({ email })

        if (!user) {
            return new Error()
        }
        const comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return
        }
        const tokenData = {
            email,
            role: user.role,
            id: user._id,
            fullName: `${user.surname} ${user.firstname} ${user.middleName}`
        }
        const token = generateJwt(tokenData)
        return res.json({ token })
    }

    async changeClassroom(req, res) {
        const { classroomId, userIds } = req.body
        const idsArray = userIds.split(',')

        const newClass = await Classroom.find({ _id: classroomId })
        idsArray.forEach(async (_id) => {
            await User.findOneAndUpdate(
                { _id },
                {
                    classroomId: newClass._id,
                    classroomNumber: newClass.classroomNumber,
                    classroomLetter: newClass.classroomLetter
                },
                { new: true }
            )
        })

        return res.json('ok')
    }

    async check(req, res) {
        const token = generateJwt(req.id, req.email, req.role)
        return res.json({ token })
    }
}

module.exports = new UserController()