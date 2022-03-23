import React  from "react";
import {LOGIN_REQUEST_FAILED, LOGIN_REQUEST_SUCCEEDED, LOGOUT} from "./actionConstants";
import * as types from '../authTypes'

const initialState: types.AuthState = {
    user: null,
    isLoginned: false,
    userFieldErrors: {
        invalid: false,
        required: false
    },
    passwordFieldErrors: {
        invalid: false, 
        required: false
    }
}

export const loginReducer  = (state = initialState, action) => {
    let newState: types.AuthState

    switch (action.type) {
   
        case LOGIN_REQUEST_SUCCEEDED:
            newState = {
                ...state,
                user: action.data,
                isLoginned: true, 
                ...state.userFieldErrors,
                ...state.passwordFieldErrors
            }
            console.log(newState)
            
            return newState

        case LOGIN_REQUEST_FAILED: 
            newState = {
                ...state, 
                    user: null,
                    isLoginned: false,
            }

            
            const responseError = action.error;
            

            const setError = (errorType, error) => {
                switch(error.type){
                    case('required'):
                        errorType.required = true
                        break;
                    case('invalid'):
                        errorType.invalid = true
                        break;
                    default: false
                }
            }

            responseError.errors.forEach((error) => {
               if (error.field === 'username') {
                    setError(newState.userFieldErrors, error)
               }
               else if(error.field === 'password') {
                   setError(newState.passwordFieldErrors, error)
               }
           })
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
