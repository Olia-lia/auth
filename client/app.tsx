import {useEffect} from 'react';
import Login from './authorization/components/login/login';
import { connect } from 'react-redux';
import * as actions from './authorization/redux/actions/actionsCreators';
import { credentialsLogin, AuthState } from './authorization/authTypes';


const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials: credentialsLogin): void => {dispatch(actions.loginRequest(credentials))},
    getResource:() => {dispatch(actions.getResource())},
    logout: () => {dispatch(actions.logOut())}
  }
};

const mapStateToProps = (state: AuthState) => {
  return {
    isLoggined: state.isLoginned,
    errors: state.error
  }
};


const App = (props) => {
  const{errors} = props
  const buttonStyle = {
    width: '130px',
    height: '30px',
  }
  
  // const validationErrors = () => {
  //     errors.map(error => {
  //     if (error.type= 'validationError') 
  //       return
  //   })
  // }
  // useEffect(() => {
  //   if(localStorage
  // }, [])
  // if(props.isLoggined == false) {
  //   return(
  //     <Login login={props.login}/>
  //   )
  // } 



  return (
      <div>
        <Login login={props.login} errors={props.errors}/>
        <button onClick={props.getResource} style={buttonStyle}>get Resourse</button>
        <button onClick={props.logout} style={buttonStyle}>Log out</button>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);