const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const cors = require('cors');
const AuthErrors = require('./errors');
const errorMiddleware = require('./handleErrorMiddleware');
const Token = require('./tokenService');

const app = express();
const hostname = '127.0.0.1';
const PORT = 5000;

console.log(process.env.ACCESS_TOKEN)

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, PATCH',
  optionsSuccessStatus: 200
}

const jsonParser = express.json();
const router = express.Router();
//const urlencodedParser = express.urlencoded({extended: false});

app.use(cors(corsOptions));
app.use('/auth', router);
app.use(errorMiddleware)


const generateTokensResponse = () => {
  const accessToken = Token.generateAccessToken('olya');
  const refreshToken = Token.generateRefreshToken('olya');
  const now = new Date();
  const ACCESS_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 2)
  const REFRESH_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 10)
  const responseData = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    accessTokenExpiredIn: ACCESS_TOKEN_EXPIRED_IN,
    refreshTokenExpiredIn: REFRESH_TOKEN_EXPIRED_IN
  }
  return responseData
}

const login = async(request, response, next) => {
  try {
    const data = request.body
   
    console.log(data)

    if (data.username === 'olya' && data.password === '123') {
      const accessToken = Token.generateAccessToken('olya');
      const refreshToken = Token.generateRefreshToken('olya');
      const now = new Date();
      const ACCESS_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 2)
      const REFRESH_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 10)
      const responseData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpiredIn: ACCESS_TOKEN_EXPIRED_IN,
        refreshTokenExpiredIn: REFRESH_TOKEN_EXPIRED_IN
      }
      return response.status(200).json(responseData)
    } 
  
    if (data.username === 'kolya' && data.password === '123') {
      next(AuthErrors.BadRequest('modalError', 'Такая комбинация логина и пароля не найдена'))
     }
  
    const validationErrors = []

    if (data.username === 'o') {
      const error = {
        field: 'username',
        type: 'invalid',
        message: 'too shot'
      }
      validationErrors.push(error)
    }

    if (data.password === 'o') {
      const error = {
        field: 'password',
        type: 'invalid',
        message: 'too shot'
      }
      validationErrors.push(error)
    }

    if (data.username === '') {
      const error = {
        field: 'username',
        type: 'required',
        message: 'required field'
      }
      validationErrors.push(error)
    }

    if(data.password === '') {
       const error = {
        field: 'password',
        type: 'required',
        message: 'required field'
      }
      validationErrors.push(error)
    }
    if(validationErrors.length > 0)
      next(AuthErrors.BadRequest('validationError', [...validationErrors]))

    next(new AuthErrors(500, 'modalError', 'something broke'))
 
  }

  catch(error) {
    console.log(error)
    return next()
  }
} 

const validateRefreshToken = (request, response, next) => {
  try{
  const data = request.body;
  console.log(data)
  if(!data.grant_type || !data.refreshToken) 
    return next(AuthErrors.Unauthorized('noToken'))
  if (data.grant_type === 'refresh_token') 
    return next(AuthErrors.Unauthorized('noToken'))
    jwt.verify(data.refreshToken, process.env.REFRESH_TOKEN, (error, tokens) => {
      if (error) {
        return next(AuthErrors.Unauthorized('invalid token'))
      }

      request.tokens = tokens
      next()
    })
  } 
  catch(error) {
    return next()
  }
}

 //////////////////////// GET 

const validateAccessToken = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization
    console.log(authHeader)
    
    if (!authHeader) {
      return next(AuthErrors.Unauthorized('noAccessToken'))
    }
    const token = authHeader.split(' ')[1]

    if (!token) return next(new AuthErrors(401, 'noAccessToken'))

   
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
      if (error) {
        return next(new AuthErrors(401, 'noAccessToken'))
      }

      request.user = user
      next()
    })
  }
  catch(error) {
   console.log(error)
  }
}

const USERS = [
  {user: 'Vasya', id: 23, status: 'single'},
  {user: 'Kolya', id: 566, status: 'single'},
]

const COMMENTS = [
  {id: 23, comment: 'hello'}
]

app.get('/users', validateAccessToken, (request, response) => {
  return response.status(200).json(USERS)
})

app.get('/comments', validateAccessToken, (request, response) => {
  return response.status(200).json(COMMENTS)
})

router.post('/token', jsonParser,  login) 
router.post('/refresh_token', validateRefreshToken, (request, response) => {
  const newResponse = generateTokensResponse()
  return response.status(200).json(newResponse)
}) 


const start = () => {
  try {
    app.listen(PORT, hostname, () => console.log(`server listening on ${PORT}`))
  }
  catch (error) {
    console.log(error)
  }
}

start()




