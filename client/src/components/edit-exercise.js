import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function EditExercise(props) {
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const [redirect, setRedirect] = useState(false)

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }
  const onChangeDuration = (e) => {
    setDuration(e.target.value)
  }
  const onChangeDate = (date) => {
    setDate(date)
  }

  // Same as componentDidMount lifeCycle hook
  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${props.match.params.id}`)
      .then((response) => {
        setUsername(response.data.username)
        setDescription(response.data.description)
        setDuration(response.data.duration)
        setDate(new Date(response.data.date))
      })
      .catch((error) => console.log(error))

    axios
      .get('http://localhost:5000/users')
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username))
        }
      })
      .catch((error) => console.log(error))
  }, [props])

  const onSubmit = (e) => {
    e.preventDefault()

    const exercise = {
      username,
      description,
      duration,
      date,
    }

    axios
      .put(`http://localhost:5000/exercises/${props.match.params.id}`, exercise)
      .then((response) => setRedirect(true))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      {redirect ? <Redirect to="/" /> : ''}
      <h3>Update Exercise</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker selected={date} onChange={onChangeDate} />
        </div>
        <div className="form-group">
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise
