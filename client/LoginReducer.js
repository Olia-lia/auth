import React  from "react";
import { SET_AUTHENTICATION } from "./actions/actionConstants";

const initialState = {
    userId: null,
    userLogin: null,
    isAuth: false,
}

const LoginReducer  = (state = initialState, action) => {
    switch (actionType) {
        case SET_AUTHENTICATION:
            return {
                ...state,
                ...action.data,
                isAuth: true  
            }
     

        default:
            return state;
    
    }

}


export default LoginReducer