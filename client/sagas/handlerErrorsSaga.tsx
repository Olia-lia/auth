import * as Errors from '../errorsMapper';
import {put, take, takeLeading, takeEvery} from 'redux-saga/effects';
import {LOGIN_REQUEST_FAILED, LOGOUT, HANDLE_ERROR} from '../authorization/redux/actionConstants';
import { SET_PAGE_ERROR} from '../page/redux/actionConstants';
import '@babel/polyfill';


export default function* errorSaga () {
    yield takeEvery(HANDLE_ERROR, errorHandlerSaga);
 
} 

function* errorHandlerSaga (action) {
    if (action.payload instanceof Errors.ValidationError) {
        yield put({type: LOGIN_REQUEST_FAILED, payload: action.payload});
    }
    else if (action.payload instanceof Errors.ModalError) {
        yield put ({type: SET_PAGE_ERROR, payload: action.payload});
    }
    else if (action.payload instanceof Errors.UnauthorizedError) {
        yield put({type: LOGOUT});
    }

}

export {errorHandlerSaga};
