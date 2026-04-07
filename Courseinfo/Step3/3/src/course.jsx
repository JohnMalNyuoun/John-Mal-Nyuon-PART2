
const Course =({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  console.log('Total exercises:', totalExercises)
  return (
    <div>
        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises} </p>)}
        <h3>Total exercises: {totalExercises}</h3>
    </div>
  )
}

export default Course