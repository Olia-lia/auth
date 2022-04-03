import { call, put, takeEvery, takeLeading, spawn, all, delay, join} from 'redux-saga/effects';
import {getResource, refreshToken} from '../client/clientFetch';
import { GET_RESOURSE, RESOURSE_SUCCEEDED, REFRESH_TOKEN, GET_TOKEN} from '../client/redux/actionConstants';
import * as actions from '../client/redux/actionsCreators';
import {checkValidAccessToken} from '../checkValidTokens';
import { saveTokensToLocalStorage } from '../authorization/authFetch';
import * as types from '../client/clientTypes';
import { LoginResponse } from '../authorization/authTypes';
import { HANDLE_ERROR } from '../authorization/redux/actionConstants';

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
    yield takeLeading(REFRESH_TOKEN, refreshToken);
    yield takeLeading(GET_TOKEN, getToken);    
} 


// function* fetchAll() {
//     yield all([
//         spawn(getResourseSaga, 'users'),    
//         //spawn(actions.getResource, 'comments'),  
//     //delay(1000)
//   ])
//}


// refactoring
function* getResourseSaga(action: any) {
    try {
        const token: boolean = yield put({type: GET_TOKEN})
        console.log(token)
        if (token == true) {
            console.log('ok')
           const task = yield call(fetchAll);
           // return response
            if(response) {
                yield put({
                    type: RESOURSE_SUCCEEDED,
                    action: response});
            } 
        }
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
    
}


function* getToken(action) {
    try {
        const checkedAccessToken: boolean = yield call(checkValidAccessToken);
      
        if(!checkedAccessToken) {
            const response: LoginResponse = yield put({type: REFRESH_TOKEN});
            console.log(response)
            if(response) {
                console.log(response)
                yield(saveTokensToLocalStorage(response)); 
                return true
            }
        }
        return true

    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
  
    }
} 