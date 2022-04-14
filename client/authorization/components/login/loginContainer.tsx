import {connect} from 'react-redux';
import Login from './login';
import {CredentialsLogin} from '../../authTypes';
import {globalState} from '../../../typesGlobal';
import {Navigate, useLocation} from 'react-router-dom';
import * as authActions from '../../redux/actionsCreators';
import * as clientActions from '../../../client/redux/actionsCreators';

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials: CredentialsLogin): void => {dispatch(authActions.loginRequest(credentials));},
        fetchRequests: (): void => {dispatch(clientActions.fetchRequests());}

    };
};
  

const mapStateToProps = (state:globalState) => {
    return {
        isLoginned: state.login.isLoginned,
        isValidationError: state.login.isValidationError,
        errors: state.login.fieldsErrors
    };
};

// const LoginContainer = (props) => {
    
//     const location = useLocation();

  
//     if(props.isLoginned == true) return <Navigate to='users'></Navigate>;

// };


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;