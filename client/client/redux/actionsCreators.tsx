import * as Constants from './actionConstants';


export const getResource = (data) => {
    return {
        type: Constants.GET_RESOURSE,
        payload: data,
    }
};


export const refreshToken = (body) => {
    return {
        type: Constants.REFRESH_TOKEN,
        body
    }
};


export const checkExpiredTime = () => {
    return {
        type: Constants.CHECK_EXPIRED_TIME,
    }
}

export const cleanValidationError = () => {
    return {
        type: Constants.CLEAN_VALIDATION_ERROR
    }
}