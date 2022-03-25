import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import App from './app';
import rootSaga from './sagas/rootSaga';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; 
import {errorMiddleware} from './middlewares/errorMiddleware'




const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, errorMiddleware))
);
console.log(store.getState())
  
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root")
);