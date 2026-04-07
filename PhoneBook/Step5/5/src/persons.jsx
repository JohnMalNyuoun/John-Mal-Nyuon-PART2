const Persons = ({ persons, deletePerson }) => {
  return (
    <ul>
        {persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
             
            </li>
        ))}
    </ul>
  )
}       
export default Persons