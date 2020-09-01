import React from 'react'
import {connect} from 'react-redux'
import  './header.css';
import headerLogo from '../../images/Header-Logo.png';
import { fetchHomeData }from '../../actions/homeactions.js'
class Header extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchHomeData());
    }
render(){
    console.log(this.props)
    return (<div className="headerSection">
        <div className="container">
        <div className="logo">
            <img src={headerLogo} className="logo-image"/>
        </div>
        </div>

    </div>)
}
}

export default connect((store) =>{
    console.log(store);
    return {
        categories: store.categories,
        posts: store.posts
    }
   })(Header);