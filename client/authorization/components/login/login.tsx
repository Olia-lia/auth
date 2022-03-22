import {useState, useEffect} from 'react';
import {credentialsLogin, Error} from '../../authTypes';
import './login.css';


const Login = ({login, errors}) => {
    const[username, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[userNotValid, setUserNotValid] = useState(false);
    const[passwordNotValid, setPasswordNotValid] = useState(false);
    const[fieldRequired, setUserRequired] = useState('not valid');
    const[passwordRequired, setPasswordRequired] = useState('not valid');

    useEffect(() => {
      if(errors != null) 
      errors.forEach(error => {
        switch(error.field) {
          case 'username': 
            setUserNotValid(true)
            break;
          case 'password':
            setPasswordNotValid(true)
            break
          }
        })
        [errors]})

   
  
    let classNames = "input"
  
    if(userNotValid == true) {
      classNames += ' input--not-valid'
    }

    const credentials = {
      username,
      password
    }

    const buttonStyle = {
      width: '130px',
      height: '30px',
    }
    
    const handleSubmit = (evt) => {
      evt.preventDefault();
      login(credentials)
    }

    

    //useEffect

    return(
      <div className="login__wrapper">
        <h1>Log In</h1>
        <form className="login__form">
          <label>
            <p>Username</p>
            <input 
                className={classNames}
                type="text" 
                placeholder='your login'
                onChange={evt => setUser(evt.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input 
                type="password"
                placeholder='your password'
                onChange={evt => setPassword(evt.target.value)}/>
          </label>
          <div>
            <button style={buttonStyle} type="submit" onClick={(evt) => handleSubmit(evt)}>Login</button>
          </div>
        </form>
      </div>
    )
  }

  export default Login