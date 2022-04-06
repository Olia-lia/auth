import {call, put, takeEvery, tskeLeading, spawn, delay, fork, throttle, takeLatest, takeLeading} from 'redux-saga/effects';
import {iFetch, refreshToken} from '../client/clientFetch';
import {CHECK_VALID_TOKEN, REFRESH_TOKEN, GET_TOKEN, I_FETCH, GET_USERS, USERS_SUCCEEDED, USERS_FAILED, GET_COMMENTS,  FETCH_REQUEST, FETCH_REQUESTS} from '../client/redux/actionConstants';
import * as actions from '../client/redux/actionsCreators';
import * as types from '../client/clientTypes';
import {checkValidAccessToken} from '../checkValidTokens';
import { saveTokensToLocalStorage } from '../authorization/authFetch';
import { LoginResponse } from '../authorization/authTypes';
import { HANDLE_ERROR, SET_TOKENS } from '../authorization/redux/actionConstants';
 

export default function* clientRequestSaga () {
    yield takeEvery(FETCH_REQUESTS, fetchRequests);
    yield takeLatest(GET_TOKEN, getToken);  
    yield takeLatest(FETCH_REQUEST, fetchRequest);
    yield takeLatest(GET_USERS, getUsers);
}

function* getUsers() {
    const response:Array<types.UserInfo> = yield call (iFetch('users', 'GET')); 
    console.log(response)
    if(response) yield put ({type: USERS_SUCCEEDED, payload: response});
}
    
function* getComments() {
    const response:Array<types.Comment> = yield call(iFetch('comments', 'GET'));
    console.log(response);
    //if(response) yield put ({type: USERS_SUCCEEDED, payload: response})

}

const requests = [getComments, getUsers];

function* fetchRequests() {
    try {
        yield call(getToken);
        console.log('ok')

        requests.forEach((request) => {
            console.log('reqs', requests)
            return function*() {
                yield fork(request);
            };
        });
    }
   
    catch(error) {
        console.log(error);
        //yield put({type: HANDLE_ERROR, payload: error});
    }
}

function* fetchRequest (action) {
    yield put({type: GET_TOKEN});
    yield call(getResourseSaga, action.payload);
} 

function* loadPage() {
    try {
        yield fork(getUsers);
        yield fork(getComments);
    }
    catch (error) {
        console.log(error);
    }
} 


function* getResourseSaga(action: any) {
    try {
        yield call(iFetch, action.endpoint, action.methos, action.body, action.options);
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}


function* getToken() {
    try {
        const checkedAccessToken: boolean = yield call(checkValidAccessToken);
        console.log('checkedAccessToke', checkedAccessToken);
        if(!checkedAccessToken) {
            const response: LoginResponse = yield call(refreshToken);
           // yield put ({type: SET_TOKENS, payload: response}); 
            yield call(saveTokensToLocalStorage, response);
        }
    }
    catch(error) {
        console.log(error);
        yield put({type: HANDLE_ERROR, payload: error});
    }
} 