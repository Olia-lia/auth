import {put, takeEvery, call, takeLeading, delay} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, REFRESH_TOKEN, CHECK_EXPIRED_TIME, HANDLE_ERROR} from '../authorization/redux/actionConstants';
import {login, refreshToken, logout, saveTokensToLocalStorage} from '../authorization/authFetch';
import {ValidationError, ModalError} from '../errorsMapper'
import {checkExpireIn, checkRefreshTokenIsExist} from '../authorization/authMiddlewares'

import '@babel/polyfill'
import {LoginResponse, credentialsLogin, Error} from '../authorization/authTypes';
import {SET_PAGE_ERROR, CLEAN_PAGE_ERROR} from '../page/redux/actionCreators'


const handleError = async(error: any) => {
  const data: Error = await error.json()
  const {message, errorsArray} = data

  switch (error.status) {
    case(401):

      //if(!retried) { 
      // retry
       // return;
      //}
      // use logout func


      localStorage.removeItem('accessToken');
      return data
      break
    
    case(400): 
      return data
      break

    // case(404):
    //   return data 
    //   break
    
    default: 
      return data
  }
};

const createError = (err) => {
  switch(err.message) {
     case('validationError'): 
       return ValidationError.createValidError(err.errorsArray)
     break;
     case('modalError'):
       return ModalError.createModalError(err.errorsArray)
     break 
     default:
       return null
       //return AppError.createAppError()
   }
 }


export default function* authSaga () {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
 // yield takeEvery(HANDLE_ERROR, handleError)
  //yield takeLeading(CHECK_EXPIRED_TIME, checkExpireIn)
} 

// 

function* loginSaga(action: any) { 
 
  try {
    //yeild call(logoutSaga)
    const response: LoginResponse = yield call(login, action.credentials)
    if(response) {
      yield (saveTokensToLocalStorage(response)) 
      yield put({type: LOGIN_REQUEST_SUCCEEDED, response})  
    }
 }

  catch(error) {
    const err: Error = yield call(handleError, error)
    const errorInstance = createError(err);
      
      if (errorInstance instanceof ValidationError)
        yield put({type: LOGIN_REQUEST_FAILED, error: errorInstance})
      else if (errorInstance instanceof ModalError) {
        yield put ({type: SET_PAGE_ERROR, error: errorInstance})
        yield delay(2000)
        yield put({type: CLEAN_PAGE_ERROR})
      }
       
      yield put({type: LOGOUT})


    
  }
};

function* logoutSaga(action: any) {
  yield call(logout)
  yield put({type: LOGOUT})
}



