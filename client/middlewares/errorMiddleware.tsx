import {RESOURSE_FAILED} from '../client/redux/actionConstants';
import {SET_PAGE_ERROR} from '../page/redux/actionCreators';
import { LOGIN_REQUEST_FAILED } from '../authorization/redux/actionConstants';
 
export const errorMiddleware = (store:any) => {
    let state = store.getState();

    return next => action => {
        switch (action.type) {
            case value:
                
                break;
        
            default:
                break;
        }
    }

    next(action)

}