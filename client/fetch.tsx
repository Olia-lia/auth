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
  
const login = (body: types.credentials) => {
  fetchRequest(`${BASE_URL}/auth/token`, body)
    
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
    fetchRequest('GET', `${BASE_URL}/users`)
}

const logout = () => {
    return fetchRequest('POST', )
}




export  {login, getResource}