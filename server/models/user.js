const {Schema, model} = require('mongoose')

const user = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: false, required: true},
    firstName: {type: String, required: true},
    surName: {type: String, required: true},
    middleName: {type: String, required: true},
    role: {type: String, required: true, default: 'PUPIL'},
    subjectId: {ref: 'Subject', type: Schema.Types.ObjectId},
    subjectName: {type: String},
    classroomId: {ref: 'Classroom', type: Schema.Types.ObjectId},
    classroomNumber: {type: Number, min: 1, max: 11},
    classroomLetter: {type: String},
})

module.exports = model('User', user)