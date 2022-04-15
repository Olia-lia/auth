import * as Errors from './errors';
import { LoginResponse, tokenPair } from './types';

export const fetchRequest = (
    url: string, 
    method: string,  
    body?: any,
    someConfig:any = {}, 
    isRetried:boolean = false): any => {    
    const token = localStorage.getItem('accessToken');

    const options = {   
        method: method,
        ...someConfig,
        
        headers: {
            'Content-Type': 'application/json',
            'accept':'application/json',
            ...someConfig.header
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if(token) {
        options.headers.authorization = `Bearer ${token}`;
    }

    return fetch(url, options) 
        .then(async (response) => {
            if (!response.ok) {
                if (response.status === 401 && !isRetried) {
                    return fetchRequest(url, method, body, someConfig, isRetried = true);
                }
            
                return handleError(response);
    
            }
           
                return response.json();
        
        });
};

async function handleError(error: any) {
  
    const data = await error.json();
    const {message, errors} = data;
    switch (error.status) {
    case(401):
        throw Errors.UnauthorizedError.createUnauthorizedError(message);
    case(400): 
        if(message === 'validationError') {
            throw Errors.ValidationError.createValidationError(errors);
        }
        else if(message === 'modalError') {
            throw Errors.ModalError.createModalError(errors);
        }
        else throw new Error(message);
    case(404): 
        throw new Errors.UnderfindError(message)
        
    default: 
        if(message === 'modalError') {
            throw Errors.ModalError.createModalError(errors);
        }
        throw new Error(data);
    }
}

export const iFetch = (url: string, method: string, body?: any, ...options: any) => {
    return fetchRequest(url, method, body, options)
};


const setTokens = (data: LoginResponse) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessTokenExpiredIn', JSON.stringify(data.accessTokenExpiredIn));
    localStorage.setItem('refreshTokenExpiredIn', JSON.stringify(data.refreshTokenExpiredIn));
};

class Token   {
    static getToken(): tokenPair{
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        };
    }

    static isAccessTokenValid(now: number){
        const tokenExpiresStr: string | null  = localStorage.getItem('accessTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        return now < tokenExpiresDate;
    }

    static isRefreshTokenValid(now: number) {
        const tokenExpiresStr = localStorage.getItem('refreshTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        return now < tokenExpiresDate;
    }
    
}


let refreshTokenRequest = null;

export async function requestValidToken() {
    console.log(refreshTokenRequest);
    let {refreshToken, accessToken} = Token.getToken();
    const now = Date.now();
    if (refreshToken == null || !Token.isRefreshTokenValid(now)) {
        throw new Errors.UnauthorizedError('no token');
    } 
    else if (accessToken == null || !Token.isAccessTokenValid(now)) {
        if (refreshTokenRequest == null) {
            refreshTokenRequest = refreshNewToken();
        }
        const data: LoginResponse = await refreshTokenRequest;
        refreshTokenRequest = null;
        await setTokens(data);
        return data.accessToken;
    }
    return accessToken;
}


const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiredIn');
    localStorage.removeItem('refreshTokenExpiredIn');
};