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
            firstName,
            surName,
            middleName,
            classroomNumber,
            classroomLetter,
            classroomId,
            subjectId,
            subjectName,
            role
        } = req.body

        if (!email || !password) {
            return
        }

        const candidate = await User.findOne({ email })

        if (candidate) {
            return
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({
            email,
            password: hashPassword,
            role,
            firstName,
            surName,
            middleName,
            classroomNumber,
            classroomLetter,
            classroomId,
            subjectId,
            subjectName,
        })
        const tokenData = {
            email,
            role: user.role,
            id: user._id,
            firstName: user.firstName,
            surName: user.surName,
            middleName: user.middleName
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
            firstName: user.firstName,
            surName: user.surName,
            middleName: user.middleName,
            subjectName: user.subjectName
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

    async getUsersByRole(req, res) {
        const { role } = req.query
        const users = await User.find({ role })
        return res.json(users)
    }

    async getUserById(req, res) {
        const { id } = req.params
        const user = await User.findOne({ _id: id })
        return res.json(user)
    }

    async getUserByClassroom(req, res) {
        const { id } = req.params
        const user = await User.find({ classroomId: id })
        return res.json(user)
    }

    async check(req, res) {
        const token = generateJwt(req.id, req.email, req.role)
        return res.json({ token })
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            console.log(id)
            await User.deleteOne({ _id: id })
            // const hasMarks = await Mark.deleteMany({userId: id})
            // if (hasMarks) {
            await Mark.deleteMany({ userId: id })
            // }
            return res.json('Пользователь удален')
        } catch (err) {
            return res.json('Пользователь удален')
        }
    }
}

module.exports = new UserController()