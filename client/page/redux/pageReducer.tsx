import {SET_PAGE_ERROR, RESET_PAGE_STATE} from './actionConstants';
import {PageState} from '../pageTypes'


const initialState: PageState = {
    isFetchingError: false,
    pageError: null
}

export const pageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_PAGE_ERROR: 
            return {
                isFetchingError: true, 
                pageError: action.payload
            };
            case RESET_PAGE_STATE: 
            return {
                isFetchingError: false,
                pageError: null
            }

        default: 
            return state;
    }
};