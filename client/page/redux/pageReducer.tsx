import {CLEAN_PAGE_ERROR, SET_PAGE_ERROR} from './actionCreators';
import {PageState} from '../pageTypes'


const initialState: PageState = {
    isFetchingError: false,
    pageError: null
}

export const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PAGE_ERROR: 
            return {
                isFetchingError: true, 
                pageError: action.error
            };

        case CLEAN_PAGE_ERROR:
            return initialState

        default: 
            return state;
    }
};