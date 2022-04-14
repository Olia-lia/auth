//import {LoginResponse} from 
import {refreshNewToken} from '../authorization/authFetch';
import {UnauthorizedError} from './errors'
import {saveTokensToLocalStorage} from '../authorization/authFetch'

interface tokenPair {
    accessToken: string | null;
    refreshToken: string | null,
}

class Token   {
    static getToken(): tokenPair{
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        };
    }

    static isAccessTokenValid(now: number){
        const tokenExpiresStr = localStorage.getItem('accessTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        return now < tokenExpiresDate;
    }

    static isRefreshTokenValid(now: number) {
        const tokenExpiresStr = localStorage.getItem('');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        return now < tokenExpiresDate;
    }
    
}

let refreshTokenRequest: LoginResponse | null = null;

export async function requestValidToken() {
    console.log(refreshTokenRequest);
    let {refreshToken, accessToken} = Token.getToken();
    const now = Date.now();
    if (refreshToken == null || !Token.isRefreshTokenValid(now)) {
        throw new UnauthorizedError('token not valid');
    } 
    else if (accessToken == null || !Token.isAccessTokenValid(now)) {
        if (refreshTokenRequest == null) {
            refreshTokenRequest = refreshNewToken(refreshToken);
        }
        const data: LoginResponse = await refreshTokenRequest;
        refreshTokenRequest = null;
        await saveTokensToLocalStorage(data);
        return data.accessToken;
    }
    return accessToken;
}

