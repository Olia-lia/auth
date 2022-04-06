export type UserInfo = {
    username: string,
    id: number,
    status: string,
};

export type Comment = {
    id: number;
    comment: string
};

export type ClientState = {
    isFetching: boolean;
    isError: boolean; 
    users: Array<UserInfo>;
    comments: Array<Comment>
};

export type RefreshTokenRequest = {
    //client_id: number,
    //client_secret: string,
    grant_type: string,
    refreshToken: string | null,
};
