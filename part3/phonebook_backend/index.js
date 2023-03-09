const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

morgan.token('custom-body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :custom-body"))

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const body = (
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date().toString()}</p>`
  );
  response.send(body);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = 'That person does not exist.';
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const newPerson = request.body;

  if (!newPerson.name || !newPerson.number) {
    return response.status(401).json({error: 'name or number is missing'});
  }

  if (persons.find(person => person.name === newPerson.name)) {
    return response.status(401).json({error: 'someone with that name already exists'});
  }

  newPerson.id = Math.floor(Math.random() * 10000);
  persons.push(newPerson);
  response.json(newPerson);
});
