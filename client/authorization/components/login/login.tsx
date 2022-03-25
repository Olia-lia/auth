import {useState, useEffect} from 'react';
import { isNonNullChain } from 'typescript';
import {credentialsLogin, FieldErrors} from '../../authTypes';
import { Input } from '../../../UI/input';
import './login.css';


const Login: React.FC = (props) => {
  const {login, isError, errors} = props

    const[username, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[userNotValid, setUserNotValid] = useState(false);
    const[passwordNotValid, setPasswordNotValid] = useState(false);
    // const[fieldRequired, setUserRequired] = useState('required');
    // const[passwordRequired, setPasswordRequired] = useState('reqiured');
      
    let classNames= "input input--invalid"
   
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

    // const blur = (evt) => {
    //   switch (evt.target.name)
    // }

    useEffect(() => {
      if (errors.username != null) {
        setUserNotValid(true)
        console.log(userNotValid)
       }
      if(errors.password != null) {
        setPasswordNotValid(true)
        console.log(passwordNotValid)}
    },
       [errors]);

  

    return(
      <div className="login__wrapper">
        <h1 className="login__heading">Log In</h1>
        <form className="form">

          <Input 
            id="username" 
            name="username"
            type="text" 
            placeholder="your login" 
            className={userNotValid ? 'input:invalid' : 'input'} 
            label={!userNotValid ? errors.username : ''}
            onChange={evt => setUser(evt.target.value)}
            >
          </Input>

     
      
          <label>
            <p>Password</p>
            <input 
                className={passwordNotValid ? classNames : 'input'} 
                id="password"
                name="password"
                type="password"
                placeholder='your password'
                onChange={evt => setPassword(evt.target.value)}/>
                {!passwordNotValid && <span>{errors.password}</span>}
          </label>
          <div>
            <button className="form__button" style={buttonStyle} type="submit" onClick={(evt) => handleSubmit(evt)}>Login</button>
          </div>
  
        </form>
      </div>
    )
  }

  export default Login