import { fetchRequest } from '../utils/fetchContainer';
import * as types from './clientTypes';
import { checkValidRefreshToken} from '../checkValidTokens';
import { UnauthorizedError } from '../errorsMapper';

const BASE_URL = 'http://localhost:5000';

export const getResource = (endpoint: string) => {
    return fetchRequest(`${BASE_URL}/${endpoint}`,  'GET');
};

export const iFetch = (endpoint: string, method: string, body?: any, ...options: any) => {
    return fetchRequest(`${BASE_URL}/${endpoint}`, method, body, options);
};

// client script
export const getAllUsers = () => {
    const endpoint = 'users';
    const res = iFetch(endpoint, 'GET');  
    return res;
};

export const refreshToken = () => {
    const checkedToken: boolean = checkValidRefreshToken();
    console.log('refresh', checkedToken);
    if(checkedToken) {
        const endpoint = 'auth/refresh_token';
        const token = localStorage.getItem('refreshToken');
      
        const data: types.RefreshTokenRequest = {
            grant_type: 'refresh_token',
            refreshToken: token
        };
        return fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
    }
    throw new UnauthorizedError('tokens not valid');
    
};
