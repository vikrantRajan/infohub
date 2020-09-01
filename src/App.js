import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header-component/header'
function App() {


  // const middleware = applyMiddleware(thunkMiddleware,logger)
  // const store = createStore(HomeDataReducer,middleware);


  // store.dispatch((dispatch) =>{
  //   dispatch({type:"FETCH_START"})
  //   axios.get('http://demo3513052.mockable.io/home').then((response) =>{
  //     dispatch({type:"CATEGORY", payload:response.data.categories})
  //     dispatch({type:"POSTS", payload:response.data.posts})
  //   }).catch((e) => {
  //     dispatch({type:"ERROR", payload:e})
  //   })

  // });
  return (
    <div className="App">
      <Header/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* {a} */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
