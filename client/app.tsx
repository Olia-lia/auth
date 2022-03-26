import {useEffect, useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from './authorization/redux/actionsCreators';
import * as clientActions from './client/redux/actionsCreators';

import Login from './authorization/components/login/login';
import Modal from './page/components/modal/modal';
import ClientPage from './client/components/clientPage/clientPage';
import Layout from './page/components/layout/layout'

import * as authTypes from './authorization/authTypes';
import * as clientTypes from './client/clientTypes'
import {PageState} from './page/pageTypes'
import { ClientState } from './client/clientTypes';


export type globalState = {
    login: authTypes.AuthState,
    page: PageState,
    client: ClientState,
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials: authTypes.credentialsLogin): void => {dispatch(authActions.loginRequest(credentials))},
    getResource:() => {dispatch(clientActions.getResource())},
    logout: () => {dispatch(authActions.logOut())}
  }
};

const mapStateToProps = (state: globalState) => {
  return {
    isLogined: state.login.isLoginned,
    isValidationError: state.login.isValidationError,
    fieldsErrors: state.login.fieldsErrors,
    isFetchingError: state.page.isFetchingError,
    pageError: state.page.pageError,
    users: state.client.users
  }
};


const App: React.FC = (props) => {
  const{pageError, isFetchingError, isValidationError, fieldsErrors, isLogined, getResource, users} = props
  
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
       
  
          <Routes>
            {/* <Route path='/' element={<Layout/>}> */}
              <Route path='/' 
                element = {<Login 
                  login={props.login} 
                  isError={isValidationError} errors={fieldsErrors}/>}/>
              {/* // {isLogined ? 
              //   <Redirect to='/user' /> : 
              //   <Login/>/> */}

              <Route path='user' element={<ClientPage users={users}/>}/>
        
            {/* </Route>     */}
          </Routes>
          <button onClick={props.logout} style={buttonStyle}>Log out</button>
      
          {isFetchingError &&
            <Modal active={modalOpened} setActive={setModal}>
              {<span>
                {pageError.errors}
              </span>} 
            </Modal>
          } 
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);