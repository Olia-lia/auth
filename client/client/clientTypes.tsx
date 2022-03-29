export type UserInfo = {
    user: string,
    id: number,
    status: string,
};

export type ClientState = {
    isFetching: boolean;
    isError: boolean; 
    users: Array<UserInfo>
};


export type RefreshTokenRequest = {
    //client_id: number,
    //client_secret: string,
    grant_type: string,
    refreshToken: string | null,
};
