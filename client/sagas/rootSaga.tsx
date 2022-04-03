import {all, call, spawn} from 'redux-saga/effects';
import authSaga from './authSaga';
import clientRequestSaga from './clientRequestSagas';
import errorSaga from './handlerErrorsSaga';


export default function* rootSaga () {

    const sagas = [authSaga, clientRequestSaga, errorSaga];

    const retrySagas = sagas.map(saga => {
        return spawn(function* () {
            while(true) {
                try {
                    yield call(saga);
                    break
                }
                catch(error) {
                    console.log(error)
                }
            }
        })
    });
    yield all(retrySagas)
    // yield all ([
    //     authSaga(),
    //     clientRequestSaga(), 
    //     errorSaga(),
    // ]);
} 