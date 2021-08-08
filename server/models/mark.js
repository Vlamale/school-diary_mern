const {Schema, model} = require('mongoose')

const mark = new Schema({
    mark: {type: Number, required: true},
    userId: {ref: 'User', type: Schema.Types.ObjectId},
    subjectId: {ref: 'Subject', type: Schema.Types.ObjectId},
    classroomNumber: {type: Number, min: 1, max: 11},
    classroomLetter: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = model('Mark', mark)