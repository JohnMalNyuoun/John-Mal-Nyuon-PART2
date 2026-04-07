import React from 'react'
import Course from './course'




const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
      
    ]
  }

  return (<div>
      <h1>{course.name}</h1>
      <Course course={course} />
      <h3>Total exercises: {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</h3>
    </div>
  )
}

export default App