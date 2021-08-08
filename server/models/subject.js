const {Schema, model} = require('mongoose')

const subject = new Schema({
    subjectName: {type: String, required: true},
})

module.exports = model('Subject', subject)