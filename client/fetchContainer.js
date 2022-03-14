

export default fetchRequest = (method, url, {body, ...someConfig}) => {
  const token = localStorage.getItem('accessToken')

  const options = {
    method: method,
    ...someConfig,
    
    headers: {
      'Content-Type': 'application/json',

      ...someConfig.header
    }
  }
  
  if(token) options.headers. headers.Authorization = `Bearer ${token}`
  s
  if (body) {
    config.body = JSON.stringify(body)
  }  

  return fetch(url, options)
    .then(async response => {
      if (response.ok) {
        return await response.json()
      } else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
    })

 }