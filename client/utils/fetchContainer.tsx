const fetchRequest = (method: string, url: URL | string, body?: any, ...someConfig:any) => {
  // check is authorization header valid
  //someConfig = {...someConfig}


  const accessToken = localStorage.getItem('accessToken')
  const options = {
    method: method,
    ...someConfig,
    
    headers: {
      'Content-Type': 'application/json',
      ...someConfig.header
    }
  };

  if (body) {
    options.body = JSON.stringify(body)
  }  

  if(accessToken != null) {
    options.headers.authorization = `Bearer ${accessToken}`
  }

   return fetch(url, options)
   .then((response) => checkStatusResponse(response))
  //  .catch(async error => {
  //   const body = await error.json()
  //   await catchError(error.status, body)
  // })
};

const checkStatusResponse = (response: any) => {
  if (response.status >= 400) {
    
    throw response 
  }
  // switch (response.status) {
  //   case(401):
  //     //if(!retried) { 
  //     // retry
  //      // return;
  //     //}
  //     // use logout func
  //     localStorage.removeItem('accessToken');
  //     break
  //     throw response;
    else if (response.status === 200)
      return response.json();
};


export {fetchRequest}