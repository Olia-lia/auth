import { fetchRequest } from '../utils/fetchContainer';
import * as types from './clientTypes';
import { checkValidRefreshToken} from '../checkValidTokens';
import { UnauthorizedError } from '../errorsMapper';

const BASE_URL = 'http://localhost:5000';


export const iFetch = (endpoint: string, method: string, body?: any, ...options: any) => {
    return fetchRequest(`${BASE_URL}/${endpoint}`, method, body, options);
};

