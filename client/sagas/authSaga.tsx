import {put, takeEvery, call, takeLeading, delay, spawn} from 'redux-saga/effects';
import { GET_RESOURSE } from 'client/client/redux/actionConstants';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, RESET_LOGIN_STATE} from '../authorization/redux/actionConstants';
import {login, logout, saveTokensToLocalStorage} from '../authorization/authFetch';
import { errorHandlerSaga } from './handlerErrorsSaga';


import '@babel/polyfill';
import {LoginResponse} from '../authorization/authTypes';
import {SET_PAGE_ERROR, CLEAN_PAGE_ERROR} from '../page/redux/actionCreators';


export default function* authSaga () {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
} 

// 

function* loginSaga(action: any) { 
 
    try {
        const response: LoginResponse = yield call(login, action.credentials);
        if(response) {
            yield (saveTokensToLocalStorage(response)); 
            yield put({type: LOGIN_REQUEST_SUCCEEDED, response});
        }
    }
    catch(error) {
        yield call(errorHandlerSaga(error));
       
    
    }
}

function* logoutSaga(action: any) {
    try {
        yield call(logout);
        yield put({type: RESET_LOGIN_STATE});
    }
    catch(error) {
        throw new Error(error);
    }
}