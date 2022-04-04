const jwt = require('jsonwebtoken')
require('dotenv').config();
const AuthErrors = require('./errors');

module.exports = class Token {

    static generateAccessToken(username) {
        const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN)
        return accessToken
    }

    static generateRefreshToken(username) {
        const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN)
        return refreshToken
    }

    validateAccesToken(token) {
        try {
            const validatedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
            return validatedToken
        }
        catch(error) {
            return null
        }
    }

    static validateAccessToken(token) {
        try {
            const validatedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
            return validatedToken
        }
        catch(error) {
            return null
        }
    }

    static validateRefreshToken(token) {
        try {
            const validatedToken = jwt.verify(token, process.env.REFRESH_TOKEN)
            return validatedToken
        }
        catch(error) {
            return null
        }
    }
}


