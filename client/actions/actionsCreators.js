import * as Constants from './actionConstants' 

export const login = (data) => {
    return {
        type: Constants.LOGIN_REQUEST,
        data
    }
}

export const logOut = () => ({
    type: Constants.LOGOUT
});


export const addUser = (value) => {
    return {
        type: Constants.ADD_USER,
        value
    }
}


export const setAuthenticationData = (data) => {
    return {
        type: Constants.SET_AUTHENTICATION, 
        data
    }
}

