import * as authTypes from './authorization/authTypes';
import * as clientTypes from './client/clientTypes';
import {PageState} from './page/pageTypes';

export type globalState = {
    login: authTypes.AuthState,
    page: PageState,
    client: clientTypes.ClientState,
}

export type ErrorType = {
    message: string,
    errorsArray: Array<ErrorElement>
 }