import { fetchRequest } from '../utils/fetchContainer';
import * as types from './clientTypes';

const BASE_URL = 'http://localhost:5000';

export const getResource = (endpoint: string) => {
    return fetchRequest('GET', `${BASE_URL}/${endpoint}`)
};

export const iFetch = (endpoint: string, method: string,  ...options: any) => {
    return fetchRequest(`${BASE_URL}/${endpoint}`, 'METHOD', options);
};

// client script
// export const getAllUsers = () => {
//     const endpoint = 'users';
//     const res = iFetch(endpoint, method);  
//     return res;
// };

export const refreshToken = () => {
    const endpoint = 'auth/refresh_token';
    const refreshToken = localStorage.getItem('refreshToken');
    const data: types.RefreshTokenRequest = {
        grant_type: 'refresh_token',
        refreshToken: refreshToken
    };
    return fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
};
