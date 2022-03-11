import {put, takeEvery, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED} from './actions/actionConstants';
import { fetchLogin } from './fetch';
import '@babel/polyfill'

//watchers
export default function* authSaga () {
  yield takeEvery (LOGIN_REQUEST, loginSaga);
  // yield takeEvery (LOGIN_REQUEST, loginSaga);
} 

//workers 
function* loginSaga(action) {
  try {
    const response = yield call(fetchLogin, action.credentials)
    yield put({type: LOGIN_REQUEST_SUCCEEDED})
  }
  catch(err) {

    yield put({type: LOGIN_REQUEST_FAILED, err})
    //yield put({type: LOGOUT})
  }
}



