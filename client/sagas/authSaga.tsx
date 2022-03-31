import {put, takeEvery, call, takeLeading, delay, spawn} from 'redux-saga/effects';
//import { GET_RESOURSE } from '../client/redux/actionConstants';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, RESET_LOGIN_STATE, HANDLE_ERROR} from '../authorization/redux/actionConstants';
import {login, logout, saveTokensToLocalStorage} from '../authorization/authFetch';

import '@babel/polyfill';
import {LoginResponse} from '../authorization/authTypes';
import {SET_PAGE_ERROR, CLEAN_PAGE_ERROR} from '../page/redux/actionCreators';
import { handleError } from '../utils/fetchContainer';


export default function* authSaga () {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
} 


function* loginSaga(action: any) { 
 
    try {
        const response: LoginResponse = yield call(login, action.credentials);
        if(response) {
            yield (saveTokensToLocalStorage(response)); 
            yield put({type: LOGIN_REQUEST_SUCCEEDED, response});
        }
    }
    catch(error) {
        const err = yield (handleError(error))
        yield put({type: HANDLE_ERROR, error: err});
        
        
        //yield put({type: LOGIN_REQUEST_FAILED, error: err});
       
    }
}

function* logoutSaga(action: any) {
    try {
        yield call(logout);
        yield put({type: RESET_LOGIN_STATE});
        //reset all states
    }
    catch(error) {
        console.log(error);
    }
}