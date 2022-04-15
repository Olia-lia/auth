import {put, takeEvery, call, spawn, takeLatest} from 'redux-saga/effects';
import * as Errors from './errors';
import { iFetch } from './index';
import {AuthTypes, ClientTypes} from './redux'
import { requestValidToken } from './index';
import '@babel/polyfill';

export default function* clientRequestSaga () {
    yield takeLatest(ClientTypes.FETCH_REQUEST, fetchRequest);
}
 
    
function* fetchRequest(action: any) {
    yield call(requestValidToken);
    const response: Response = yield call(iFetch, action.endpoint, action.method, action.body, action.options);
    return response
};