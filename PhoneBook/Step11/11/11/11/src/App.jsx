import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './notification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('') // 'success' or 'error'

  
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

 
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  const handleSearchTerm = (event) => setSearchTerm(event.target.value)
  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  
  const addName = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (!trimmedName || !trimmedNumber) {
      setNotificationMessage('Please fill all fields')
      setNotificationType('error')
      setTimeout(() => setNotificationMessage(null), 3000)
      return
    }

    const duplicate = persons.some(
      p => p.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (duplicate) {
      setNotificationMessage(`${trimmedName} is already added`)
      setNotificationType('error')
      setTimeout(() => setNotificationMessage(null), 3000)
      return
    }

    const newPerson = { name: trimmedName, number: trimmedNumber }

    axios.post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(prev => prev.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`${trimmedName} has been added`)
        setNotificationType('success')
        setTimeout(() => setNotificationMessage(null), 3000)
      })
      .catch(() => {
        setNotificationMessage('contact saved')
        setNotificationType('error')  
        setTimeout(() => setNotificationMessage(null), 3000)
      })
  }

  // Delete a person
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!person) return

    if (window.confirm(`Delete ${person.name}?`)) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
          setNotificationMessage(`${person.name} has been deleted`)
          setNotificationType('success')
          setTimeout(() => setNotificationMessage(null), 3000)
        })
        .catch(() => {
          setNotificationMessage(`${person.name} was already removed from server`)
          setNotificationType('error')
          setPersons(prev => prev.filter(p => p.id !== id))
          setTimeout(() => setNotificationMessage(null), 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} type={notificationType} />

      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
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