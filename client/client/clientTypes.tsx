export type UserInfo = {
    user: string,
    status: string
}

export type ClientState = {
    users: null | Array<UserInfo>
}