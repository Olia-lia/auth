import {fetchRequest} from '../utils/fetchContainer';
import * as types from './authTypes';
import { RefreshTokenRequest } from '../client/clientTypes';

const BASE_URL = 'http://localhost:5000';


const saveTokensToLocalStorage = (data: types.LoginResponse) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessTokenExpiredIn', JSON.stringify(data.accessTokenExpiredIn));
    localStorage.setItem('refreshTokenExpiredIn', JSON.stringify(data.refreshTokenExpiredIn));
};

const login = (data: types.CredentialsLogin) => {
    return fetchRequest(`${BASE_URL}/auth/token`, 'POST', data);
};


// export const refreshNewToken = () => {
//     const checkedToken: boolean = checkValidRefreshToken();
 
//     if(checkedToken) {
//         const endpoint = 'auth/refresh_token';
//         const token = localStorage.getItem('refreshToken');
      
//         const data: types.RefreshTokenRequest = {
//             grant_type: 'refresh_token',
//             refreshToken: token
//         };
//         return fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
//     }
//     throw new UnauthorizedError('tokens not valid');
    
// };


export const refreshNewToken = () => {
    const endpoint = 'auth/refresh_token';
    const token = localStorage.getItem('refreshToken');
  
    const data: RefreshTokenRequest = {
        grant_type: 'refresh_token',
        refreshToken: token
    };
 
        const response: types.LoginResponse = fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
        saveTokensToLocalStorage(response)
        return response
//}
//throw new UnauthorizedError('tokens not valid');

};


const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiredIn');
    localStorage.removeItem('refreshTokenExpiredIn');
};

export {login, logout, saveTokensToLocalStorage};