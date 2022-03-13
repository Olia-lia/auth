export interface credentials {
    username: string,
    password: string
}


export interface LoginResponse {
    accessToken: string,
    tokenType: string,
    refreshToken: string,
    expiredIn: number
}

