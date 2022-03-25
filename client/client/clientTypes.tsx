export type UserInfo = {
    user: string,
    status: string
}

export type ClientState = {
    isFetching: boolean;
    isError: boolean; 
    users: null | Array<UserInfo>
}