import {useEffect} from 'react';
import Login from './authorization/components/login';
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
  }
};


const App = (props) => {

  const buttonStyle = {
    width: '130px',
    height: '30px',
  }
  
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
        <Login login={props.login}/>
        <button onClick={props.getResource} style={buttonStyle}>get Resourse</button>
        <button onClick={props.logout} style={buttonStyle}>Log out</button>
      </div>
  )
}

export default connect(null, mapDispatchToProps)(App);