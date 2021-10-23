const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {UserDataDto} = require('../dtos/userDto')
const ApiError = require('../error/ApiError')
// const School = require('../models/school')
// const Classroom = require('../models/classroom')

const generateJwt = (data) => {
    return jwt.sign(
        {...data},
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
            return ApiError.badRequest('Не заполнены обязательные поля')
        }

        const candidate = await User.findOne({ email })

        if (candidate) {
            throw ApiError.badRequest('Пользователь с таким email уже существет')
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
        const tokenData = new UserDataDto(user)

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
        const tokenData = new UserDataDto(user)
        const token = generateJwt(tokenData)
        return res.json({ token })
    }

    // async changeClassroom(req, res) {
    //     const { classroomId, userIds } = req.body
    //     const idsArray = userIds.split(',')

    //     const newClass = await Classroom.find({ _id: classroomId })
    //     idsArray.forEach(async (_id) => {
    //         await User.findOneAndUpdate(
    //             { _id },
    //             {
    //                 classroomId: newClass._id,
    //                 classroomNumber: newClass.classroomNumber,
    //                 classroomLetter: newClass.classroomLetter
    //             },
    //             { new: true }
    //         )
    //     })

    //     return res.json('ok')
    // }

    async getUsersByRole(req, res) {
        const { role } = req.query
        const users = await User.find({ role })
        const usersData = users.map(user => new UserDataDto(user))
        return res.json(usersData)
    }

    async getUserById(req, res) {
        const { id } = req.params
        const user = await User.findOne({ _id: id })
        const userData = new UserDataDto(user)
        return res.json(userData)
    }

    async getUserByClassroom(req, res) {
        const { id } = req.params
        const users = await User.find({ classroomId: id })
        const usersData = users.map(user => new UserDataDto(user))
        return res.json(usersData)
    }

    async check(req, res) {
        const token = generateJwt(req.id, req.email, req.role)
        return res.json({ token })
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            await User.deleteOne({ _id: id })
            return res.json('Пользователь удален')
        } catch (err) {
            return res.json('Пользователь удален')
        }
    }
}

module.exports = new UserController()