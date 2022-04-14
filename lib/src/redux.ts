export enum AuthTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_REQUEST_SUCCEEDED = 'LOGIN_REQUEST_SUCCEEDED',
    LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    RESET_LOGIN_STATE = 'RESET_LOGIN_STATE',
    LOGOUT = 'LOGOUT',
    SET_TOKENS = 'SET_TOKENS'
}


export enum ClientTypes {
    GET_TOKEN = 'GET_TOKEN',
    FETCH_REQUEST = 'FETCH_REQUEST',
    FETCH_REQUESTS = 'FETCH_REQUESTS'
}


export const loginRequest = (credentials) => {
    return {
        type: AuthTypes.LOGIN_REQUEST,
        payload: credentials,
    };
};


export interface RefreshToken {
    type: AuthTypes.REFRESH_TOKEN,
    payload: {
        refreshToken: string,
    }
    
}

export interface SET_TOKENS {
    type: AuthTypes.SET_TOKENS,
    payload: {
        tokens
    }
}
