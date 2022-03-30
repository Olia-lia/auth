import { call, put, takeEvery, takeLeading, spawn, all, delay } from 'redux-saga/effects';
import {getResource, refreshToken} from '../client/clientFetch';
import { GET_RESOURSE, RESOURSE_SUCCEEDED, REFRESH_TOKEN, GET_TOKEN} from '../client/redux/actionConstants';
import * as action from '../client/redux/actionsCreators';
import {checkValidAccessToken} from '../checkValidTokens';
import { saveTokensToLocalStorage } from '../authorization/authFetch';
import * as types from '../client/clientTypes';
import { LoginResponse } from '../authorization/authTypes';
import { errorHandlerSaga } from './handlerErrorsSaga';
import '@babel/polyfill';


// function* main() {
//   try {
//     yield call(fetchAll)
//   } catch (e) {
//     console.log(e)
//   }
// }

//spawn

export default function* clientRequestSaga () {
    yield takeEvery(GET_RESOURSE, getResourseSaga);
    //yield takeEvery(REFRESH_TOKEN, refreshToken);
    yield takeLeading(GET_TOKEN, getToken);    
} 


// function* fetchAll() {
//     yield all([
//       spawn(action.getResource, 'users'),    
//     spawn(action.getResource, 'comments'),  
//     //delay(1000)
//   ])
// }


// refactoring
function* getResourseSaga(action) {
    try {
        const token = yield call(getToken);
        if (token == true) {
            const response: Response = yield call(getResource, action.endpoint);
            console.log(response);
            if(response) {
                yield put({type: RESOURSE_SUCCEEDED, data: response});
            } 
        }
    }
    catch(error) {
        yield call(errorHandlerSaga(error));
    }
    
}


function* getToken(action) {
    try {
        const checkedAccessToken: boolean = yield call(checkValidAccessToken);
        if(!checkedAccessToken) {
            const response = yield call(refreshToken)
            if(response) {
                yield call(saveTokensToLocalStorage(response)); 
                return true;
            }
        }

    }
    catch(error) {
      yield call(errorHandlerSaga(error));
    }
} 