import { REFRESH_TOKEN } from 'client/client/redux/actionConstants';
import {LoginResponse} from '../authorization/authTypes';
import {refreshToken} from '../client/clientFetch';
import {UnathorizedError} from '../errorsMapper';

interface CheckToken {
    isAccessTokenValid: () =>  boolean,
    isRefreshTokenValid: () => boolean
}

interface IToken {
    getToken: () => LoginResponse;
    checkToken: CheckToken;
}


class Token implements IToken {

    static getToken(): LoginResponse {
        localStorage.getItem('accessToken');
        localStorage.getItem('refreshToken');
    }
    
// export const checkValidAccessToken = (): boolean => { 
//     const accessToken = localStorage.getItem('accessToken');
//     const now = new Date().getTime();
//     const expireInStr = localStorage.getItem('accessTokenExpiredIn');
//     if(!accessToken || !expireInStr) return false;
//     const expireIn = JSON.parse(expireInStr);
//     if (now > expireIn) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('accessTokenExpiredIn');
//         return false;
//     }
//     return true;
// };

    //let refreshTokenRequest = false;

//
// export const refreshToken = () => {
//     const checkedToken: boolean = checkValidRefreshToken();
//     console.log('refresh', checkedToken);
//     if(checkedToken) {
//         const endpoint = 'auth/refresh_token';
//         const token = localStorage.getItem('refreshToken');
      
//         const data: types.RefreshTokenRequest = {
//             grant_type: 'refresh_token',
//             refreshToken: token
//         };
//         return fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
//     }
//     throw new UnauthorizedError(error);
    
// };


    static checkToken = {
        isAccessTokenValid: (now: number) => now < JSON.parse(localStorage.getItem('accessTokenExpiredIn')),
        isRefreshTokenValid: (now: number) => now < JSON.parse(localStorage.getItem('refreshTokenExpiredIn')),
    }
}


async function requestValidAccessToken() {
    let {refreshToken, accessToken} = Token.getToken();
    const now = Date.now();
    if (!Token.checkToken.isRefreshTokenValid(now)) {
        throw new UnathorizedError();
    } 
    else if (!accessToken || !Token.checkToken.isAccessTokenValid(now)) {
        if (!refreshTokenRequest) {
            //refreshTokenRequest: boolean = true;
            REFRESH_TOKEN
        }
        
        accessToken = await refreshToken;

        // и очищаем переменную
        refreshTokenRequest = null;
    }

    return accessToken;
}

