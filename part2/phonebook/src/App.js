import { useState, useEffect } from 'react'
import personsAPI from './services/personsAPI'

import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    personsAPI.getAll().then(allPersons => setPersons(allPersons));
  }, []);

  function handleNewNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNewNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleFilterTermChange(event) {
    setFilterTerm(event.target.value);
  }

  function handleNewPersonSubmit(event) {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace number?`)) {
        personsAPI.update({ ...existingPerson, number: newNumber }).then(person => {
          setPersons(persons.filter(p => p.id !== person.id).concat(person));
          setNewName('');
          setNewNumber('');
        });
      }
    } else {
      const newPerson = {name: newName, number: newNumber};
      personsAPI.create(newPerson).then(person => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      });
    }
  }

  function handleDelete(id) {
    const name = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${name}?`)) {
      personsAPI.deleteById(id).then(success => {
        if (success) {
          setPersons(persons.filter(person => person.id !== id));
        }
      });
    }
  }

  const personsShown = (() => {
    if (filterTerm === '') {
      return persons;
    } else {
      return persons.filter(person => {
        return new RegExp(filterTerm, 'i').test(person.name);
      });
    }
  })();

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterTerm} handleChange={handleFilterTermChange} />
      <h2>Add a new</h2>
      <NewPersonForm handleSubmit={handleNewPersonSubmit}
        newName={newName} handleNewNameChange={handleNewNameChange}
        newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsShown} handleDelete={handleDelete} />
    </div>
  )
}

export default App
