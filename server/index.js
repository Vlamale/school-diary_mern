require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 3000


const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server was started on port ${PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}

start()