export interface credentialsLogin {
    username: string,
    password: string
}


export type LoginResponse = {
    accessToken: string,
    refreshToken: string,
    accessTokenExpiredIn: number,
    //refreshTokenExpiredIn: number
}

