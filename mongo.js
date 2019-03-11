require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const addPerson = (name, number) => {
    const person = new Person({
        name,
        number
    })
    person.save().then(res => {
        console.log(`adding person ${name} number ${number}`)
        mongoose.connection.close()
    })
}

const listPersons = () => {
    console.log('Telephone Directory:')
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

const main = () => {
    mongoose.connect(url, {
        useNewUrlParser: true
    })
    let name = process.argv[2]
    let number = process.argv[3]
    if (name && number) {
        addPerson(name, number)
    } else {
        listPersons()
    }
}

main()