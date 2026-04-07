import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPersons = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return persons.filter((person) =>
      person.name.toLowerCase().includes(lowerCaseSearchTerm)
    )
  }

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value)
    console.log(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    const existing = persons.find((person) => person.name === trimmedName)
    if (existing) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    const newPerson = {
      id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
      name: trimmedName,
      number: trimmedNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setSearchTerm('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => e.preventDefault()}>

        <div>
          search: <input value={searchTerm} onChange={handleSearchTerm} />
        </div>
      </form>
      <div>
        <button type='onSubmit' onClick={filteredPersons}>
          Filter
        </button>
      </div>

      <form onSubmit={addName}>
        <div>
          <h3>Add a new person</h3>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons().map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
