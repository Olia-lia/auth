
export const checkValidRefreshToken = (): boolean => {
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) return false;
    const now = new Date().getTime();
    const expireInStr = localStorage.getItem('refreshTokenExpiredIn');
    if(!expireInStr) return false;
    const expireIn = JSON.parse(expireInStr);
    if (now > expireIn) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenExpiredIn');
        return false;
    }
    return true;
};


export const checkValidAccessToken = (): boolean => { 
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return false;
    const now = new Date().getTime();
    const expireInStr = localStorage.getItem('accessTokenExpiredIn');
    if(!expireInStr) return false;
    const expireIn = JSON.parse(expireInStr);
    if (now > expireIn) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiredIn');
        return false;
    }
    return true;
};