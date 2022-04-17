import * as Constants from './actionConstants';
import * as Types from '../clientTypes';


export const fetchRequest = (endpoint: string, method: string, body?: any, options: any) => {
    return {
        type: Constants.FETCH_REQUEST,
        endpoint,
        method, 
        body,
        options
    };
};


export const getToken = () => {
    return {
        type: Constants.GET_TOKEN,
    };
};

export const fetchRequests = () => {
    return {
        type: Constants.FETCH_REQUESTS,
    };
};

export const getUsers = () => {
    return {
        type: Constants.GET_USERS,
        // payload: {
        //     endpoint: 'users',
        //     method: 'GET'
        // }
    
    };
};


export const getComments = () => {
    return {
        type: Constants.GET_USERS,
    };
};


export const setUsers= (data: Types.UserInfo) => {
    return {
        type: Constants.USERS_SUCCEEDED,
        payload: data
    };
};

export const failedUsers = (error) => {
    return {
        type: Constants.USERS_FAILED,
        payload: error
    };
};

export const setComments= (data: Types.UserInfo) => {
    return {
        type: Constants.COMMENTS_SUCCEEDED,
        payload: data
    };
};

export const failedComments = (error) => {
    return {
        type: Constants.USERS_FAILED,
        payload: error
    };
};