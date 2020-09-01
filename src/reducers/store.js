 import HomeDataReducer from './homereducer';
 import {applyMiddleware, createStore} from 'redux';
 import thunkMiddleware from 'redux-thunk';
 import logger from 'redux-logger';
 
 
  const middleware = applyMiddleware(thunkMiddleware,logger)
  const store = createStore(HomeDataReducer,middleware);

  export default store;