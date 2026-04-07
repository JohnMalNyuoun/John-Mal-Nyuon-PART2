import {  useState } from 'react'
import Filter from './filter'
import Personform from './personform'
import Persons from './persons'


const App = () => {
  const [persons, setPersons] = useState([
   { name: 'Arto Hellas', number: '040-123456' },
   { name: 'Ada Lovelace', number: '39-44-5323523' },
   { name: 'Dan Abramov', number: '12-43-234345' },
   { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
    

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (!trimmedName || !trimmedNumber) {
      alert('Please enter both a name and a number')
      return
    }

    const existing = persons.find(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    )
    if (existing) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: trimmedName,
      number: trimmedNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

      <h3>Add a new person</h3>
      <Personform addName={addName} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
