export const SET_PAGE_ERROR = 'SET_PAGE_ERROR';
export const CLEAN_PAGE_ERROR = 'CLEAN_PAGE_ERROR'; 

export const setPageError = (error) => {
    return {
        type: SET_PAGE_ERROR, 
        error
    }
}

export const cleanPageError = () => {
    return {
        type: CLEAN_PAGE_ERROR, 
    }
}