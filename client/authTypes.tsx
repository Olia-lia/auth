export interface credentialsLogin {
    username: string,
    password: string
}


export type LoginResponse = {
    accessToken: string,
    tokenType: string,
    refreshToken: string,
    expiredIn: number
    
}

