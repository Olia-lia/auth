import {LoginResponse} from '../authorization/authTypes';
import {refreshNewToken} from '../authorization/authFetch';
import {UnauthorizedError} from 'auth-flow/lib/errors';
import {setTokens} from '../authorization/authFetch';
import {put, call, spawn, fork} from 'redux-saga/effects';
import { REFRESH_TOKEN } from '../client/redux/actionConstants';
import '@babel/polyfill';

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




// export async function requestValidToken() {

//     console.log(refreshTokenRequest);
//     let {refreshToken, accessToken} = Token.getToken();
//     const now = Date.now();
//     if (refreshToken == null || !Token.isRefreshTokenValid(now)) {
//         throw new UnauthorizedError('no token');
//     } 
//     else if (accessToken == null || !Token.isAccessTokenValid(now)) {
//         if (refreshTokenRequest == null) {
//             refreshTokenRequest = refreshNewToken();
//         }
//         const data: LoginResponse = await refreshTokenRequest;
//         refreshTokenRequest = null;
//         await setTokens(data);
//         return data.accessToken;
//     }
//     return accessToken;

  
// }

let refreshTokenRequest: LoginResponse | null = null;

const refffreshToken = function*(action) {
    yield put({type: REFRESH_TOKEN, payload: action.payload});
};

export function* requestValidToken() {
  
    let {refreshToken, accessToken} = yield call(Token.getToken);
    const now =  yield call(Date.now);
    if (refreshToken == null || !Token.isRefreshTokenValid(now)) {
        throw new UnauthorizedError('token not valid');
    } 
    else if (accessToken == null || !Token.isAccessTokenValid(now)) {
        if (refreshTokenRequest == null) {
            refreshTokenRequest = yield refffreshToken(refreshToken)
     
        }
        const data:LoginResponse = yield call (refffreshToken, refreshToken)
        console.log(data)
        yield call(setTokens, data);
       
        refreshTokenRequest = null;
       // return data.accessToken;
    }
    return accessToken;
}
