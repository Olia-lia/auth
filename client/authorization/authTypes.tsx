export type ErrorElement = {
    field: string
    subtype: string
} 

export type Error = {
   message: string,
   errorsArray: Array<ErrorElement>
}

export type FieldErrors = {
    invalid: boolean;
    required: boolean
}

export type AuthState = {
    user: null,
    isLoginned: boolean,
    userFieldErrors: FieldErrors,
    passwordFieldErrors: FieldErrors
}

export interface credentialsLogin {
    username: string,
    password: string
}

export type LoginResponse = {
    token_type: string,
    accessToken: string,
    refreshToken: string,
    accessTokenExpiredIn: number,
    //refreshTokenExpiredIn: number
}

export type RefreshTokenRequest = {
    //client_id: number,
    //client_secret: string,
    grant_type: string,
    refreshToken: string | null,
}

export type errorOfValidation = {
    type: string,
    field: string
  }

