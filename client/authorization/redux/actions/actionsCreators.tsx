import * as Constants from './actionConstants';
import * as types from '../../authTypes';


export const logOut = () => {
    return {
        type: Constants.LOGOUT
    }
};


export const loginRequest = (credentials: types.credentialsLogin) => {
    return {
        type: Constants.LOGIN_REQUEST,
        credentials
    }
};

export const loginSuccess = (data: types.LoginResponse) => {
    return {
        type: Constants.LOGIN_REQUEST_SUCCEEDED, 
        data
    }
};

export const loginFailed = (error: string) => {
    return {
        type: Constants.LOGIN_REQUEST_FAILED, 
        error
    }
};

export const refreshToken = (data) => {
    return {
        type: Constants.REFRESH_TOKEN,
        data
    }
};

export const getResource = () => {
    return {
        type: Constants.GET_RESOURSE,
    }
};

export const checkExpiredTime = () => {
    return {
        type: Constants.CHECK_EXPIRED_TIME,
    }
}