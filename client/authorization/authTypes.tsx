export type ErrorElement = {
    field: string
    subtype: string
} 

export type FieldErrors = {
    username: string | null,
    password: string | null
}

export type AuthState = {
    user: null,
    isLoginned: boolean,
    retry: number,
    isValidationError: boolean,
    fieldsErrors: FieldErrors
}

export interface CredentialsLogin {
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

