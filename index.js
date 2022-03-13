const express = require('express');
require('dotenv').config()
const cors = require('cors');
// const AuthErrors = require('./errors')
// const errorMiddleware = require('./handleMiddleware');

const app = express();
const hostname = '127.0.0.1';
const PORT = 5000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const now = new Date()
const EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 30)

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, PATCH',
  optionsSuccessStatus: 200
}

const jsonParser = express.json()
const router = express.Router()

/////ERRRORS 

class AuthErrors extends Error {
  constructor(statusCode, message) {
    super(message);
      this.statusCode = statusCode,
      this.message = message
    }


    Unauthorized(message) {
      //401 если токен неверен / истекла сессия
      //нет комбинации пароля и логина
      statusCode = 401
      message = message
    }
    

    BadRequest(message) {

      //400 или 401 если токен не передан
    }

    Forbidden () {
      //403 токен передан и клиент узнан, но не имеет доступа к контенту
    }

};




app.use(cors(corsOptions));
app.use('/auth', router);
app.use(
  (error, request, response, next) => {
  console.log(error)
  const {statusCode, message} = error
  if(error instanceof AuthErrors) 
    response.status(statusCode).json({
      status: 'error',
      statusCode, 
      message,
    }
  )
  return response.status(500).json({
    message: 'Server error. Something broke!'
  })
})




//const urlencodedParser = express.urlencoded({extended: false});

// app.get('/', function(request, response){
      
//   response.send('<h1>hello</h1>');
// });


const login = async(request, response, next) => {
  try {
    const data = request.body
    console.log(data)
    if  (data.user === 'olya' && data.password === '123' || data.user === 'vasya' && data.password === 'qwerty'){
      const token = {
        accessToken: ACCESS_TOKEN,
        tokenType: 'bearer',
        refreshToken: REFRESH_TOKEN,
        expiredIn: EXPIRED_IN
      }
      response.status(200).json(token)
    } 
  
   if (data.user === 'kolya' && data.password === '123') {
      const error =  new AuthErrors(401, 'Такая комбинация логина и пароля не найдена')
      console.log(error)
  
      response.status(401).json({
        error: "Такая комбинация логина и пароля не найдена"
      })
      // throw new AuthErrors(401, 'no')
    }
  
   
    next()
    
  }
  catch(error) {
    next(error)
  }
    
} 


// async validateAccessToken(access_token) {
//   try {
//     jwt.verify(access_token, )
//   }
// }

// async refresh(refresh_token) {
//  if(!refresh_token) {
//    throw Error.
//  }

// }


const refreshToken = async function(request, response) {
  try {
    const data = request.body;

    if(data.grant_type === 'refresh_token') {
      const token = {
        access_token,
        token_type: "Bearer"
      }
      response.json(token)
    }
    

  } 

  catch(error) {
    console.log(error)
  }

 }




//router.get('/users')


//const verifyToken = (request, response, next) => {
 // const bearerToken = request.header
 //}

 //const compareToken 
 //const compareTime

app.get('/users', async (request, response) => {
  try {
    const bearerToken = request.headers.authorization
    if (bearerToken) {
      response.send('ok')
    }
    else response.sendStatus(403).send('acess to the resourse is forbidden')
  }

  catch(error) {

  }
})
    
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


// const server = http.createServer(async (request, response) => {
//     response.setHeader('Content-Type', 'json');
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//     //response.writeHead() //statusCode




