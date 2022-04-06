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
    isValidationError: boolean,
    fieldsErrors: FieldErrors
}

export interface CredentialsLogin {
    username: string,
    password: string
}

export type LoginResponse = {
    token_type: string,
    accessToken: {
        accessToken: string,
        expiredIn: number
    }
    refreshToken: {
        refreshToken: string,
        expiredIn: number
    }
}

export type errorOfValidation = {
    type: string,
    field: string
  }

