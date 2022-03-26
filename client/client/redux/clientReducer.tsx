import * as types from '../clientTypes';
import { GET_RESOURSE, RESOURSE_FAILED, RESOURSE_SUCCEEDED } from './actionConstants';

const initialState: types.ClientState = {
   isFetching: false,
   isError: false,
   users: []

}

export const clientReducer = (state = initialState, action) =>  {
    let newState: types.ClientState

    switch (action.type) {
        case GET_RESOURSE:
            newState = {
              ...state,
              isFetching: true,
            }

            return newState;

        case RESOURSE_SUCCEEDED: 
            newState = {
                ...state, 
                isError: false,
                users: action.data
            }

            return newState

        case RESOURSE_FAILED:
            newState = {
                isFetching: false,
                isError: true,
                users: null
            }
            
        default: 
            return state
    }
   
}