import { fetchRequest } from 'auth-flow/lib/index';

const BASE_URL = 'http://localhost:5000';


export const iFetch = (endpoint: string, method: string, body?: any, someconfig={}) => {
    return fetchRequest(`${BASE_URL}/${endpoint}`, method, body, someconfig);
};
