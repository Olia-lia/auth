import {useState, useEffect} from 'react';
import {CredentialsLogin, FieldErrors} from '../../authTypes';
import { Input } from '../../../UI/input';
//import './login.css';


const Login: React.FC = (props) => {
    const {login, isError, errors} = props;

    const[username, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[userNotValid, setUserNotValid] = useState(false);
    const[passwordNotValid, setPasswordNotValid] = useState(false);
      
    let classNames= 'input input--invalid';
   
    const credentials: CredentialsLogin = {
        username,
        password
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        login(credentials);
    };

    useEffect(() => {
        if (errors.username != null) {
            setUserNotValid(true);
        }
        if(errors.password != null) {
            setPasswordNotValid(true);
        }
    },
    [errors]);

    return(
        <div className="login__wrapper">
            <h1 className="login__heading">Log In</h1>
            <form className="login__form">

                <Input 
                    id="username" 
                    name="username"
                    type="text" 
                    placeholder="your login" 
                    className={!userNotValid ? 'input:invalid' : 'input'} 
                    label="username"
                    onChange={evt => setUser(evt.target.value)}
                >
                </Input>
                {!userNotValid ? <span className="login-error">{errors.username}</span> : ''}
                <Input
                    className={passwordNotValid ? classNames : 'input'}
                    id="password"
                    name="password"
                    type="password"
                    placeholder='your password'
                    label="password"
                    onChange={evt => setPassword(evt.target.value)}>
                </Input>
                {!passwordNotValid && <span className="login-error">{errors.password}</span>}
                <div>
                    <button className="form__button"  type="submit" onClick={(evt) => handleSubmit(evt)}>Login</button>
                </div>
  
            </form>
        </div>
    );
};

export default Login;