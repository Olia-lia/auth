import { call, put, takeEvery } from "redux-saga/effects";
import {getResource} from '../client/clientFetch';
import {LOGIN_REQUEST_FAILED, LOGOUT} from '../authorization/redux/actionConstants';
import { GET_RESOURSE } from "../client/redux/actionConstants";
import {checkValidAccessToken, checkValidRefreshToken} from '../client/checkValidTokens';

export default function* clientRequestSaga () {
    yield takeEvery(GET_RESOURSE, getResourseSaga)
} 

function* getResourseSaga(action: any) {
    try {
      const checkedAccessToken: boolean = yield call(checkValidAccessToken)
      if (checkedAccessToken == true) 
        yield call(getResource);
     // else yield call(refreshToken)
  
      const response: Response = yield call(getResource);
    }
  
    catch(error) {
      yield put({type: LOGIN_REQUEST_FAILED, error})
      yield put({type: LOGOUT})
      
  
    // yield call(refreshToken)
    // }
    }
}