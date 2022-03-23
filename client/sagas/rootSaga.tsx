import {all, spawn} from 'redux-saga/effects';
import authSaga from './authSaga';
import clientRequestSaga from './clientRequestSagas'


export default function* rootSaga () {

    const sagas = [authSaga, clientRequestSaga]
    yield all ([
        authSaga(),
        clientRequestSaga()
    ])
  } 