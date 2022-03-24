import {fetchRequest} from '../utils/fetchContainer'
import * as types from './authTypes';

const BASE_URL = 'http://localhost:5000';


const saveTokensToLocalStorage = (data: types.LoginResponse) => {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('accessTokenExpiredIn', JSON.stringify(data.accessTokenExpiredIn))
}

const login = (data: types.credentialsLogin) => {
    return fetchRequest('POST', `${BASE_URL}/auth/token`, data)
}

const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data: types.RefreshTokenRequest = {
    grant_type: 'refresh_token',
    refreshToken: refreshToken
  }
  return fetchRequest('POST', `${BASE_URL}/auth/refresh_token`, data)
}

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessTokenExpiredIn')
}

export {login, refreshToken, logout, saveTokensToLocalStorage}