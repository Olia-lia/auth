const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const AuthErrors = require('./errors');
const errorMiddleware = require('./handleErrorMiddleware');
const Token = require('./tokenService');
const handleErrorMiddleware = require('./handleErrorMiddleware');

const app = express();
const hostname = '127.0.0.1';
const PORT = 5000;

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, PATCH',
    optionsSuccessStatus: 200
};

const jsonParser = express.json();
const router = express.Router();
//const urlencodedParser = express.urlencoded({extended: false});

app.use(cors(corsOptions));
app.use('/auth', router);
app.use(errorMiddleware);


const generateTokensResponse = () => {
    const accessToken = Token.generateAccessToken('olya');
    const refreshToken = Token.generateRefreshToken('olya');
    const now = new Date();
    const ACCESS_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 2);
    const REFRESH_TOKEN_EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 10);
    const responseData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpiredIn: ACCESS_TOKEN_EXPIRED_IN,
        refreshTokenExpiredIn: REFRESH_TOKEN_EXPIRED_IN
    };
    return responseData;
};
  
const login = async(request, response, next) => {
    try {
        const data = request.body;
        const validationErrors = [];
      
        console.log(data);
  
        if (data.username === 'olya' && data.password === '123') {
            const responseData = generateTokensResponse();
            return response.status(200).json(responseData);
        } 
      
        if (data.username === 'kolya' && data.password === '123') {
            return next(AuthErrors.BadRequest('modalError', 'Такая комбинация логина и пароля не найдена'));
        }
    
        if (data.username === 'o') {
            const error = {
                field: 'username',
                type: 'invalid',
                message: 'too shot'
            };
            validationErrors.push(error);
        }
        
        if (data.password === 'o') {
            const error = {
                field: 'password',
                type: 'invalid',
                message: 'too shot'
            };
            validationErrors.push(error);
        }
      
        if (data.username === '') {
            const error = {
                field: 'username',
                type: 'required',
                message: 'required field'
            };
            validationErrors.push(error);
        }
    
        if (data.password === '') {
            const error = {
                field: 'password',
                type: 'required',
                message: 'required field'
            };
            validationErrors.push(error);
        }
        if(validationErrors.length > 0) {
            next(AuthErrors.BadRequest('validationError', [...validationErrors]));
        }
    
        return handleErrorMiddleware();
    }
  
    catch(error) {
        next(handleErrorMiddleware);
    }
}; 
  
const validateAccessToken = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader)
            return next(new AuthErrors(401, 'noAccessToken'));
        const token = authHeader.split(' ')[1];
        if (!token)
            return next(new AuthErrors(401, 'noAccessToken'));
        
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
            if (error) {
                return next(new AuthErrors(401, 'notVerify'));
            }

            request.user = user;
            return next();
  
        });
    }
    catch(error) {
        console.log(error);
    }
};
  
const USERS = [
    {user: 'Vasya', id: 23, status: 'single'},
    {user: 'Kolya', id: 566, status: 'single'},
];

const COMMENTS = [
    {id: 23, comment: 'hello'}
];

const AVATARS = [
    {id: 'dd', comment: 'fff'},
    {id: 'dd', comment: 'fff'},
    {id: 'dd', comment: 'fff'},
    {id: 'dd', comment: 'fff'},
    {id: 'dd', comment: 'fff'},
    {id: 'dd', comment: 'fff'},
];

app.get('/users', validateAccessToken, (request, response) => {
    return response.status(200).json(USERS);
});
  
app.get('/comments', validateAccessToken, (request, response) => {
    return response.status(200).json(COMMENTS);
});

app.get('/avatars', validateAccessToken, (request, response) => {
    return response.status(200).json(AVATARS);
});
  
app.get('/message', validateAccessToken, (request, response) => {
    return response.status(200).json('one more request');
});
  
router.post('/token', jsonParser,  login); 
router.post('/refresh_token', jsonParser, (request, response, next) => {

    try{
        const data = request.body;
        const validToken = Token.validateRefreshToken(data.refreshToken);
        if(!data.refreshToken || !validToken) {
            return next(AuthErrors.Unauthorized('noToken'));
        }
        else {
            const resp = generateTokensResponse();
            console.log(resp);
            return response.status(200).json(resp);
        } 
    }
    catch(error) {
        console.log(error);
    }
});
  
const start = () => {
    try {
        app.listen(PORT, hostname, () => console.log(`server listening on ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};

start();