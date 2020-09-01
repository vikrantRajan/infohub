import React from 'react'
import {connect} from 'react-redux'
import { fetchHomeData }from '../../actions/homeactions.js'
class Header extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchHomeData());
    }
render(){
    console.log(this.props)
    return (<div></div>)
}
}

export default connect((store) =>{
    console.log(store);
    return {
        categories: store.categories,
        posts: store.posts
    }
   })(Header);