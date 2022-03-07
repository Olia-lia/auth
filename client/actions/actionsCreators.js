import * as Constants from './actionConstants' 

const login = (data) => {
    return {
        type: Constants.LOGIN_REQUEST,
        data
    }
}

export const addUser = (value) => ({
    type: ADD_USER,
    value
  })

