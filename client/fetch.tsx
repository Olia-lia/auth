const BASE_URL = 'http://localhost:5000';
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


const  fetchLogin = (body: types.credentials) => {
  
    fetch(`${BASE_URL}/auth/token`, 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            
            body: JSON.stringify(body)
        },
    )
    .then(async response => {
        if (response.ok) {
            const successPesponse: types.LoginResponse = await response.json()
            return successPesponse
        }
        else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
    }
    )
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



export  {fetchLogin}