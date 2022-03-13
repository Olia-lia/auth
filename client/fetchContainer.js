

export default fetchRequest = (method, endpoint, {body, ...someConfig}) => {
  const options = {
    method: method,
    ...customConfig,
    
    headers: {
      'Content-Type': 'application/json',
      ...someConfig.header
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }  

  return fetch(`${BASE_URL}/${endpoint}`, options)
    .then(async response => {
      if (response.ok) {
        return await response.json()
      } else {
        const errorMessage = await response.text()
        return Promise.reject(new Error(errorMessage))
      }
    })

 }