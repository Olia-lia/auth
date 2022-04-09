import {call, put, takeEvery, spawn, delay, fork, throttle, takeLatest, takeLeading, all} from 'redux-saga/effects';
import {iFetch, refreshToken} from '../client/clientFetch';
import {
    CHECK_VALID_TOKEN, REFRESH_TOKEN, 
    GET_USERS, USERS_SUCCEEDED, USERS_FAILED, 
    GET_COMMENTS,  
    FETCH_REQUEST, FETCH_REQUESTS, GET_TOKEN} from '../client/redux/actionConstants';
import * as actions from '../client/redux/actionsCreators';
import * as types from '../client/clientTypes';
import {checkValidAccessToken} from '../checkValidTokens';
import {saveTokensToLocalStorage} from '../authorization/authFetch';
import {LoginResponse} from '../authorization/authTypes';
import { HANDLE_ERROR} from '../authorization/redux/actionConstants';
import '@babel/polyfill';

 

function* getUsers() {
    const response:Array<types.UserInfo> = yield fork(iFetch('users', 'GET')); 
  
    // console.log(response)
    // if(response) yield put({
    //     type: USERS_SUCCEEDED,
    //     payload: response
    // });
}
    
function* getComments() {
    const response:Array<types.Comment> = yield fork(iFetch('comments', 'GET'));

    console.log(response);
    //if(response) yield put ({type: USERS_SUCCEEDED, payload: response})
}
 

export default function* clientRequestSaga () {
    yield takeLatest(FETCH_REQUESTS, fetchRequests);
    yield throttle(500, GET_TOKEN, getToken);  
    yield takeEvery(FETCH_REQUEST, getResourseSaga);
}

// function* getUsers() {
//     const response:Array<types.UserInfo> = yield call (iFetch('users', 'GET')); 
//     console.log(response)
//     if(response) yield put ({type: USERS_SUCCEEDED, payload: response});
// }
    
// function* getComments() {
//     const response:Array<types.Comment> = yield call(iFetch('comments', 'GET'));
//     console.log(response);
//     //if(response) yield put ({type: USERS_SUCCEEDED, payload: response})

// }



export function* fetchRequests() {
    yield put (actions.fetchRequest('users', 'GET'));
    yield put (actions.fetchRequest('comments', 'GET'));
    
}

function* getResourseSaga(action: any) {
    try {
        yield call(throttleFn);
        yield fork(iFetch, action.endpoint, action.method, action.body, action.options);
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}

function* throttleFn() {
    yield put({type: GET_TOKEN});
}


function* getToken() {
    try {
        const checkedAccessToken: boolean = yield call(checkValidAccessToken);
        if(!checkedAccessToken) {
            const response: LoginResponse = yield call(refreshToken);
           // yield put ({type: SET_TOKENS, payload: response}); 
            yield call(saveTokensToLocalStorage, response);
        }
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
} 