const express = require('express');
const hostname = '127.0.0.1';
const cors = require('cors');

const app = express();
app.use('*', cors());
const jsonParser = express.json()
const urlencodedParser = express.urlencoded({extended: false});

app.get('/', function(request, response){
      
  response.send("<h1>Hi</h1>");
});

//ROUTER
// const MessageTypes = {
//   validationError: 'ff',

// ] 

const login = async function(request, response) {
  try {

    //response.json(request.body)
    const data = jsonParser(request.body)
    
    if (!request.body) return response.status(400).send('');
    
    else if  (data.user === 'olya' && data.password === 123) response.status(200).send(true) 
    else response.send(false)
  }
  catch (error) {
    console.log(error)
  }
}

const refresh = async function(request, pesponse) {
  req.header('Content-Type')  
  req.header('user-agent')    
  req.header('Authorization')

 }

const router = express.Router()
router.post('/token', jsonParser, urlencodedParser, login) 

router.post('/refresh_token')
//router.get('/users')

app.use('/auth', router)


const start = () => {
  try {
    app.listen(PORT, hostname, () => console.log(`server listening on ${PORT}`))
  }
  catch (error) {
    console.log(error)
  }
}

start()




//mongoose.connect



// const server = http.createServer(async (request, response) => {
//     response.setHeader('Content-Type', 'json');
//     response.setHeader('Access-Control-Allow-Origin', '*');
//     response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
//     //response.writeHead() //statusCode

//     // let dataObject = await JSON.parse(
//     //     request.body);
//     let data = '';
//     request.on('data', chunk => {
//         data += chunk;
//       })
//         console.log("data", data);


//     let data = JSON.stringify(dataObject)

//   if (request.url == '/auth/token') {
//     console.log(response.body)
//     const body = await JSON.stringify(request.body);
//     if(user === 'olga' && password) {

//     } 
//   }

//   response.end(data)

// });


// server.listen(1234, hostname, function (){

//     console.log('server listening on http://127.0.0.1:1234')
// });



