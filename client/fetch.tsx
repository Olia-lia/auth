const BASE_URL = 'http://localhost:5000';
import {fetchRequest} from './fetchContainer'
import * as types from './authTypes';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

  
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
      localStorage.setItem('accessToken', data.accessToken);
      return data
    })
    .catch(async error => {
      const body = await error.json()
      alert(body.message)
         //     const {status, statusText} = error;
    //     const newerror = new Error (`${status}- ${statusText}`);
    //     alert(newerror)
    //  })

      })
      
   
}

const getResource = () => {
  fetchRequest('GET', `${BASE_URL}/users`)
}



export  {login, getResource}