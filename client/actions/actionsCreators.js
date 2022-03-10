import * as Constants from './actionConstants' 


export const logOut = () => {
    return {
        type: Constants.LOGOUT
    }
};


export const loginRequest = (credentials) => {
    return {
        type: Constants.LOGIN_REQUEST,
        credentials
    }
};

export const loginSuccess = (data) => {
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
        credentials
    }

};
