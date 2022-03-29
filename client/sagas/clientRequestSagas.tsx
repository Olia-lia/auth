import { call, put, takeEvery, takeLeading,  spawn, all, delay } from "redux-saga/effects";
import {getResource, refreshToken} from '../client/clientFetch';
import { GET_RESOURSE, RESOURSE_SUCCEEDED, CHECK_VALID_TOKEN, RESOURSE_FAILED, REFRESH_TOKEN, REFRESH_FAILED, REFRESH_SUCCEEDED} from "../client/redux/actionConstants";
import * as action from '../client/redux/actionsCreators'
import {checkValidAccessToken, checkValidRefreshToken} from '../checkValidTokens';
import { saveTokensToLocalStorage } from '../authorization/authFetch'
import * as types from '../client/clientTypes';
import { LoginResponse } from '../authorization/authTypes';
//import { handleError } from '../errorsMapper';
import { ErrorType } from "client/typesGlobal";
import { tokenToString } from "typescript";



function* main() {
  try {
    yield call(fetchAll)
  } catch (e) {
    console.log(e)
  }
}

//spawn

export default function* clientRequestSaga () {
    yield takeLeading(GET_RESOURSE, getResourseSaga);
    yield takeLeading(CHECK_VALID_TOKEN, checkValidAccessToken);
    yield takeLeading(REFRESH_TOKEN, refreshTokenSaga);
    yield takeLeading(GET_TOKEN, getToken);    
} 


function* fetchAll() {
  yield all([
    spawn(action.getResource, 'users'),    
    spawn(action.getResource, 'comments'),  
    //delay(1000)
  ])
}


function* refreshTokenSaga(action: any) {
  try {
    //checkResresh
    const response: LoginResponse = yield call(refreshToken);
    if(response) {
      yield (saveTokensToLocalStorage(response)) 
      yield put({type: REFRESH_SUCCEEDED})
      yield put({type: GET_RESOURSE, endpoint: action.endpoint})
    }
    
  }
  catch(error){ 
    //const err: ErrorType = yield call(handleError, error)
     yield put({type: REFRESH_FAILED, error: 401})
    // LOGOUT
  }
}

// refactoring
export function* getResourseSaga(action) {
    try {
      const checkedAccessToken: boolean = yield call(checkValidAccessToken)
      if (checkedAccessToken) {
        const response: Response = yield call(getResource, action.endpoint);
        console.log(response)
        // if(response) {
        //   yield put({type: RESOURSE_SUCCEEDED, data: response})
        // }
      }
      else {
        yield put({type: REFRESH_TOKEN, endpoint: action.endpoint})
      }
    }
    catch(error) {
      console.log(error)
      if(error.status === 401) yield put({type: REFRESH_TOKEN, endpoint: action.endpoint})

     else yield put({type: RESOURSE_FAILED, error})
      //LOGOUT


    }
    
}

export function* getToken(action: any) {
  // check if token valid
  const checkedAccessToken: boolean = yield call(checkValidAccessToken);

  if(checkedAccessToken) return ;
  else {
    yield put({type: REFRESH_TOKEN, endpoint: action.endpoint})
  }
  
  return token;
} 

