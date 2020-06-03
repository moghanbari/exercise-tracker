import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Exercise({ exercise, deleteExercise }) {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date}</td>
      <td>
        <Link to={`/edit/${exercise._id}`}>Edit</Link> |{' '}
        <span onClick={() => deleteExercise(exercise._id)}>Delete</span>
      </td>
    </tr>
  )
}

function ExerciseList() {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises')
      .then((response) => setExercises(response.data))
      .catch((error) => console.log(error))
  }, [])

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        console.log(response.data)
        const newExercises = exercises.filter((exercise) => exercise._id !== id)
        setExercises(newExercises)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <h3>Exercise List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <Exercise
              exercise={exercise}
              key={exercise._id}
              deleteExercise={deleteExercise}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExerciseList
