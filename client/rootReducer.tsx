import {combineReducers} from 'redux';
import LoginReducer from './authorization/redux/LoginReducer';
import clientReducer from './client/redux/clientReducer'
 
//const globalState = 


export default combineReducers({
    LoginReducer, 
})