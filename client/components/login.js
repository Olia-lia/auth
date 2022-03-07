import {React, useState} from 'react';


const Login = () => {
    const[user, setUser] = useState('')
    const[password, setPassword] = useState('')


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
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }

  export default Login