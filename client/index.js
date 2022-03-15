import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import authSaga from './sagas';


import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'; 
import LoginReducer from './LoginReducer';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    LoginReducer,
    applyMiddleware(sagaMiddleware)
  )
  
sagaMiddleware.run(authSaga)

const action = type => store.dispatch({type})

 
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector("#root")
);