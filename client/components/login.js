import {React, useState} from 'react';


const Login = ({login}) => {
    const[user, setUser] = useState('')
    const[password, setPassword] = useState('')

    const credentials= {
      user,
      password
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();
      login(credentials)

    }


    return(
      <div className="login-wrapper">
        <h1>Log In</h1>
        <form>
          <label>
            <p>Username</p>
            <input 
                type="text" 
                placeholder='your login'
                onChange={evt => setUser(evt.target.value) } />
          </label>
          <label>
            <p>Password</p>
            <input 
                type="password"
                placeholder='your password'
                onChange={evt => setPassword(evt.target.value)} />
          </label>
          <div>
            <button type="submit" onClick={(evt) => handleSubmit(evt)}>Login</button>
          </div>
        </form>
      </div>
    )
  }

  export default Login