import * as Constants from './actionConstants';
import * as types from '../authTypes';


export const logOut = () => {
    return {
        type: Constants.LOGOUT
    };
};

export const resetLoginState = () => {
    return {
        type: Constants.RESET_LOGIN_STATE
    };
};


export const loginRequest = (credentials: types.CredentialsLogin) => {
    return {
        type: Constants.LOGIN_REQUEST,
        credentials,
    };
};

export const loginSuccess = (data: types.LoginResponse) => {
    return {
        type: Constants.LOGIN_REQUEST_SUCCEEDED, 
        data
    };
};

export const loginFailed = (error) => {
    return {
        type: Constants.LOGIN_REQUEST_FAILED, 
        payload: error
    };
};


export const  handleErrors = (error) => {
    return {
        type: Constants.HANDLE_ERROR,
        payload: error
    };
};

export const setTokens  = (data: types.LoginResponse) => {
    return {
        type: Constants.SET_TOKENS,
        payload: data
    };
}; 


// interface SetTokens {
//     type: AuthTypes.SET_TOKENS,
//     payload: TokenPair,
// }

// interface RemoveTokens {
//     type: AuthTypes.REMOVE_TOKENS,
//     payload: TokenPair,
// }

// interface RefreshTokens {
//     type: AuthTypes.REFRESH_TOKENS,
//     payload: {
//         refreshToken: string,
//     }
// }

// interface AcquireTokens {
//     type: AuthTypes.ACQUIRE_TOKENS,
//     payload: {
//         url: string,
//     }
// }

// export type AuthActions =
//     SetTokens
//     | RemoveTokens
//     | RefreshTokens
//     | AcquireTokens;
