const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = class Token {

    static generateAccessToken(username) {
            const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN)
            return accessToken
        }

    static generateRefreshToken(username) {
        const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN)
        return refreshToken
    }
}


