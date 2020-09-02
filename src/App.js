import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/header-component/header'
import Footer from './components/footer-component/footer'
import MainRoute from './route'
function App() {

  return (
    <Router>
    <div className="App">
      <Header/>
   <MainRoute/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
