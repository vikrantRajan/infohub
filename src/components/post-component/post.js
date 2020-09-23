import React from 'react'
import {connect} from 'react-redux'
import { Media } from 'react-bootstrap'
import { fetchPostData }from '../../actions/postaction.js'
import CommentSubmit from './comment-form'
import profileImg from '../../images/profile.png';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import backToTop from '../../images/backtotop-white.svg'
import backBtn from '../../images/back_btn.png'
import svgShadow from '../../images/svg-shadow.png'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from 'react-share';
  import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon
  } from 'react-share';

import './post.css'
class Post extends React.Component {
    componentWillMount() {
        const id = this.props.match.params.srno;
        console.log(this.props)
        // this.loadData();
        this.props.dispatch(fetchPostData(id));
    }

    render(){
        const dateFormat = new Date(this.props.postData.date);
        const date = dateFormat.toLocaleString('default', { dateStyle: 'long' });
        const comments = this.props.postData.comments && this.props.postData.comments.map((element) => {
            return (
                <Media >
      <img
        width={64}
        height={64}
        className="mr-3"
        src={profileImg}
        alt="Generic placeholder"
      />
      <Media.Body style={{fontSize:"12px"}}>
          <div style={{overflow:"hidden"}}> 
              <h5 className="comment-author">{element.comment_author}</h5>
              <span className=" comment-time">{element.comment_date}</span>
          </div>

        <p>
         {element.comment_content}
        </p>
      </Media.Body>
    </Media>)

        })
        return(<div className="posts">
           <Link to='/'> <div className="backButtonDiv">
      <img src={backBtn} className="backButton" alt="infohub-logo"></img> 
      {/* <img src={svgShadow} className="svg_shadow" alt="infohub_logo"></img> */}
    </div></Link>
            <div className="breadCrumbs">
                <div className="container table-display ">
                
                    <div className="title d-display-inline text-right float-left links">
                    <span> 
                            <Link to='/' className="b-link " style={{ cursor: "pointer" }}><FontAwesomeIcon icon={faHome} className="pr-1" size="lg" /> Home</Link></span>
                    <span className="b-link pl-1 pr-1"> &gt; </span>
    <span> <span className="b-link font-weight-bold"> {this.props.postData.title}</span> </span>
                </div>
            </div>
            </div>
            <div className="main-white-block">
                <div className="container">
                    <div className="post-container">
                        <h1 className="post-title"> {this.props.postData.title}</h1>
                        <div className="post-items"> 
                            <div className="post-item-one float-left mt-1">
                                <span className='pr-2 border-right'> by {this.props.postData.author}</span>
                                <span className='pl-2'>posted on {date}</span>
                            </div>
                            <div className="post-item-two float-right">
                                
                        <div className="share-buttons">
                        <span className="pr-2">Share on</span>
                        <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={30} round={true} className="pr-1"/>
                  </FacebookShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={30} round={true} className="pr-1" />
                  </WhatsappShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon size={30} round={true} className="pr-1" />
                  </TwitterShareButton>
                        </div>
                            </div>
                            </div>
                            <div className="post-content">
                        <div dangerouslySetInnerHTML={ {__html: this.props.postData.content}}>
                        </div>
                        </div>
                    </div>
                    { this.props.postData.comments ? 
                    ( <div className="comments pb-2 mb-3 border-bottom">
                        <div><h2 className="heading-title">Comments</h2>  </div>
                        {comments}
                    </div>) : (null)}
                    <div className="comments pb-2 mb-3">
                        <div><h2 className="heading-title">Leave a comment...</h2>  </div>
                        <CommentSubmit postId={this.props.postData.post_id}/>
                    </div>
                </div>
            
            </div>
        </div>)
    }
}

export default connect((store) =>{
    console.log(store);
    return {
        postData: store.PostDataReducer.postData
    }
   })(Post);