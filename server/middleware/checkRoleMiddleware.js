const jwt = require('jsonwebtoken')


module.exports = function (role) {
    try {
        return function (req, res, next) {
            console.log(req.body)
            if (req.method === 'OPTIONS') {
                next()
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' })
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (role !== decoded.role) {
                return res.status(403).json({ message: 'Нет доступа!' })
            }
            req.user = decoded
            next()
        }
    } catch (err) {
        res.status(401).json({ message: 'Не авторизован' })
    }
}