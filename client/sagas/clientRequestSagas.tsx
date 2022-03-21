import { call, put, takeEvery } from "redux-saga/effects";
import {getResource} from '../client/clientRequest';
import {LOGIN_REQUEST_FAILED, LOGOUT, GET_RESOURSE} from '../authorization/redux/actions/actionConstants';

export default function* clientRequestSaga () {
    yield takeEvery(GET_RESOURSE, getResourseSaga)
} 

function* getResourseSaga(action: any) {
    try {
      // const checkedAceessToken: boolean = yield call(checkExpireIn)
      // if (checkedAceessToken == true) 
      //   yield call(getResource);
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