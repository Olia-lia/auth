export const checkValidAccessToken = (): boolean => {
    const now = new Date().getTime()
    const expireInStr = localStorage.getItem('accessTokenExpiredIn')
    if(!expireInStr) return false
    const expireIn = JSON.parse(expireInStr)
    if (now > expireIn) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiredIn');
        return false
    }
    return true
  }
  
export const checkValidRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    !refreshToken ? false : true
}