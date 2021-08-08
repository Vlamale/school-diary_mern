const {Schema, model} = require('mongoose')

const user = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: false, required: true},
    firstname: {type: String, required: true},
    surname: {type: String, required: true},
    middleName: {type: String, required: true},
    role: {type: String, default: 'PUPIL'},
    schoolId: {ref: 'School', type: Schema.Types.ObjectId, required: true},
    classroomId: {ref: 'Classroom', type: Schema.Types.ObjectId},
    classroomNumber: {type: Number, required: true, min: 1, max: 11},
    classroomLetter: {type: String, required: true},
})

module.exports = model('User', user)