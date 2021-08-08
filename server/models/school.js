const {Schema, model} = require('mongoose')

const school = new Schema({
    schoolName: {type: String, required: true}
})

module.exports = model('School', school)