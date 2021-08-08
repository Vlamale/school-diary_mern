const {Schema, model} = require('mongoose')

const classroom = new Schema({
    classroomNumber: {type: Number, required: true, min: 1, max: 11},
    classroomLetter: {type: String, required: true},
    schoolId: {ref: 'School', type: Schema.Types.ObjectId}
})

module.exports = model('Classroom', classroom)