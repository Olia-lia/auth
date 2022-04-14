import { fetchRequest } from 'auth-flow/lib/index';
//import { fetchRequest } from '../utils/fetchContainer'

const BASE_URL = 'http://localhost:5000';


export const iFetch = (endpoint: string, method: string, body?: any, ...options: any) => {
    return fetchRequest(`${BASE_URL}/${endpoint}`, method, body, options);
};

