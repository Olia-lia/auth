// const jwt = require('jsonwebtoken')
// require('dotenv').config();

// // const now = new Date()
// // const ACCESS_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 30)


// class Token {

//     static generateTokens(username) {
//             const accessToken = jwt.sign(username, proccess.env.ACCESS_TOKEN);
//             return accessToken
//         }
//     static generateRefreshToken(username) {
//         jwt.sign(username, proccess.env.REFRESH_TOKEN)
//          //jwt.sign(username, proccess.env.REFRESH_TOKEN, {expiresIn: '30d'})
//         return refreshToken
//     }

// }


// module.exports = new Token()