import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import {Provider} from 'react-redux';
import App from './app';
import rootSaga from './sagas/rootSaga';


import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; 
import LoginReducer from './authorization/redux/LoginReducer';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
  
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

 
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector("#root")
);