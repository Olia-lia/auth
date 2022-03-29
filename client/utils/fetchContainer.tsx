import { put } from "redux-saga/effects";

const fetchRequest = (method: string, url: URL | string, body?: any, ...someConfig:any, isRetried = false) => {
  // check is authorization header valid

  //const checkedAccessToken: boolean = yield call(checkValidAccessToken);
  const token = getToken();

  if (checkedAccessToken) {
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
  }
};


const checkStatusResponse = (response: any, request, isRetried: boolean) => {
  if (response.status >= 400) {
    //throw response
    if (response.state === 401 && !isRetried) {
      fetchRequest(request, true);
      // hanlde the specific type of error
    } else throw NonAuthorized();
  }
  else if (response.status === 200)
    return response.json();
};

function* getToken() {
  const res = yield put({type: GET_TOKEN});
    return res;
}

export {fetchRequest}