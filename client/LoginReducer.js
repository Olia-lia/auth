import React  from "react";
import { LOGIN_REQUEST_FAILED, LOGIN_REQUEST_SUCCEEDED, LOGOUT } from "./actions/actionConstants";

const initialState = {
    user: null,
    isLoginned: false,
    error: null
}

const LoginReducer  = (state = initialState, action) => {
    let newState
    switch (action.type) {
   
        case LOGIN_REQUEST_SUCCEEDED:
            newState = {...state,
                ...action.data,
                isLoginned: true, 
                error: null 
            }
            
            return newState

        case LOGIN_REQUEST_FAILED: 
            newState = {
               ...state, 
               user: null,
               error
            }

            return newState

        case LOGOUT: {
            newState = initialState;

            return newState
        }
        
        default:
            return state;
    
    }

}


export default LoginReducer