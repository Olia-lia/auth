
function createFetchContainer(method) { 
    const defaultOptions = {method};

    return function fetchContainer( url, options) {
      options || (options = {});
      return fetch(url, Object.assign(options, defaultOptions));
    }
  }



const fetchRequest = (endpoint, {body, ...someConfig}) => {
  const defaultHeaders = {'Content-Type': 'application/json'}
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    
    headers: {
      'Content-Type': 'application/json',
      ...someConfig.header
  }
    if (body) {
      config.body = JSON.stringify(body)
    }

 
}