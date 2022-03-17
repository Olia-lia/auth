import {put, takeEvery, call, takeLatest, delay} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, GET_RESOURSE, REFRESH_TOKEN} from './actions/actionConstants';
import {login, getResource, checkExpireIn} from './fetch';

import '@babel/polyfill'
import {LoginResponse, credentialsLogin} from './authTypes';


//watchers
export default function* authSaga () {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(GET_RESOURSE, getResourseSaga)
} 

//workers 
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
    yield call(checkExpireIn)
    yield call(getResource)
  }
  

  // catch(error instance of ValidationErr) {
  //   const errArray = mapper.map((err) => new ValidationErr{  })
  //  // yield call(refreshToken)
  // }
  catch(error) {

  }
  
}



