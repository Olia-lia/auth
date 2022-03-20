const BASE_URL = 'http://localhost:5000';
import {fetchRequest} from '../utils/fetchContainer'
import * as types from './authTypes';

const checkRequest = (response: any) => {
  if (response.status >= 400) {
    throw response
  }
  else if (response.status === 200)
  return response.json()
}

// const getToken = async(data: types.LoginResponse) => {
//     console.log(data)
//     await localStorage.setItem('accessToken', data.accessToken);
//     await localStorage.setItem('refreshToken', data.refreshToken);
//     await localStorage.setItem('accessTokenExpiredIn', JSON.stringify(data.accessTokenExpiredIn))
//     return data
// }

 const login = (data: types.credentialsLogin) => {
    return fetchRequest('POST', `${BASE_URL}/auth/token`, data)
    .then((response => { 
      if (response.status >= 400) {
        throw response
      }
      else if (response.status === 200)
      return response.json()
    }))
    .then(data => {
      console.log(data)
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('accessTokenExpiredIn', data.accessTokenExpiredIn)
      return data
    })
    .catch(async error => {
      const body = await error.json()
      alert(body.message)
    })
}

const getResource = () => {
  return fetchRequest('GET', `${BASE_URL}/users`)
  .then((response => {
    console.log(response)
  }))
  .catch(async error => {
    const body = await error.json()
    alert(body.message)
  })
}

const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const data: types.RefreshTokenRequest = {
    grant_type: 'refresh_token',
    refreshToken: refreshToken
  }
  
  
  return fetchRequest('POST', `${BASE_URL}/auth/refresh_token`, data)
  .then(checkRequest)
  .then(data => {
    console.log(data)
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('accessTokenExpiredIn', data.accessTokenExpiredIn)
    return getResource()
  })
  .catch(async error => {
    const body = await error.json()
    alert(body.message)
  })
}




export  {login, getResource, refreshToken}