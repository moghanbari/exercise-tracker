import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ExerciseList() {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises')
      .then((response) => setExercises(response.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <p>Exercise List</p>
      <ul className="list-group">
        {exercises.map((exercise) => (
          <li className="list-group-item" key={exercise._id}>
            {exercise.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExerciseList
