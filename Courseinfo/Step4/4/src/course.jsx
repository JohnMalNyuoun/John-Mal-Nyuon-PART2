const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        const total = course.parts.reduce(
          (sum, part) => sum + part.exercises,
          0
        )

        return (
          <div key={course.id}>
            <h2>{course.name}</h2>

            {course.parts.map(part => (
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            ))}

            <h3>Total exercises: {total}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default Course