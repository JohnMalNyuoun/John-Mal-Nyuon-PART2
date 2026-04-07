import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  

  const addName = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
   

    

    const newPerson = {
      id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
      name: trimmedName,
     
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
   
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
         
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
