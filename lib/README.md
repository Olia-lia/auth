# Module description
The module is designed to implement flow authentication. To use it, you need to connect the middleware saga

## Installation 
Download and install Node:
```
https://nodejs.org
```
Install packages:
```
redux
reux saga
```

### Valiables 
accessToken 
refreshToken
accessTokenExpiredIn - the time when the acessToken expires
refreshTokenExpiredIn - the time when the refreshToken expires
For this flow it needed to separate

## Methods
``` 
fetchRequest(url, method, body?, {options}) - method for REST API requests, wrapper fot native fetch method.
url - api adress 
methos - method of REST API request
body - optional parameter
options - optional parameter, default is an empty object.
Example: fetchRequest('http://localhost:5000', 'GET', body, {credentials:'same-origin'})
```   

### Saga methods 
to plug saga-watchers: 
```
Fom import Methods of redux saga

fetchRequest({url, method, body?, {options}}) - function-generator, that implements a request to the server.
To call a function in client code it necessary to create function-generator with
Example: 
function* getUsers() {
    const response= yield call(fetchRequest, {url: `${BASE_URL}/${endpoint}`, method: 'GET'});
    yield put ({type: USERS_SUCCEEDED, payload: response});
}


errorSaga 
```

## Redux 
### Redux Actions 
```
REFRESH_TOKEN 
the client needs to implement the REFRESH_TOKEN function, that return a new token pair, and put it to Sagawatcher. 
Example:
const BASE_URL = 'http//localhost:3000'

const refreshNewToken = () => {
    const endpoint = 'auth/refresh_token';
    const token = localStorage.getItem('refreshToken');
  
    const data: RefreshTokenRequest = {
        grant_type: 'refresh_token',
        refreshToken: token
    };
    const response: types.LoginResponse = fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
    return response;
};

function* SagaWatchers ={
    yield takeEvery(REFRESH_TOKEN, refreshNewToken);
} 

## Errors 

### Error Types
```
ValidationError (BadRequest) - form validation error, that comes from the server with status 400. 
Example: {"message":"validationError","errors":[{"field":"username","type":"required","message":"required field"},{"field":"password","type":"required","message":"required field"}]}
ModalError - error that should be shown to the user
UnathorizedError (401)
RedirectError
```
export class ValidationError extends Error {
    message: string
    errors?: Array<ErrorElement>

    constructor(message: string, errors: Array<ErrorElement>) {
        super(message);
        this.message = message,
        this.errors = errors;
    }


example of configuration file:
```
ACCESS_SECRET_KEY=<your secret key here>
REFRESH_SECRET_KEY
PORT
HOST
BASE_URL
CLIENT_URL
```




