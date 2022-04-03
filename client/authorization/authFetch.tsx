import {fetchRequest} from '../utils/fetchContainer';
import * as types from './authTypes';

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

const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiredIn');
    localStorage.removeItem('refreshTokenExpiredIn')
};

export {login, logout, saveTokensToLocalStorage};