import { call, put, takeEvery } from "redux-saga/effects";
import {getResource, refreshToken} from '../client/clientFetch';
import {LOGIN_REQUEST_FAILED, LOGOUT} from '../authorization/redux/actionConstants';
import { GET_RESOURSE, RESOURSE_SUCCEEDED, REFRESH_TOKEN } from "../client/redux/actionConstants";
import {checkValidAccessToken, checkValidRefreshToken} from '../client/checkValidTokens';

export default function* clientRequestSaga () {
    yield takeEvery(GET_RESOURSE, getResourseSaga)
} 

export function* getResourseSaga(action: any) {
    try {
      const checkedAccessToken: boolean = yield call(checkValidAccessToken)
      if (checkedAccessToken == true) 
        yield put(getResource());
     //else yield call(refreshToken)
  
      const response: Response = yield call(getResource);
      console.log(response)
      if(response) {
        yield put({type: RESOURSE_SUCCEEDED, data: response})
      }
    }
  
    catch(error) {
      yield put({type: LOGIN_REQUEST_FAILED, error})
      yield put({type: LOGOUT})
      
  
    // yield call(refreshToken)
    // }
    }
}