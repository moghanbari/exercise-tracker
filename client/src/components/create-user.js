import React, { useState } from 'react'
import axios from 'axios'

function CreateUser() {
  const [username, setUsername] = useState('')

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      username,
    }

    console.log(user)

    axios
      .post('http://localhost:5000/users/add', user)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))

    setUsername('')
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateUser
