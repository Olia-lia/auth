export const SET_PAGE_ERROR = 'SET_PAGE_ERROR';

export const setPageError = (error) => {
    return {
        type: SET_PAGE_ERROR, 
        error
    }
}