import React, { useState, useEffect } from 'react'
import './App.css'
import ActivityLogs from './ActivityLogs'

function App () {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(undefined)

  useEffect(() => {
    fetch(process.env.REACT_APP_URL) //fetching data from the Mock API
      .then(response => response.json()) //returning json format
      .then(result => {
        setUsers(result.members)
      })
      .catch(error => {
        error
          ? setError(error)
          : setError(
              //setting up new error if not data and error is fetched
              new Error(
                'Unable to fetch data. Please check internet connection.'
              )
            )
      })
  }, [])

  return (
    <div>
      {error ? (
        <div>{error.message}</div>
      ) : (
        <div className='App'>
          <div className='Navbar'>User session detials</div>
          
          <div className='ActivityLogs'>
          <div className='ActivityLogs-head'>
            <span className="id">ID</span> <span>Name</span> <span className="tz">Time zone</span>
          </div>
          <div className='ActivityLogs-data'>
            {users.length > 0 ? (
              users.map(user => {
                return (
                  <div key={user.id} className='users'>
                    <ActivityLogs user={user} />
                  </div>
                )
              })
            ) : (
              <div>No user here.</div> //If user list is empty render.
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
