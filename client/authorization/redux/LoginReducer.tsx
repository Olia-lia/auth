import React  from "react";
import {LOGIN_REQUEST_FAILED, LOGIN_REQUEST_SUCCEEDED, RESET_LOGIN_STATE} from "./actionConstants";
import * as types from '../authTypes'

const initialState: types.AuthState = {
    user: null,
    isLoginned: false,
    isValidationError: false,
    fieldsErrors: {
        username: null,
        password: null
    }
};

export const loginReducer  = (state = initialState, action) => {
    let newState: types.AuthState

    switch (action.type) {
   
        case LOGIN_REQUEST_SUCCEEDED:
            newState = {
                user: action.data,
                isLoginned: true, 
                isValidationError: false,
                fieldsErrors: {
                    username: null,
                    password: null
                }
            }
            return newState

        case LOGIN_REQUEST_FAILED: 
            newState = {
                ...state, 
                    user: null,
                    isLoginned: false,
                    isValidationError: true,
            }
            
            const responseError = action.error;
             responseError.errors.forEach((error) => {
               if (error.field === 'username') {
                    newState.fieldsErrors.username = error.message
               }
               else if(error.field === 'password') {
                newState.fieldsErrors.password = error.message
               }
           })
           console.log(newState)

            return newState

        case RESET_LOGIN_STATE: {
            newState = {
                user: null,
                isLoginned: false,
                isValidationError: false,
                fieldsErrors: {
                    username: null,
                    password: null
                }
            };

            return newState
        }
        
        default:
            return state;
    }

};
