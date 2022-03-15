import {put, takeEvery, call, takeLatest, delay} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT} from './actions/actionConstants';
import {login} from './fetch';

import '@babel/polyfill'
import {LoginResponse, credentialsLogin} from './authTypes';

//watchers
export default function* authSaga () {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
} 

//workers 
function* loginSaga(action: any) { 
  try {
    const response: LoginResponse = yield call(login, action.credentials)
    console.log(response)
      
    if(response) yield put({type: LOGIN_REQUEST_SUCCEEDED, response})  
    //else throw Error
  }
  //const json: LoginResponse = yield call(() => new Promise(res => res(response.json())))
  catch(error) {
    console.log(error)
     yield put({type: LOGIN_REQUEST_FAILED, error})
      yield put({type: LOGOUT})
  }
}

