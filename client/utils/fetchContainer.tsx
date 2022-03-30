import * as Errors from '../errorsMapper';

interface IStatus {
	status?: number
}

const getToken = (): boolean => { 
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return false;
    const now = new Date().getTime();
    const expireInStr = localStorage.getItem('accessTokenExpiredIn');
    if(!expireInStr) return false;
    const expireIn = JSON.parse(expireInStr);
    if (now > expireIn) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiredIn');
        return false;
    }
    return true;
};


const fetchRequest = (url: URL | string, method: string, body?: any, isRetried:boolean = false, ...someConfig: any) => {
    console.log(isRetried)
    //const token = getToken(); вынести в сагу
    const token = localStorage.getItem('accessToken');

    const options = {   
        method: method,
        ...someConfig,
        
        headers: {
            'Content-Type': 'application/json',
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
        .then((response: Response) => {
            if (response.status >= 400) {
                if (response.status === 401 && !isRetried) {
                    fetchRequest(url, options, isRetried = true);
                }
                else handleError(response);
            }
            else if(response.ok) {
                return response.json();
            }
        });
};

const handleError = (error: any) => {
    const data = error.json();
    console.log(data);
    const {message, errors} = data;
    switch (error.status) {
    case(401):
        throw Errors.UnauthorizedError.createUnauthorizedError(message);
    case(400): 
        if(message === 'validationError') {
            throw new Errors.ValidationError(message, errors);
        }
        else if(message === 'modalError') {
            throw Errors.ModalError.createModalError(errors);
        }
        else throw new Error(message);

    default: 
        return data
        // if(message === 'modalError') {
        //     throw Errors.ModalError.createModalError(errors);
        // }
        // throw new Error(error.statusText);
    }
};

export {fetchRequest};