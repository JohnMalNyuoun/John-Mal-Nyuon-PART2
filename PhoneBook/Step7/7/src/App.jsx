import { useState, useEffect } from 'react'
import Filter from './filter'
import Personform from './personform'
import Persons from './persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])
 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchTerm = (event) => {
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

    const duplicate = persons.some(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (duplicate) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    setPersons((prevPersons) =>
      prevPersons.concat({ name: trimmedName, number: trimmedNumber })
    )

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
      <Personform
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App