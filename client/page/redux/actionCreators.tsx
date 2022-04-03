import * as Constants from './actionConstants'

export const setPageError = (error) => {
    return {
        type: Constants.SET_PAGE_ERROR, 
        payload: error
    }
};

export const resetPageState = () => {
    return {
        type: Constants.RESET_PAGE_STATE, 
    }
};

