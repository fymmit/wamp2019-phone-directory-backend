const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(express.static('src/build'))
app.use(cors())

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(formatPerson))
    })
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({error: 'name missing'})
    } else if (!req.body.number) {
        res.status(400).json({error: 'number missing'})
    } else {
        const person = new Person({
            name: req.body.name,
            number: req.body.number
        })
        person.save().then(savedPerson => {
            res.json(formatPerson(savedPerson))
        })
    }
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        res.json(person)
    }).catch(err => {
        res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(() => {
        res.status(204).end()
    }).catch(err => {
        console.log(err.message)
        res.status(404).end()
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})