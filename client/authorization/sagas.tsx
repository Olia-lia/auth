import {put, takeEvery, call, takeLeading} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, GET_RESOURSE, REFRESH_TOKEN, CHECK_EXPIRED_TIME} from './redux/actions/actionConstants';
import {login, getResource, refreshToken} from './fetch';
import {checkExpireIn, checkRefreshTokenIsExist} from './authMiddlewares'

import '@babel/polyfill'
import {LoginResponse, credentialsLogin} from './authTypes';


//////////watchers
export default function* authSaga () {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeLeading(CHECK_EXPIRED_TIME, checkExpireIn)
  yield takeEvery(GET_RESOURSE, getResourseSaga)
} 




////////workers 
function* loginSaga(action: any) { 
  try {
    const response: LoginResponse = yield call(login, action.credentials)
    console.log(response)
      
    if(response) yield put({type: LOGIN_REQUEST_SUCCEEDED, response})  

  }
  catch(error) {
    yield put({type: LOGIN_REQUEST_FAILED, error})
    yield put({type: LOGOUT})
  }
};

function* getResourseSaga(action: any) {
  try {
    const checkedAceessToken: boolean = yield call(checkExpireIn)
    if (checkedAceessToken == true) 
      yield call(getResource);
    else yield call(refreshToken)
  }

  catch(error) {
    yield put({type: LOGIN_REQUEST_FAILED, error})
    yield put({type: LOGOUT})
    // catch(error instance of ValidationErr) {
  //   const errArray = mapper.map((err) => new ValidationErr{  })
  //  // yield call(refreshToken)
  // }
  }
}

function* logout(action: any) {

}



