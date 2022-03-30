import * as Errors from '../errorsMapper';
import {put, delay} from 'redux-saga/effects';
import {LOGIN_REQUEST_FAILED, LOGOUT} from '../authorization/redux/actionConstants';
import { CLEAN_PAGE_ERROR, SET_PAGE_ERROR} from '../page/redux/actionCreators';
import '@babel/polyfill';

function* errorHandlerSaga (error: any) {
    if (error instanceof Errors.ValidationError) {
        yield put({type: LOGIN_REQUEST_FAILED, error});
    }
    else if (error instanceof Errors.ModalError) {
        yield put ({type: SET_PAGE_ERROR, error});
        yield delay(2000);
        yield put({type: CLEAN_PAGE_ERROR});
    }
    else if (error instanceof Errors.UnauthorizedError) {
        yield put({type: LOGOUT});
    }
    //yield put 
}

export {errorHandlerSaga};
