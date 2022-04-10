import {call, put, takeEvery, spawn, delay, fork, throttle, takeLatest, takeLeading, all} from 'redux-saga/effects';
import {iFetch} from '../client/clientFetch';
import { refreshNewTokens } from '../authorization/authFetch';
import { requestValidToken } from '../utils/token';

import {CHECK_VALID_TOKEN, REFRESH_TOKEN, 
GET_TOKEN, 
GET_USERS, USERS_SUCCEEDED, USERS_FAILED,
GET_COMMENTS,  COMMENTS_SUCCEEDED,
FETCH_REQUEST, FETCH_REQUESTS} from '../client/redux/actionConstants';
import * as actions from '../client/redux/actionsCreators';
import * as types from '../client/clientTypes';
import {checkValidAccessToken} from '../checkValidTokens';
import {saveTokensToLocalStorage} from '../authorization/authFetch';
import {LoginResponse} from '../authorization/authTypes';
import { HANDLE_ERROR} from '../authorization/redux/actionConstants';
import '@babel/polyfill';

 

// function* getUsers() {
//     const response:Array<types.UserInfo> = yield fork(iFetch('users', 'GET')); 
  
//     // console.log(response)
//     // if(response) yield put({
//     //     type: USERS_SUCCEEDED,
//     //     payload: response
//     // });
// }
    
// function* getComments() {
//     const response:Array<types.Comment> = yield fork(iFetch('comments', 'GET'));

//     console.log(response);
//     //if(response) yield put ({type: USERS_SUCCEEDED, payload: response})
// }
 

export default function* clientRequestSaga () {
    yield takeEvery(FETCH_REQUESTS, fetchRequests);
    //yield takeEvery(GET_TOKEN, getToken);  
    yield takeEvery(FETCH_REQUEST, getResourseSaga);
}

function* getUsers() {
    try{
       
        const response: types.UserInfo = yield spawn(getResourseSaga, {endpoint: 'users', method: 'GET'});
        yield put ({type: USERS_SUCCEEDED, payload: response});
    }
    catch(error)
    {
        //cosnt err = yield put({type: HANDLE_ERROR, payload: error});
        console.log(error)
        yield put ({type: USERS_FAILED, payload: error});
    }
}
    
function* getComments() {
    const response: types.UserInfo = yield spawn(getResourseSaga, {endpoint: 'comments', method: 'GET'});
    console.log(response);
    if(response) yield put ({type: COMMENTS_SUCCEEDED, payload: response});

}

    
function* getAvatars() {
    const response: types.UserInfo = yield spawn(getResourseSaga, {endpoint: 'avatars', method: 'GET'});
    console.log(response);
    if(response) yield put ({type: COMMENTS_SUCCEEDED, payload: response});
}

function* getMessage() {
    const response: types.UserInfo = yield spawn(getResourseSaga, {endpoint: 'message', method: 'GET'});
    console.log(response);
    if(response) yield put ({type: COMMENTS_SUCCEEDED, payload: response});
}

export function* fetchRequests() {
    yield fork(getUsers);
    yield fork(getComments);
    yield fork(getAvatars);
    yield fork(getMessage);
    
}

function* getResourseSaga(action: any) {
    try {
        //yield call(throttleFn);
        yield call(getToken)

        const response: Response = yield call(iFetch, action.endpoint, action.method, action.body, action.options);
        return response;
    
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}

// function* throttleFn() {
//     yield put({type: GET_TOKEN});
// }


// function* getToken() {
//     try {
//         const checkedAccessToken: boolean = yield call(checkValidAccessToken);
//         if(!checkedAccessToken) {
//             const response: LoginResponse = yield call(refreshToken);
//            // yield put ({type: SET_TOKENS, payload: response}); 
//             yield call(saveTokensToLocalStorage, response);
//         }
//     }
//     catch(error) {
//         yield put({type: HANDLE_ERROR, payload: error});
//     }
// } 

function* getToken() {
    try {
      yield call(requestValidToken)
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
} 