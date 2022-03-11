const BASE_URL = 'http://localhost:5000';
import * as types from './authService';



const checkStatusRequest = (response) => {
    if (response.ok) {
      return response;
    }
    const {status, message} = response;

  
    //const error = new Error (`${status}- ${statusText}`);
    alert(message)
  
};
  

const catchError = (error) => {
    if (error.status === 401) {
        alert('not auth')
    }
    
};


const  fetchLogin = (body) => {
    fetch(`${BASE_URL}/auth/token`, 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body)
        },
    )
    .then(checkStatusRequest)
    .then((response) => {
        return response.json();
    })
    .then((obj) => {
      const data = JSON.stringify(obj);
      (alert(data))
        return data
    })
    .then((data) => {
    
      localStorage.setItem('access_token', JSON.parse(data.accessToken))
    }) 
  
    .catch((error) => {
        catchError(error)
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



export  {fetchLogin}