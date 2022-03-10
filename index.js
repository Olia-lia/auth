const express = require('express');
require('dotenv').config()
const cors = require('cors');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const app = express();

const hostname = '127.0.0.1';
const PORT = 5000;

const now = new Date()
console.log(now)
const EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 30)

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, PATCH',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
const jsonParser = express.json()
//const urlencodedParser = express.urlencoded({extended: false});

app.get('/', function(request, response){
      
  response.send('<h1>hello</h1>');
});


const login = async(request, response) => {
  try {
    const data = request.body
    console.log(data)
    if  (data.user == 'olya' && data.password === '123'){
      const token = {
        access_token: ACCESS_TOKEN,
        refresh_token: REFRESH_TOKEN,
        expired_in: EXPIRED_IN
      }
      response.status(200).json(token)
    } 
  }
  catch(error) {
    console.log(error)
  }
    
} 

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

const router = express.Router()
router.post('/token', jsonParser,  login) 

router.post('/refresh_token', jsonParser, refreshToken) 



//router.get('/users')

app.use('/auth', router)

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




