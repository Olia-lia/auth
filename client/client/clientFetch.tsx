import { fetchRequest } from '../utils/fetchContainer';
import * as types from './clientTypes';

const BASE_URL = 'http://localhost:5000';

export const getResource = (endpoint: string) => {
    return fetchRequest('GET', `${BASE_URL}/${endpoint}`)
};

export const iFetch = (method: string, endpoint: string, ...options: any) => {
    return fetchRequest(method, `${BASE_URL}/${endpoint}`, isRetried = false, options);
};

// client script
export const getAllUsers = () => {
    const endpoint = 'users';
    const res = getResource(endpoint);  
    return res;
};

export const refreshToken = () => {
    const endpoint = 'auth/refresh_token';
    const refreshToken = localStorage.getItem('refreshToken');
    const data: types.RefreshTokenRequest = {
        grant_type: 'refresh_token',
        refreshToken: refreshToken
    };
    return fetchRequest('POST', `${BASE_URL}/${endpoint}}`, data);
};
