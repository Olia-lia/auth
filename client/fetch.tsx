const BASE_URL = 'http://localhost:5000';
import {fetchRequest} from './fetchContainer'
import * as types from './authTypes';

 //validation 

  
// const catchError = (error) => {
//   const {status} = error
//   switch (status) {
//        case(401):
//          localStorage.removeItem('accessToken');

//         //if (!refreshtoken} 
//   }
// };

const login = (data: types.credentialsLogin) => {
    return fetchRequest('POST', `${BASE_URL}/auth/token`, data)
    .then((response => { 
      if (response.status >= 400) {
        throw response
      }
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

const checkExpireIn = () => {
  const now = new Date().getTime()
  console.log(now)
  const expireInStr = localStorage.getItem('accessTokenExpiredIn')
  if(!expireInStr) return null
  const expireIn = JSON.parse(expireInStr)
  console.log(expireIn)
  if (now > expireIn) localStorage.removeItem('accessToken')
  return expireIn
}

const refreshToken = (data) => {
  return fetchRequest('POST', `${BASE_URL}/auth/refresh_token`, data) 
}




export  {login, getResource, checkExpireIn, refreshToken}