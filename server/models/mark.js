const {Schema, model} = require('mongoose')

const mark = new Schema({
    mark: {type: Number, required: true, min: 1, max: 10},
    userId: {ref: 'User', type: Schema.Types.ObjectId, required: true},
    subjectId: {ref: 'Subject', type: Schema.Types.ObjectId, required: true},
    classroomId: {ref: 'Classroom', type: Schema.Types.ObjectId, required: true},
    classroomNumber: {type: Number, min: 1, max: 11},
    classroomLetter: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = model('Mark', mark)