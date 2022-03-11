interface LoginResponse {
    accessToken: string;
    refreshToken : string; 
    user: {
        id: number;
        login: string;
    }
} 
