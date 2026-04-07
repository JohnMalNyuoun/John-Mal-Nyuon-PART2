
const Course =({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises} </p>)}
    
    </div>
  )
}

export default Course