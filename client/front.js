const BASE_URL = 'http://127.0.0.1:1234'

const checkStatusRequest = (response) => {
  if (response.ok) {
    return response;
  }

  const { statusText, status } = response;
  const error = new Error (`${status} (${statusText})`);
  throw error;
}


const saveToken = () => {
  //save in sessionStorage
}

const sendBody = (body) => {
  //const data = {user: 'olya', password: 234}
    fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
         body,
        }
    )   
    .then(checkStatusRequest)
    .then((result) => console.log('ok'))

    .catch((error) => alert(error))
  
}

const button = document.getElementById('form_auth_submit');
const form = document.querySelector('.form_auth')

button.addEventListener('click', (evt) => {
   evt.preventDefault()
    let userName = document.getElementById('name').value
    let userPassword = document.getElementById('password').value
    let data = JSON.stringify({user: userName, password: userPassword})
    console.log(data)
    // const formData = new FormData(form)
    // console.log(formData);
    sendBody(data)
})
