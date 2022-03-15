
const fetchRequest = (method, url, body, ...someConfig) => {
  someConfig = {...someConfig}
  const token = localStorage.getItem('accessToken')
  
  const options = {
    method: method,
    ...someConfig,
    
    headers: {
      'Content-Type': 'application/json',
      ...someConfig.header
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
  }  

  if(token != null) {
    options.headers.authorization = `Bearer ${token}`
  }
    
  return fetch(url, options)
}

  export {fetchRequest}