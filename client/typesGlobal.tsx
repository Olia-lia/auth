import { StringMappingType } from 'typescript';
import {AuthState} from './authorization/authTypes';
import {ClientState} from './client/clientTypes';
import {PageState} from './page/pageTypes';

export type globalState = {
    login: AuthState,
    page: PageState,
    client: ClientState,
}

export type ErrorElement = {
    type: string,
    field: string
}

export type ErrorType = {
    message: string,
    errorsArray?: Array<ErrorElement>
 }

export interface Payload {
    response?: any
    error?: Error
  }

 