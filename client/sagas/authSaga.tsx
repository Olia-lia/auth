import {put, takeEvery, call, takeLeading} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_REQUEST_SUCCEEDED, LOGIN_REQUEST_FAILED, LOGOUT, REFRESH_TOKEN, CHECK_EXPIRED_TIME} from '../authorization/redux/actions/actionConstants';
import {login, refreshToken, logout, saveTokensToLocalStorage} from '../authorization/authFetch';
import {getResource} from '../client/clientRequest'
import {checkExpireIn, checkRefreshTokenIsExist} from '../authorization/authMiddlewares'

import '@babel/polyfill'
import {LoginResponse, credentialsLogin, Error} from '../authorization/authTypes';
import { fetchRequest } from '../utils/fetchContainer';


const catchError = async(error: any) => {
  const data: Error = await error.json()
  const {message, errorsArray} = data

  switch (error.status) {
      case(401):

      //if(!retried) { 
      // retry
       // return;
      //}
      // use logout func
      localStorage.removeItem('accessToken');
      break
    
    case(400): 
      return data
      break
    }
};


export class AppError {
  message: string
  errors: Array<any>

  constructor(message: string, errors) {
    this.message = message;
    this.errors = errors
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors) {
    super(message, errors);
    this.message = message,
    this.errors = errors
  }

  static createValidError(errors) {
    return new ValidationError('validationError', errors)
  }
}

export class ModalError extends AppError {
  constructor(message: string, errors) {
    super(message, errors);
    
  }
  static createModalError(errors) {
    return new ModalError('modalError', errors)
  }
} 

export default function* authSaga () {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  //yield takeLeading(CHECK_EXPIRED_TIME, checkExpireIn)
} 

// 

function* loginSaga(action: any) { 
  try {
    const response: LoginResponse = yield call(login, action.credentials)
    if(response) {
      yield (saveTokensToLocalStorage(response)) 
      yield put({type: LOGIN_REQUEST_SUCCEEDED, response})  
    }
 }

  catch(error) {
    const err: Error = yield (catchError(error))
    console.log(err)

    // const createError = (err) => {
    //      switch(err.message) {
    //         case('validationError'): 
    //           return ValidationError.createValidError(err.errorsArray)
    //         break;
    //         case('modalError'):
    //           return ModalError.createModalError(err.errorsArray)
    //         break 
    //         default:
    //           return null
    //           //return AppError.createAppError()
    //       }
    //     }
    //    const errorInstance = createError(err);
    //    console.log(errorInstance)
    //   if (errorInstance instanceof ValidationError)
      yield put({type: LOGIN_REQUEST_FAILED, err})
      
      yield put({type: LOGOUT})
  }
};

function* logoutSaga(action: any) {
  yield call(logout)
  yield put({type: LOGOUT})
}



