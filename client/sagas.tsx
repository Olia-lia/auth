import {put, takeEvery, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED} from './actions/actionConstants';
import { fetchLogin } from './fetch';
import '@babel/polyfill'
import {LoginResponse, credentials} from './authTypes';
import { TypedUseSelectorHook } from 'react-redux';

//watchers
export default function* authSaga () {
  yield takeEvery (LOGIN_REQUEST, loginSaga);
  // yield takeEvery (LOGIN_REQUEST, loginSaga);
} 

//workers 
function* loginSaga({type, payload} : {
  type: string, payload: credentials
}) { 
  try {
    
    const response: LoginResponse = yield call(fetchLogin, payloadss)
    yield put({type: LOGIN_REQUEST_SUCCEEDED})
  }
  catch(err) {

    yield put({type: LOGIN_REQUEST_FAILED, err})
    //yield put({type: LOGOUT})
  }
}



