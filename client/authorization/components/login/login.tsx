import {useState, useEffect} from 'react';
import {CredentialsLogin, FieldErrors} from '../../authTypes';
import { Input } from '../../../UI/input';
import { Link, Navigate } from 'react-router-dom';

// type Props = {

//     login: () => void,
//     isLoginned: boolean,
//     isError: boolean,
//     errors: Array<any>,
//     fetchRequests: () => void
// };

const Login: React.FC = (props) => {
    const {login, isLoginned, isError, errors, fetchRequests} = props;

    //if(isLoginned) return <Navigate to='users'></Navigate>;

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
            classNames += ' input:invalid';
        }
        if(errors.password != null) {
            setPasswordNotValid(true);
        }
    },
    [errors]);

    let classErrors = 'validation-error';

    const onFocusField = function(evt) {
        evt.preventDefault();
        switch(evt.target.name) {
        case('password'):
            setPasswordNotValid(true);
            break;
        
        case('username'):
            setUserNotValid(true);
            break;
        }
    };

    return(
        <div className="login__wrapper">
            <ul className='nav__list'>
                <li>
                    <Link to="/user">user</Link>
                </li>
                {      /* 
                //<button onClick={()=>{getResourse('users');}}>getResousce</button> */}
                <button onClick={()=>{fetchRequests();}}>getAll</button>
            </ul>
            <h1 className="login__heading">Log In</h1>
            <form className="login__form">

                <Input 
                    id="username" 
                    name="username"
                    type="text" 
                    placeholder="your login" 
                    className={classNames}
                    label="username"
                    onChange={(evt) => setUser(evt.target.value)}
                    onFocus={(evt) => onFocusField(evt)}
                >
                </Input>
                {!userNotValid && <span className={classErrors}>{errors.username}</span>}
                <Input
                    className={passwordNotValid ? classNames : 'input'}
                    id="password"
                    name="password"
                    type="password"
                    placeholder='your password'
                    label="password"
                    onChange={evt => setPassword(evt.target.value)}
                    onFocus={(evt) => onFocusField(evt)}>
                
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