import {call, put, takeEvery, spawn, delay, fork, throttle, takeLatest, takeLeading, all} from 'redux-saga/effects';
import {iFetch} from '../client/clientFetch';
import { refreshNewToken } from '../authorization/authFetch';
import { requestValidToken } from '../utils/token';

import {REFRESH_TOKEN, 
GET_TOKEN, GET_USERS, USERS_SUCCEEDED, USERS_FAILED, GET_COMMENTS,  COMMENTS_SUCCEEDED,
FETCH_REQUEST, FETCH_REQUESTS} from '../client/redux/actionConstants';
import * as actions from '../client/redux/actionsCreators';
import * as types from '../client/clientTypes';
import {checkValidAccessToken} from '../checkValidTokens';
import {setTokens} from '../authorization/authFetch';
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
    yield takeLatest(FETCH_REQUESTS, fetchRequests);
    yield takeEvery(FETCH_REQUEST, fetchRequest);
    yield takeLeading(REFRESH_TOKEN, refreshNewToken);
}

function* getUsers() {
    try {
        const response: types.UserInfo = yield call(fetchRequest, {endpoint: 'users', method: 'GET'});
        if (response) yield put ({type: USERS_SUCCEEDED, payload: response});
    
    }
    
    catch(error) {
        console.log(error);
        yield put({type: USERS_FAILED, payload: error})
        yield put({type: HANDLE_ERROR, payload: error});
    }

}
    
function* getComments() {
    try{
        const response: types.UserInfo = yield call(fetchRequest, {endpoint: 'comments', method: 'GET'});
        if (response) yield put ({type: USERS_SUCCEEDED, payload: response});
        //else yield put({type: USERS_FAILED, payload: response})
    }
    catch(error) {
        console.log(error);
        yield put({type: USERS_FAILED, payload: error})
        yield put({type: HANDLE_ERROR, payload: error});
    }
}        
    
function* getAvatars() {
    try {
        const response: types.UserInfo = yield spawn(fetchRequest, {endpoint: 'avatars', method: 'GET'});
        if (response) yield put ({type: USERS_SUCCEEDED, payload: response});
        
    }
    catch(error) {
        
        yield put({type: USERS_FAILED, payload:error})
        yield put({type: HANDLE_ERROR, payload: error});
    }
}

function* getMessage() {
    try {
        const response: types.UserInfo = yield spawn(fetchRequest, {endpoint: 'message', method: 'GET'});
        if (response) yield put ({type: USERS_SUCCEEDED, payload: response});
        else yield put({type: USERS_FAILED, payload: response})
    }
    
    catch(error) {
        console.log(error)
        
       
        yield put({type: HANDLE_ERROR, payload: error});
    }
}

export function* fetchRequests() {
    yield fork(getUsers);
    yield fork(getAvatars);
    yield fork(getComments);
    yield fork(getMessage);
}

function* fetchRequest(action: any) {
 
       // yield call(throttleFn);
        yield call(requestValidToken);

        const response: Response = yield call(iFetch, action.endpoint, action.method, action.body, action.options);
       // return response;
    
   
    // catch(error) {
    //     console.log(error)
    //     yield put({type: HANDLE_ERROR, payload: error});
    // }
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
    //try {
    yield call(requestValidToken);
    //}
    // catch(error) {
    //     yield put({type: HANDLE_ERROR, payload: error});
    // }
} 