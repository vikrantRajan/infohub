import React from 'react'
import {connect} from 'react-redux'
import { CardColumns,Card } from 'react-bootstrap'
import { fetchPostData }from '../../actions/postaction.js'

class Post extends React.Component {
    componentWillMount() {
        const id = this.props.match.params.srno;
        // this.loadData();
        this.props.dispatch(fetchPostData(id));
    }

    render(){
        console.log(this.props.postData);
        return(<div>Post</div>)
    }
}

export default connect((store) =>{
    // console.log(store);
    return {
        postData: store.postData
    }
   })(Post);