import {AuthState} from './authorization/authTypes';
import {ClientState} from './client/clientTypes';
import {PageState} from './page/pageTypes';

export type globalState = {
    login: AuthState,
    page: PageState,
    client: ClientState,
}

export type ErrorType = {
    message: string,
    errorsArray: Array<ErrorElement>
 }

 