 import HomeDataReducer from './homereducer';
 import PostDataReducer from './postreducer';
 import {applyMiddleware, createStore, combineReducers} from 'redux';
 import thunkMiddleware from 'redux-thunk';
 import logger from 'redux-logger';
 
 const reducer = combineReducers({ HomeDataReducer, PostDataReducer });
 
  const middleware = applyMiddleware(thunkMiddleware,logger)
  const store = createStore(reducer,middleware);

  export default store;