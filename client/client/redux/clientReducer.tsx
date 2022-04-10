import * as types from '../clientTypes';
import {USERS_FAILED, USERS_SUCCEEDED, COMMENTS_SUCCEDEED, COMMENTS_FAILED, FETCH_REQUEST } from './actionConstants';

const initialState: types.ClientState = {
    isFetching: false,
    isError: false,
    users: [],
    comments: []
};

export const clientReducer = (state = initialState, action: any) =>  {

    switch (action.type) {
    case FETCH_REQUEST:
        return {
            ...state,
            isFetching: true,
            users: [...state.users]
        };

    case USERS_SUCCEEDED: 
        // eslint-disable-next-line no-case-declarations
        let newState = {
            ...state, 
            isError: false,
            users: [...state.users, action.payload]

        };
        
        console.log(newState.users);
        return newState;
 
        

    case USERS_FAILED:
        return {
            isFetching: false,
            isError: true,
            users: []
        };
            
    default: 
        return state;
    }
};