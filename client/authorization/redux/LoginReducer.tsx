import React  from "react";
import {LOGIN_REQUEST_FAILED, LOGIN_REQUEST_SUCCEEDED, LOGOUT} from "./actionConstants";
import * as types from '../authTypes'

const initialState: types.AuthState = {
    user: null,
    isLoginned: false,
    error: null
}

const LoginReducer  = (state = initialState, action) => {
    let newState
    switch (action.type) {
   
        case LOGIN_REQUEST_SUCCEEDED:
            newState = {...state,
                user: action.data,
                isLoginned: true, 
                error: null 
            }
            console.log(newState)
            
            return newState

        case LOGIN_REQUEST_FAILED: 
            newState = {
               user: null,
               isLoginned: false,
               error: action.error
            }
            console.log('failed')
            console.log(newState)

            return newState

        case LOGOUT: {
            newState = initialState
            console.log('logout')

            return newState
        }
        
        default:
            return state;
    
    }

}


export default LoginReducer