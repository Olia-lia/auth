import * as Constants from './actionConstants';


export const getResource = () => {
    return {
        type: Constants.GET_RESOURSE,
    }
};


export const refreshToken = (data) => {
    return {
        type: Constants.REFRESH_TOKEN,
        data
    }
};



export const checkExpiredTime = () => {
    return {
        type: Constants.CHECK_EXPIRED_TIME,
    }
}