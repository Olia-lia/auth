import {useEffect, useState} from 'react';
import Login from './authorization/components/login/login';
import Modal from './page/components/modal/modal';
import { connect } from 'react-redux';
import * as authActions from './authorization/redux/actionsCreators';
import * as clientActions from './client/redux/actionsCreators'
import * as types from './authorization/authTypes'
import {PageState} from './page/pageTypes'


export type globalState = {
    login: types.AuthState
    page: PageState
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
    usernameErrors: state.login.userFieldErrors,
    passwordErrors: state.login.passwordFieldErrors,
    isFetchingError: state.page.isFetchingError,
    pageError: state.page.pageError
  }
};


const App: React.FC = (props) => {
  const{pageError, isFetchingError} = props
  
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
  
  const [modalOpened, setModal] = useState(true)
  


  return (
      <div>
        <Login 
          login={props.login} 
          usernameErrors={props.usernameErrors}
          passwordErrors={props.passwordErrors}/>
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