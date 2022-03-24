import * as types from '../clientTypes';
import { GET_RESOURSE } from './actionConstants';

const initialState: types.ClientState = {
    users: null
}

export const clientReducer = (state = initialState, action) =>  {
    let newState: types.ClientState

    switch (action.type) {
        case GET_RESOURSE:
            newState = {
                users: action.payload
            }

            return newState
        default: 
            return state
    }
   
}