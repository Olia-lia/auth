import {put, takeEvery, call, takeLeading} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, GET_RESOURSE, REFRESH_TOKEN, CHECK_EXPIRED_TIME} from '../authorization/redux/actions/actionConstants';
import {login, refreshToken, logout, saveTokensToLocalStorage} from '../authorization/authFetch';
import {getResource} from '../client/clientRequest'
import {checkExpireIn, checkRefreshTokenIsExist} from '../authorization/authMiddlewares'

import '@babel/polyfill'
import {LoginResponse, credentialsLogin} from '../authorization/authTypes';
import { fetchRequest } from '../utils/fetchContainer';


export default function* authSaga () {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeLeading(CHECK_EXPIRED_TIME, checkExpireIn)
} 



function* loginSaga(action: any) { 
  try {
    const response: LoginResponse = yield call(login, action.credentials)
    console.log(response)
      
    if(response) yield put({type: LOGIN_REQUEST_SUCCEEDED, response})  
    //const validationErr: ValidationError = {

    }
    //error mapper;
    // map.validationErrMapper(err => {
    //   const { errStatus, message, field } = err;
    //   return {
    //     type: field,
    //     message,
    //   };
    // }); 
    // yield put({type: LOGIN_REQUEST_FAILED, validationErr})

  //}
  catch(error ) {
    //if (error instanceof ValidationError) {
      console.log(error)
   // }

    yield put({type: LOGIN_REQUEST_FAILED, error})
    yield put({type: LOGOUT})
  }
};

function* logoutSaga(action: any) {
  yield call(logout)
  yield put({type: LOGOUT})
}



