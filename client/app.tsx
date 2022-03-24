import {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './authorization/components/login/login';
import Modal from './page/components/modal/modal';
import {connect} from 'react-redux';
import * as authActions from './authorization/redux/actionsCreators';
import * as clientActions from './client/redux/actionsCreators';

import * as types from './authorization/authTypes';
import {PageState} from './page/pageTypes'
import { ClientState } from './client/clientTypes';


export type globalState = {
    login: types.AuthState,
    page: PageState,
    client: ClientState,
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials: types.credentialsLogin): void => {dispatch(authActions.loginRequest(credentials))},
    getResource:() => {dispatch(clientActions.getResource())},
    logout: () => {dispatch(authActions.logOut())}
  }
};

const mapStateToProps = (state: globalState) => {
  return {
    isLoggined: state.login.isLoginned,
    isValidationError: state.login.isValidationError,
    fieldsErrors: state.login.fieldsErrors,
    isFetchingError: state.page.isFetchingError,
    pageError: state.page.pageError,
    users: state.client.users
  }
};


const App: React.FC = (props) => {
  const{pageError, isFetchingError, isValidationError, fieldsErrors} = props
  
  const buttonStyle = {
    width: '130px',
    height: '30px',
  }

 
  // if(props.isLoggined == false) {
  //   return(
  //     <Login login={props.login}/>
  //   )
  // } 
  
  const [modalOpened, setModal] = useState(true)

  return (
      <div>
        <Login 
          login={props.login} 
          isError={isValidationError} errors={fieldsErrors}/>
        {isFetchingError &&
          <Modal active={modalOpened} setActive={setModal}>
            {<span>
              {pageError.errors}
            </span>} 
          </Modal>
        }
        <button onClick={props.getResource} style={buttonStyle}>get Resourse</button>
        <button onClick={props.logout} style={buttonStyle}>Log out</button>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);