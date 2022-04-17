import {LoginResponse} from '../authorization/authTypes';
//import {refreshNewToken} from '../authorization/authFetch';
import {UnauthorizedError} from 'auth-flow/lib/errors';
import {put, call, spawn, fork} from 'redux-saga/effects';
import { REFRESH_TOKEN } from '../authorization/redux/actionConstants';
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
//             refreshTokenRequest = ref(refreshToken);
//         }
//         const data: LoginResponse = await refreshTokenRequest;
      
//         //await setTokens(data);
//         refreshTokenRequest = null;
//         return data.accessToken;
//     }
//     return accessToken;

  
// }

let refreshTokenRequest: LoginResponse | null = null;

// export const refreshNewToken = function*(action) {
//     const data: LoginResponse = yield put({type: REFRESH_TOKEN, payload: action.payload})
// };

export function* requestValidToken() {
  
 console.log(refreshTokenRequest);
    let {refreshToken, accessToken} = yield call(Token.getToken);
    const now:number = yield call(Date.now);
    if (refreshToken == null || !(Token.isRefreshTokenValid(now))) {
        throw new UnauthorizedError('token not valid');
    } 
    else if (accessToken == null || !Token.isAccessTokenValid(now)) {

        if (refreshTokenRequest == null) {
            refreshTokenRequest = put({type: REFRESH_TOKEN, payload: refreshToken})
        }
        
        const data:LoginResponse = yield (refreshTokenRequest)
       
        //yield put({type: SET_TOKENS, payload: data})
     
  
         refreshTokenRequest = null;
         return data.accessToken
  
    }
    return accessToken;
}
