import {put, takeEvery, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT} from './actions/actionConstants';
import {login} from './fetch';
import '@babel/polyfill'
import {LoginResponse, credentials} from './authTypes';

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
    
    const response: LoginResponse = yield call(login, payload)
    yield put({type: LOGIN_REQUEST_SUCCEEDED})
  }
  catch(err) {

    yield put({type: LOGIN_REQUEST_FAILED, err})
    yield put({type: LOGOUT})
  }
}



