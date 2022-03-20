const express = require('express');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { string } = require('prop-types');
const e = require('express');

//const AuthErrors = require('./errors');
//const errorMiddleware = require('./handleMiddleware');
//const Token = require('./token');

const app = express();
const hostname = '127.0.0.1';
const PORT = 5000;

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, PATCH',
  optionsSuccessStatus: 200
}

const jsonParser = express.json();
const router = express.Router();
//const urlencodedParser = express.urlencoded({extended: false});



////TOKEN
class Token {
  static generateTokens(username) {
    const accessToken = jwt.sign(username, proccess.env.ACCESS_TOKEN, {expiresIn: '40s'});
    const refreshToken = jwt.sign(username, proccess.env.REFRESH_TOKEN, {expiresIn: '15m'})
   // const now = new Date();
    //const ACCESS_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 2)
   //const REFRESH_TOKEN_EXPIRED_IN = new Date().setDates(now.getMinutes() + 2)
   
    return  {
      accessToken,
      refreshToken
    }
  }

}

/////ERRORS 

const error = {
  type: string,

}

class AuthErrors extends Error {
  constructor(statusCode, message, errorsArray) {
    super(message);
      this.statusCode = statusCode,
      this.message = message
      this.errorsArray = errorsArray
      //this.type = type
    }

    static Unauthorized(message){
      return new AuthErrors(401, message)
    }
    
    static BadRequest(message, errorsArray = []) {
      return new AuthErrors(400, message, errorsArray) 
    }

    static Forbidden(message) {
      return new AuthErrors(403, message)
      //403 токен передан и клиент узнан, но не имеет доступа к контенту
    }

};


app.use(cors(corsOptions));
app.use('/auth', router);
app.use(
  (error, request, response, next) => {
  console.log(error)
  const {statusCode, message, errorsArray} = error
  if(error instanceof AuthErrors) 
    response.status(statusCode).json({
      message,
      errorsArray
    }
  )
  return response.status(500).json({
    message: 'Server error! Something is broken!'
  })
})


const login = async(request, response, next) => {
  try {
    const data = request.body
   
    console.log(data)

    if (data.username === 'olya' && data.password === '123') {
      
      // const accessToken = Token.generateAccessToken({username: data.username});
      // const refreshToken= Token.generateRefreshToken({username: data.username});
     //const responseData = Token.generateTokens({username: data.username})
    const now = new Date();
    const ACCESS_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 2)
    //const REFRESH_TOKEN_EXPIRED_IN = new Date().setDates(now.getMinutes() + 2)
     const responseData = {
       accessToken: 'eeeeeeerff',
       refreshToken: 'fdss',
       accessTokenExpiredIn: ACCESS_TOKEN_EXPIRED_IN,
       //refreshTokenExpiredIn: REFRESH_TOKEN_EXPIRED_IN
     }
      console.log(responseData)
      return response.status(200).json(responseData)
    } 
  
    if (data.username === 'kolya' && data.password === '123') {
      next(AuthErrors.Unauthorized('Такая комбинация логина и пароля не найдена'))
     }

    //validation
    const errors = []

    if (data.username === '') {
      errorUser = {
        type: 'invalid value',
        field: 'username'
      }
      errors.push(errorUser)
    }

    if(data.password === '') {
      errorPassw = {
        type: 'invalid value',
        field: 'password'
      }
      errors.push(errorPassw)
    }
    next(AuthErrors.BadRequest('Validation error', [...errors]))
   ////////////////

    next(new AuthErrors(500, 'Server Error'))
  }

  catch(error) {
    console.log(error)
    return next()
  }
} 

// const validateRefreshToken = (request, response, next) => {

// }

const refreshToken = async function(request, response, next) {
  try {
    const data = request.body;
    if(!data.grant_type || !data.refreshToken) 
      return next(new AuthErrors)

    if (data.grant_type === 'refresh_token') {
    
    }
    else next(new AuthErrors(401, 'no refresh'))
    

  } catch(error) {
    console.log(error)
  }

 }


 //////////////////////// GET 
 const USERS = [
  {user: 'Olya', status: 'single'},
  {user: 'Kolya', status: 'single'},
]

const validateAccessToken = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return next(new AuthErrors(401, 'no token'))
    }
    const token = authHeader.split(' ')[1]
    if (!token) return next(new AuthErrors(401, ''))

    jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
      if (error) {
        return next(new AuthErrors(403, 'forb'))
      }

      request.user = user
      next()
    })
  }
  catch(error) {
    
  }
}

app.get('/users', validateAccessToken, (request, response) => {
  return response.status(200).json(USERS)
})
////////////////////////////////////

router.post('/token', jsonParser,  login) 
router.post('/refresh_token', jsonParser, refreshToken) 


const start = () => {
  try {
    app.listen(PORT, hostname, () => console.log(`server listening on ${PORT}`))
  }
  catch (error) {
    console.log(error)
  }
}

start()




