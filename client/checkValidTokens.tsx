//import {}

// export const checkValidToken = (tokenType: string): boolean => {
//     const token = localStorage.getItem(tokenType);
 
//     if(!token || token == null) return false;
//     const now = new Date().getTime();
//     const tokenExpiredsStr = localStorage.getItem()
//     const tokenObj = JSON.parse(token);
//     if (now > tokenObj.expiredIn) {
//         localStorage.removeItem(tokenType);
//         return false;
//     }
//     return true;
// };


export const checkValidAccessToken = (): boolean => { 
    const accessToken = localStorage.getItem('accessToken');
    const now = new Date().getTime();
    const expireInStr = localStorage.getItem('accessTokenExpiredIn');
    if(!accessToken || !expireInStr) return false;
    const expireIn = JSON.parse(expireInStr);
    if (now > expireIn) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiredIn');
        return false;
    }
    return true;
};


export const checkValidRefreshToken = (): boolean => { 
    const accessToken = localStorage.getItem('refreshToken');
    const now = new Date().getTime();
    const expireInStr = localStorage.getItem('refreshTokenExpiredIn');
    if(!accessToken || !expireInStr) return false;
    const expireIn = JSON.parse(expireInStr);
    if (now > expireIn) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiredIn');
        return false;
    }
    return true;
};