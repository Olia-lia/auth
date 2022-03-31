import {connect} from 'react-redux';
import Login from './login';
import {CredentialsLogin} from '../../authTypes';
import {globalState} from '../../../typesGlobal';
import * as authActions from '../../redux/actionsCreators';

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials: CredentialsLogin): void => {dispatch(authActions.loginRequest(credentials));},
    };
};
  

const mapStateToProps = (state:globalState) => {
    return {
        isLogined: state.login.isLoginned,
        isValidationError: state.login.isValidationError,
        errors: state.login.fieldsErrors
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;