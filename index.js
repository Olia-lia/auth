const express = require('express');
const cors = require('cors');

const app = express();

const hostname = '127.0.0.1';
const PORT = 5000;

const now = new Date()
//const EXPIRED_IN = new Date().setMinutes(now.getMinutes() + 30)



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

const login = async function(request, response) {
  try {
  const data = request.body
  if  (data.user === 'olya' && data.password === 123){
      response.status(200).send('token')
      const token = {
       id: 1,
       expired_time: expired_time,
      }
    }
  
    else response.status(400).send('login error');
    
  }
  catch (error) {
    console.log(error)
  }
}

const refresh = async function(request, response) {
  req.header('Content-Type')  
  req.header('user-agent')    
  req.header('Authorization')

 }

const router = express.Router()
router.post('/token', jsonParser,  login) 

router.post('/refresh_token')
//router.get('/users')

app.use('/auth', router)

//const verifyToken = (request, response, next) => {
 // const bearerToken = request.header
 


//}

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




