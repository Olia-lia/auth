import {put, takeEvery, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED} from './actions/actionConstants';
import { fetchLogin } from './fetch';
import '@babel/polyfill'




//workers 
function* loginSaga(action) {
  try {
    yield call(fetchLogin, action.credentials)
    yield put({type: LOGIN_REQUEST_SUCCEEDED})
  }
  catch {

    yield put({type: LOGIN_REQUEST_FAILED, error})
    //yield put({type: LOGOUT})
  }
}



//wotchers

export default function* authSaga () {
  yield takeEvery (LOGIN_REQUEST, loginSaga);
} 