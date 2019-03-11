const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Martti Tienari',
        number: '040-123456',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-123456',
        id:3
    },
    {
        name: 'Lea Kutvonen',
        number: '040-123456',
        id: 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Phone Directory Backend</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({error: 'name missing'})
    } else if (!req.body.number) {
        res.status(400).json({error: 'number missing'})
    } else {
        const newPerson = req.body
        if (persons.find(person => person.name === newPerson.name)) {
            res.status(400).json({error: 'name must be unique'})
        } else {
            newPerson.id = Math.floor((Math.random() * 9999) + 1)
            persons.push(newPerson)
            res.json(persons)
        }
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})