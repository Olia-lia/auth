import {useState, useEffect} from 'react';
import {CredentialsLogin, FieldErrors} from '../../authTypes';
import { Input } from '../../../UI/input';

const Login: React.FC = (props) => {
    const {login, isError, errors} = props;

    const[username, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[userNotValid, setUserNotValid] = useState(false);
    const[passwordNotValid, setPasswordNotValid] = useState(false);
      
    let classNames = 'input';
   
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

    const onFocusField = function(evt) {
        setPasswordNotValid(false)
    }

    return(
        <div className="login__wrapper">
            <h1 className="login__heading">Log In</h1>
            <form className="login__form">

                <Input 
                    id="username" 
                    name="username"
                    type="text" 
                    placeholder="your login" 
                    className={classNames}
                    label="username"
                    onChange={evt => setUser(evt.target.value)}
                >
                </Input>
                {!userNotValid && <span className="validation-error">{errors.username}</span>}
                <Input
                    className={passwordNotValid ? classNames : 'input'}
                    id="password"
                    name="password"
                    type="password"
                    placeholder='your password'
                    label="password"
                    onChange={evt => setPassword(evt.target.value)}
                    onFocus={evt => onFocusField()}>
                
                </Input>
                {!passwordNotValid  && <span className="validation-error">{errors.password}</span>}
               
                <div>
                    <button className="form__button"  type="submit" onClick={(evt) => handleSubmit(evt)}>Login</button>
                </div>
  
            </form>
        </div>
    );
};

export default Login;