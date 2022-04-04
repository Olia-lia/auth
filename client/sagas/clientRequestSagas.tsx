import { call, put, takeEvery, takeLeading, spawn, all,delay, fork, join, take} from 'redux-saga/effects';
import {getResource, iFetch, refreshToken} from '../client/clientFetch';
import { GET_RESOURSE, REFRESH_TOKEN, GET_TOKEN, FETCH_ALL, I_FETCH} from '../client/redux/actionConstants';
import * as actions from '../client/redux/actionsCreators';
import {checkValidAccessToken} from '../checkValidTokens';
import { saveTokensToLocalStorage } from '../authorization/authFetch';
import * as types from '../client/clientTypes';
import { LoginResponse } from '../authorization/authTypes';
import { HANDLE_ERROR } from '../authorization/redux/actionConstants';


export default function* clientRequestSaga () {
    yield takeEvery(FETCH_ALL, fetchAll);
    yield takeEvery(GET_RESOURSE, getResourseSaga);
    yield takeLeading(REFRESH_TOKEN, refreshToken);
    yield takeLeading(GET_TOKEN, getToken);    
} 


function* fetchAll() {
    //yield fork(() => actions.getResourse('users'));
    const res: Response = yield put(actions.getResourse('users'));
    console.log('res', res); 
    yield put(actions.getResourse('comments'));
}


function* getResourseSaga(action: any) {
    try {
        const tokenIsValid: Response = yield call(getToken);
        console.log('tokenIsValid', tokenIsValid);
        // if (tokenIsValid) {
        const response = yield call(getResource, action.payload);
        return response;
        //}
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
    
}


function* getToken() {
    try {
        const checkedAccessToken: boolean = yield call(checkValidAccessToken);
      
        if(!checkedAccessToken) {
            const response: LoginResponse = yield call(refreshToken);
            yield(saveTokensToLocalStorage(response)); 
        }
        //return checkedAccessToken;
    }

    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
  
    }
} 