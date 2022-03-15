import {useEffect} from 'react';
import Login from './components/login';
import { connect } from 'react-redux';
import * as actions from './actions/actionsCreators'

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {dispatch(actions.loginRequest(credentials))}
  
  }
};

const App = (props) => {
  
  // useEffect(() => {
  //   if(localStorage
  // }, [])



    return (
        <div>
           <Login login={props.login}/>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(App);