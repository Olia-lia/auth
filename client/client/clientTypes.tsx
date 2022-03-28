export type UserInfo = {
    user: string,
    id: number,
    status: string,
}

export type ClientState = {
    isFetching: boolean;
    isError: boolean; 
    users: Array<UserInfo>
}