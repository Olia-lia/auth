import {LoginResponse} from '../authorization/authTypes';
import {refreshNewToken} from '../authorization/authFetch';
import {UnauthorizedError} from '../errorsMapper';
import {saveTokensToLocalStorage} from '../authorization/authFetch'
import { number } from 'prop-types';

interface CheckToken {
    isAccessTokenValid: () =>  boolean,
    isRefreshTokenValid: () => boolean
}

interface tokenPair {
    accessToken: string | null;
    refreshToken: string | null,
}

// abstract class iToken {
//     public static getToken: () => tokenPair;
//     public static isAccessTokenValue: () => boolean;
//     public static isRefreshTokenValue: () => boolean;
// }

class Token   {


    static getToken(): tokenPair{
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        }
    }

    static isAccessTokenValid(now: number){
        console.log('now', now);
        const tokenExpiresStr = localStorage.getItem('accessTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        console.log('access', tokenExpiresDate)
        return now < tokenExpiresDate
    }

    static isRefreshTokenValid(now: number) {
        console.log(now);
        const tokenExpiresStr = localStorage.getItem('refreshTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        console.log('аксксс', tokenExpiresDate)
        return now < tokenExpiresDate
    }
    
}

//export interface IRefreshTokenRequest {}

export async function requestValidToken(refreshTokenRequest = null) {
    console.log(refreshTokenRequest)
    let {refreshToken, accessToken} = Token.getToken();
    const now = Date.now();
    console.log(refreshToken)
    if (refreshToken == null || !Token.isRefreshTokenValid(now)) {
        throw new UnauthorizedError('token not valid');
    } 
    else if (accessToken == null || !Token.isAccessTokenValid(now)) {
        if (refreshTokenRequest == null) {
            refreshTokenRequest = refreshNewToken();
         
        }
        const data: LoginResponse = await refreshTokenRequest;
        refreshTokenRequest = null;
        const savedTokens = await saveTokensToLocalStorage(data)
        return data.accessToken
    }
    return accessToken;
}

