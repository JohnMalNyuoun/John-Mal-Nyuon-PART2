const Persons = ({ persons, deleteperson }) => {
  return (
    <div>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteperson(person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default Persons