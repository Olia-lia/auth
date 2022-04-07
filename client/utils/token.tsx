import { REFRESH_TOKEN } from 'client/client/redux/actionConstants';

interface IToken {
    name: string
    position: string
    develop: () => void
  }

class Token implements IToken {

    const getNow() 
}

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


let refreshTokenRequest = false;


const checkToken = {
    isAccessTokenValid: () => (now) => now < accessTokenExpiredIn,
    isRefreshTokenValid: () => (now) => now < refreshTokenExpiredIn,
};


async function requestValidAccessToken() {
    let { accessToken } = getToken();
    //const now = Date.now()
    if (!checkToken.isRefreshTokenValid(now)) {
        //throw new Unauthorized
    } 
    else if (!checkToken.isAccessTokenValid(now)) {
        if (!refreshTokenRequest) {
            //refreshTokenRequest: boolean = true;
            REFRESH_TOKEN
        }
        
        accessToken = await refreshTokenRequest;

    // и очищаем переменную
    refreshTokenRequest = null;
  }

    return accessToken;
}

