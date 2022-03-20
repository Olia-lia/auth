import {useEffect} from 'react';
import Login from './authorization/components/login';
import { connect } from 'react-redux';
import * as actions from './authorization/redux/actions/actionsCreators';
import { credentialsLogin } from './authorization/authTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials: credentialsLogin): void => {dispatch(actions.loginRequest(credentials))},
    getResource:() => {dispatch(actions.getResource())}
  }
};

const mapStateToProps = ()

const App = (props) => {

  const buttonStyle = {
    width: '130px',
    height: '30px',
  }
  
  // useEffect(() => {
  //   if(localStorage
  // }, [])



  return (
      <div>
          <button onClick={props.getResource} style={buttonStyle}>get Resourse</button>
          <Login login={props.login}/>
      </div>
  )
}

export default connect(null, mapDispatchToProps)(App);