import React from 'react'
import {  Route } from 'react-router-dom'
import HomeComponent from './components/home-component/home'
import PostComponent from './components/post-component/post'

class MainRoute extends React.Component {

    render() {
       
        return (<div className="overflowhidden">
            <Route exact path='/' component={HomeComponent} />
            <Route exact path='/posts/:srno' component={PostComponent} />
        </div>

        )
    }
}

export default MainRoute
