import {all} from 'redux-saga/effects';
import authSaga from './authSaga';
import clientRequestSaga from './clientRequestSagas'

export default function* rootSaga () {
    yield all ([
        authSaga(),
        clientRequestSaga()
    ])
  } 