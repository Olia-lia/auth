import * as Constants from './actionConstants';
import * as Types from '../clientTypes';


export const getResource = (endpoint: string) => {
    return {
        type: Constants.GET_RESOURSE,
        endpoint
    };
};

export const setResourse = (data: Types.UserInfo) => {
    return {
        type: Constants.RESOURSE_SUCCEEDED,
        data
    };
};

export const rejectResourse = (error) => {
    return {
        type: Constants.RESOURSE_FAILED,
        error
    };
};

export const refreshToken = () => {
    return {
        type: Constants.REFRESH_TOKEN,
     
    };
};

export const getToken = () => {
    return {
        type: Constants.GET_TOKEN,
    };
};

// export const cleanValidationError = () => {
//     return {
//         type: Constants.CLEAN_VALIDATION_ERROR,
//     };
// };