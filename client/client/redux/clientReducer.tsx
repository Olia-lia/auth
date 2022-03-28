import * as types from '../clientTypes';
import { GET_RESOURSE, RESOURSE_FAILED, RESOURSE_SUCCEEDED } from './actionConstants';

const initialState: types.ClientState = {
   isFetching: false,
   isError: false,
   users: []

}

export const clientReducer = (state = initialState, action) =>  {

    switch (action.type) {
        case GET_RESOURSE:
           return {
              ...state,
              isFetching: true,
            }

        case RESOURSE_SUCCEEDED: 
            return {
                ...state, 
                isError: false,
                users: action.data
            }
            

        case RESOURSE_FAILED:
            return {
                isFetching: false,
                isError: true,
                users: []
            }
            
        default: 
            return state
    }
   
}