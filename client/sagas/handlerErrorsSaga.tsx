import * as Errors from '../errorsMapper';
import {put, delay, takeLeading} from 'redux-saga/effects';
import {LOGIN_REQUEST_FAILED, LOGOUT, HANDLE_ERROR} from '../authorization/redux/actionConstants';
import { CLEAN_PAGE_ERROR, SET_PAGE_ERROR} from '../page/redux/actionCreators';
import '@babel/polyfill';


export default function* errorSaga () {
    yield takeLeading(HANDLE_ERROR, errorHandlerSaga);
 
} 

const delayCleanError: number = 2000;

function* errorHandlerSaga (action) {
    if (action.error instanceof Errors.ValidationError) {
        yield put({type: LOGIN_REQUEST_FAILED, error: action.error});
    }
    else if (action.error instanceof Errors.ModalError) {
        yield put ({type: SET_PAGE_ERROR, error: action.error});
        yield delay(delayCleanError);
        yield put({type: CLEAN_PAGE_ERROR});
    }
    else if (action.error instanceof Errors.UnauthorizedError) {
        yield put({type: LOGOUT});
    }

}

export {errorHandlerSaga};
