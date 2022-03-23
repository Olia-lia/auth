import {useState, useEffect} from 'react';
import {credentialsLogin, FieldErrors} from '../../authTypes';
import './login.module.css';


const Login: React.FC = (props) => {
  const {login, usernameErrors, passwordErrors} = props


    const[username, setUser] = useState('');
    const[password, setPassword] = useState('');
    // const[userNotValid, setUserNotValid] = useState(false);
    // const[passwordNotValid, setPasswordNotValid] = useState(false);
    // const[fieldRequired, setUserRequired] = useState('required');
    // const[passwordRequired, setPasswordRequired] = useState('reqiured');
  
    let classNames = "input"
  
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

      if(usernameErrors.invalid == true) classNames += ' in'
    

    return(
      <div className="login__wrapper">
        <h1 className="login__heading">Log In</h1>
        <form >
        <div className="form-group">
          <label className="login__form-label" htmlFor='username'>
            <p>Username</p>
            <input 
                id='username'
                className={classNames}
                type="text" 
                placeholder='your login'
                onChange={evt => setUser(evt.target.value)}
            />
               {usernameErrors.invalid && <span>This is required</span>}
          </label>
        </div>
          <label>
            <p>Password</p>
            <input 
                className={classNames}
                type="password"
                placeholder='your password'
                onChange={evt => setPassword(evt.target.value)}/>
          </label>
          <div>
            <button className="form__button" style={buttonStyle} type="submit" onClick={(evt) => handleSubmit(evt)}>Login</button>
          </div>
        </form>
      </div>
    )
  }

  export default Login