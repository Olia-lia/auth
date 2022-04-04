import {put, takeEvery, call, spawn} from 'redux-saga/effects';
//import { GET_RESOURSE } from '../client/redux/actionConstants';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGOUT, RESET_LOGIN_STATE, HANDLE_ERROR} from '../authorization/redux/actionConstants';
import {login, logout, saveTokensToLocalStorage} from '../authorization/authFetch';
import { RESET_PAGE_STATE } from '../page/redux/actionConstants';

import '@babel/polyfill';
import {LoginResponse} from '../authorization/authTypes';

export default function* authSaga () {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
} 


function* loginSaga(action: any) { 
 
    try {
        yield spawn(logoutSaga, action);
        const response: LoginResponse = yield call(login, action.credentials);
      
        
        if(response) {
            yield (saveTokensToLocalStorage(response)); 
            yield put({type: LOGIN_REQUEST_SUCCEEDED, response});
        }
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}


function* logoutSaga(action: any) {
    try {
        yield call(logout);
        yield put({type: RESET_LOGIN_STATE});
        yield put({type: RESET_PAGE_STATE});
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}