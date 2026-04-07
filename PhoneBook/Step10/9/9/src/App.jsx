import { useState, useEffect } from 'react'
import Filter from './filter'
import Personform from './personform'
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

    const newPerson = {
      name: trimmedName,
      number: trimmedNumber
    }

    axios.post('http://localhost:3001/persons', newPerson)
      .then((response) => {
        setPersons((prevPersons) => prevPersons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.error('Error adding person:', error)
        alert('Failed to save contact')
      })
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    if (!person) {
      alert('Person not found')
      return
    }

    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id))
        })
        .catch((error) => {
          console.error('Error deleting person:', error)
          alert('Failed to delete contact')
        })
    }
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
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App