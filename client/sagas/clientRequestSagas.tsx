import { call, put, takeEvery, takeLeading, spawn, all, delay } from 'redux-saga/effects';
import {getResource, refreshToken} from '../client/clientFetch';
import { GET_RESOURSE, RESOURSE_SUCCEEDED, REFRESH_TOKEN, GET_TOKEN} from '../client/redux/actionConstants';
import * as action from '../client/redux/actionsCreators';
import {checkValidAccessToken} from '../checkValidTokens';
import { saveTokensToLocalStorage } from '../authorization/authFetch';
import * as types from '../client/clientTypes';
import { LoginResponse } from '../authorization/authTypes';
import { errorHandlerSaga } from './handlerErrorsSaga';
import { handleError } from '../utils/fetchContainer';
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
//       spawn(action.getResource, 'users'),    
//     spawn(action.getResource, 'comments'),  
//     //delay(1000)
//   ])
// }


// refactoring
function* getResourseSaga(action) {
    try {
        const token: boolean = yield put({type: GET_TOKEN})
        console.log(token)
        if (token) {
            console.log('ok')
            const response: Response = yield call(getResource);
            console.log(response);
            if(response) {
                yield put({
                    type: RESOURSE_SUCCEEDED,
                    action: response});
            } 
        }
    }
    catch(error) {
        yield call(errorHandlerSaga, error);
    }
    
}


function* getToken(action) {
    try {
        const checkedAccessToken: boolean = yield call(checkValidAccessToken);
        console.log(checkedAccessToken);
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
        const err = yield call(handleError, error)
        yield put({type: HANDLE_ERROR, error: err});
    }
} 