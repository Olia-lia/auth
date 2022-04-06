import * as types from '../clientTypes';
import {USERS_FAILED, USERS_SUCCEEDED, COMMENTS_SUCCEDEED, COMMENTS_FAILED } from './actionConstants';

const initialState: types.ClientState = {
    isFetching: false,
    isError: false,
    users: [],
    comments: []
};

export const clientReducer = (state = initialState, action: any) =>  {

    switch (action.type) {
    // case GET_RESOURSE:
    //     return {
    //         ...state,
    //         isFetching: true,
    //         users: [state.users]
    //     };

    case USERS_SUCCEEDED: 
        return {
            ...state, 
            isError: false,
            users: [...state.users,
                ...action.payload]
        };
        

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