import {put, takeEvery, call, takeLatest, spawn, takeLeading} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGOUT, RESET_LOGIN_STATE, HANDLE_ERROR, SET_TOKENS} from '../authorization/redux/actionConstants';
import {login} from '../authorization/authFetch';
import {setTokens, logout} from 'auth-flow/lib/index'
import {REFRESH_TOKEN} from 'auth-flow/lib/redux';
import { FETCH_REQUESTS } from '../client/redux/actionConstants';
import { RESET_PAGE_STATE } from '../page/redux/actionConstants';
import { refreshNewToken } from '../authorization/authFetch';

import '@babel/polyfill';
import {LoginResponse} from '../authorization/authTypes';

export default function* authSaga () {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
    yield takeEvery(SET_TOKENS, setTokensSaga);
    yield takeLeading(REFRESH_TOKEN, refreshNewTokenSaga);
} 


export function* setTokensSaga(action) {
    yield call(setTokens, action.payload)
}

function* refreshNewTokenSaga(action) {
    const response: LoginResponse = yield call(refreshNewToken, action.payload)

    if(response) {
        yield put ({type: SET_TOKENS, payload: response}); 
    }
}

function* loginSaga(action: any) { 
 
    try {
        yield call(logoutSaga, action);
        const response: LoginResponse = yield call(login, action.credentials);
      
        if(response) {
            yield put ({type: SET_TOKENS, payload: response}); 
            yield put({type: LOGIN_REQUEST_SUCCEEDED, response});
            //yield put ({type: FETCH_REQUESTS});
        }
        
        //yield put ({type: FETCH_REQUESTS});
    }
    catch(error) {
        console.log(error);
        yield put({type: HANDLE_ERROR, payload: error});
    }
}

function* logoutSaga(action: any) {
    try {
        yield call(logout);
        yield put({type: RESET_LOGIN_STATE});
      
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}