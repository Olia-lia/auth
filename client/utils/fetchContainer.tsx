import * as Errors from '../errorsMapper';

interface IStatus {
	status?: number
}

const fetchRequest = (url: string, method: string,  body?: any, isRetried:boolean = false, ...someConfig: any) => {    
    //console.log(isRetried);
    
    const token = localStorage.getItem('accessToken');

    const options = {   
        method: method,
        ...someConfig,
        
        headers: {
            'Content-Type': 'application/json',
            'accept':'application/json',
            ...someConfig.header
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if(token) {
        options.headers.authorization = `Bearer ${token}`;
    }

    return fetch(url, options) // типизация
        .then(async (response) => {
            if (response.status >= 400) {
                if (response.status === 401 && !isRetried) {
                    return fetchRequest(url, method, body, isRetried = true, ...someConfig);
                }
            
                return handleError(response);
    
            }
            else if(response.ok) {
                return response.json();
            }
        });
};

async function handleError(error: any) {
  
    const data = await error.json();
    const {message, errors} = data;
    switch (error.status) {
    case(401):
        throw Errors.UnauthorizedError.createUnauthorizedError(message);
    case(400): 
        if(message === 'validationError') {
            throw Errors.ValidationError.createValidError(errors);
        }
        else if(message === 'modalError') {
            throw Errors.ModalError.createModalError(errors);
        }
        else throw new Error(message);
    case(404): 
        throw new Errors.UnderfindError(message)
        
    default: 
        if(message === 'modalError') {
            throw Errors.ModalError.createModalError(errors);
        }
        throw new Error(message);
    }
}

export {fetchRequest, handleError};