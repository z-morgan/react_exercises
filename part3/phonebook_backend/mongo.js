/*
setup a new mongodb database for the phonebook app, and create a command line tool for adding 
contacts to the phonebook, and querying all of the people in the phonebook

A:
setup the new mongodb database
install mongoose and write boilerplate code
setup the script to receive three arguments:
  - password (required)
  - name (optional)
  - number( optional)

if name and number are passed in, add the person to the database
else, return all people in the database.


db uri = mongodb+srv://zachmorgan97:<password>@fullstack-open-phoneboo.jcay2dk.mongodb.net/?retryWrites=true&w=majority
*/

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://zachmorgan97:${password}@fullstack-open-phoneboo.jcay2dk.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<5) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number});
  person.save().then(result => {
    console.log(`${name} was saved!`);
    mongoose.connection.close();
  });
}