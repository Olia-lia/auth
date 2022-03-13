import * as Constants from './actionConstants';
import * as types from '../authTypes';


export const logOut = () => {
    return {
        type: Constants.LOGOUT
    }
};


export const loginRequest = (credentials: types.credentials) => {
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

export const loginFailed = (error) => {
    return {
        type: Constants.LOGIN_REQUEST_FAILED, 
        error
    }
};

export const refreshToken = () => {
    return {
        type: Constants.REFRESH_TOKEN,
        
    }

};