const jwt = require('jsonwebtoken');

function generateToken (userId){
    const accessToken = jwt.sign(userId, proccess.env.accessToken, { expiresI : '15m'})

}