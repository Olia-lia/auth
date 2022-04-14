// export type ErrorElement = {
//     field: string
//     subtype: string
// } 

export type FieldErrors = {
    username: string | null,
    password: string | null
}

export type AuthState = {
    user: null,
    isLoginned: boolean,
    isValidationError: boolean,
    fieldsErrors: FieldErrors
}

export interface CredentialsLogin {
    username: string,
    password: string
}

export type LoginResponse = {
    accessToken: string,
    accessTokenExpiredIn: number,
    refreshToken: string,
    refreshTokenExpiredIn: number
}

