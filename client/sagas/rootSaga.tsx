import {all, spawn} from 'redux-saga/effects';
import authSaga from './authSaga';
import clientRequestSaga from './clientRequestSagas';
import errorSaga from './handlerErrorsSaga';


export default function* rootSaga () {

    const sagas = [authSaga, clientRequestSaga, errorSaga];
    yield all ([
        authSaga(),
        clientRequestSaga(), 
        errorSaga(),
    ]);
} 