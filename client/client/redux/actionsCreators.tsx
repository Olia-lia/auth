import * as Constants from './actionConstants';
import * as Types from '../clientTypes'


export const getResource = () => {
    return {
        type: Constants.GET_RESOURSE,
    }
};

export const setResourse = (data: Types.UserInfo) => {
    return {
        type: Constants.RESOURSE_SUCCEEDED,
        data
    }
}

export const rejectResourse = (error) => {
    return {
        type: Constants.RESOURSE_FAILED,
        error
    }
}


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