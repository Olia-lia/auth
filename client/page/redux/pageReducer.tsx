import {SET_PAGE_ERROR} from './actionCreators'

const initialState = {
    pageError: null
}

const pageReducer = (state = initialState, action) => {
    let newState 
    switch (action.type) {
        case SET_PAGE_ERROR: 
            newState = {
                pageError: action.error
            }

        default: 
            return state;
    }
};

export default pageReducer