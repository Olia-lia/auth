 export interface ErrorElement{
    message?: string,
    type?: string,
    field?: string
}


export type LoginResponse = {
    accessToken: string,
    accessTokenexpiredIn: number,
    refreshToken: string,
    refreshTokenexpiredIn: number
}



///////state
export type AuthState = {
    user: null,
    isLoginned: boolean,
    isValidationError: boolean,
    fieldsErrors: FieldErrors
}
