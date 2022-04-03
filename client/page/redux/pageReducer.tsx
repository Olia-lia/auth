import {SET_PAGE_ERROR} from './actionCreators';
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
                pageError: action.error
            };

        default: 
            return state;
    }
};