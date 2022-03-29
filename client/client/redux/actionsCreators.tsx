import * as Constants from './actionConstants';
import * as Types from '../clientTypes'


export const getResource = (endpoint: string) => {
    return {
        type: Constants.GET_RESOURSE,
        endpoint
    }
};

export const setResourse = (data: Types.UserInfo) => {
    return {
        type: Constants.RESOURSE_SUCCEEDED,
        data
    }
};

export const rejectResourse = (error) => {
    return {
        type: Constants.RESOURSE_FAILED,
        error
    }
};

export const refreshToken = (endpoint: string) => {
    return {
        type: Constants.REFRESH_TOKEN,
        endpoint
    }
};

export const refreshSuccess = () => {
    return {
        type: Constants.REFRESH_SUCCEEDED,
    }
};

export const refreshFailed = (error) => {
    return {
        type: Constants.REFRESH_FAILED,
        error
    }
};


export const cleanValidationError = () => {
    return {
        type: Constants.CLEAN_VALIDATION_ERROR
    }
};