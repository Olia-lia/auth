const BASE_URL = 'http://localhost:5000';
import fetchRequest from './fetchContainer'
import * as types from './authTypes';



// const checkStatusRequest = (response) => {
//     if (response.ok) {
//       return response;
//     }
//     const {status, message} = response;

  
//     //const error = new Error (`${status}- ${statusText}`);
//     alert(message)
  
// };
  

// const catchError = (error) => {
//     console.log(error)
//     if (error.status === 401) {
//         alert('not auth')
//     }
    
// };


const login = (body: types.credentials) => {
  return fetchRequest(`${BASE_URL}/auth/token`, body)
    
    // .then((data) => {
    
    //   localStorage.setItem('access_token', JSON.parse(data.accessToken))
    // }) 
  
    .catch((error) => {
        console.log(error)
    })
}

// const refreshToken = () => {
//     fetch(`${BASE_URL}/auth/refresh_token`, 
//         {
//             method: 'POST',
//             body: JSON.stringify(body)
//         },
//     )
// }

const getResource = () => {
    const token = localStorage.getItem('access_token')
    fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }  
    })
}



export  {login}