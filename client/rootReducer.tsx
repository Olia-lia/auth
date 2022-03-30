import {combineReducers} from 'redux';
import {loginReducer} from './authorization/redux/LoginReducer';
import {clientReducer} from './client/redux/clientReducer';
import {pageReducer} from './page/redux/pageReducer';

 
export default combineReducers({
    login: loginReducer, 
    page: pageReducer,
    client: clientReducer,
});