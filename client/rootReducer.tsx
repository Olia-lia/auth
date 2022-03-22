import {combineReducers} from 'redux';
import LoginReducer from './authorization/redux/LoginReducer';
import clientReducer from './client/redux/clientReducer';
import pageReducer from './page/redux/pageReducer'

 
//const globalState = 


export default combineReducers({
    LoginReducer, 
    pageReducer
})