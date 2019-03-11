require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

mongoose.connect(url, {
    useNewUrlParser: true
})

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person