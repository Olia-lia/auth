import {AuthState} from './authorization/authTypes';
import {ClientState} from './client/clientTypes';
import {PageState} from './page/pageTypes';

export type globalState = {
    login: AuthState,
    page: PageState,
    client: ClientState,
}

export interface ErrorElement{
    message?: string,
    type?: string,
    field?: string
}

export type ErrorType = {
    statusCode?: number,
    name?: string,
    message: string,
    errorsArray?: Array<ErrorElement>
 }

export interface Payload {
    response?: any
    error?: Error
  }

 