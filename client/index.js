import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import authSaga from './authorization/sagas';


import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'; 
import LoginReducer from './authorization/redux/LoginReducer';

const sagaMiddleware = createSagaMiddleware()
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    LoginReducer,
    applyMiddleware(sagaMiddleware)
    //composeEnhancers(applyMiddleware(sagaMiddleware))
);
  
sagaMiddleware.run(authSaga)

const action = type => store.dispatch({type})

 
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector("#root")
);