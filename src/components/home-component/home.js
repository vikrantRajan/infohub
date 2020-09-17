import React from 'react'
import {connect} from 'react-redux'
import { CardColumns,Card } from 'react-bootstrap';
import  './home.css';
import { fetchHomeData, setActiveid, setLoadCount, setFilterData}from '../../actions/homeactions.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import svgShadow from '../../images/svg-shadow.png';
import {Link} from 'react-router-dom'

import config from '../../config';



class Home extends React.Component {

  componentWillMount() {
      this.props.dispatch(fetchHomeData());
  }

  onSearch = (e) => {
    const text= e.target.value.toLowerCase();
     const filteredData = this.props.posts.filter((p) => p.title.toLowerCase().includes(text) ||
     p.post.toLowerCase().includes(text) ||
     p.author.toLowerCase().includes(text)); 
     this.props.dispatch(setFilterData(filteredData));
  }

  applyFilter = (id,index) =>{
      if( id !== "1") {
          if(this.props.activeId.includes("1")) {
              const removeIndex = this.props.activeId.indexOf(1);
              this.props.activeId.splice(removeIndex,1);
          }
      }
      else {
          this.props.activeId.splice(0, this.props.activeId.length)
      }
      if(this.props.activeId.includes(id)) {
      const removeIndex = this.props.activeId.indexOf(id);
      this.props.activeId.splice(removeIndex,1);
  }
      else {
          this.props.activeId.push(id);
  }
      const filteredData =  this.props.activeId.length > 0 && id !== '1'? this.props.posts.filter((p) => this.props.activeId.includes(p.catId)) : this.props.posts;
      this.props.dispatch(setFilterData(filteredData));

      this.props.dispatch(setActiveid( [...this.props.activeId] ));
  }

  loadCount = () => {
    const count = this.props.loadCount + 1;
    this.props.dispatch( setLoadCount(count));
  }

  showPosts = (data) => {
   const myArray = data.slice(0,6 * this.props.loadCount).map((element,index) => {
     const url = `posts/${element.post_id}`;
     if (window.matchMedia("(max-width: 440px)").matches) {
       return(
        <Link to={url}>
         <div className="post_mobile">
           <div className="post_mobile_image_container">
             <div className="post_mobile_image">
              <img src={config.IMG + element.image} alt="info-hub-post"></img>
             </div>
           </div>
           <div className="post_mobile_text_container">
             <h2>by {element.author}  </h2>
             <h1>{element.title}</h1>
             <span className="cat float-left">{element.category}</span> <span className="comment-cnt">
               <FontAwesomeIcon icon={faComment} className="pr-1 post_mobile_icon" size="lg" />
               {element.commentCount}                </span>
           </div>
         </div>
        </Link>
       )
     } else {
       return (
         <Link to={url}>
           <Card>
             <Card.Img variant="top" src={config.IMG + element.image} />
             <Card.Body>
               <Card.Text>
                 by {element.author}
               </Card.Text>
               <Card.Title>{element.title}</Card.Title>
               <Card.Text>
                 {element.post}
               </Card.Text>
               <Card.Text>
                 <span className="cat float-left">{element.category}</span> <span className="comment-count">
                   <FontAwesomeIcon icon={faComment} className="pr-1" size="lg" />
                   {element.commentCount}                </span>
               </Card.Text>
             </Card.Body>
           </Card>
         </Link>
       )
     }
     return null;
    })
    return myArray;
  }

  render(){
  // GLOBAL HOME VARIABLES
  const navigation = document.querySelector(".filters");
  const svg_cancel = document.querySelector(".svg_cancel");
  const svg_search_polygon = document.querySelector(".svg_search_polygon");
  const svg_search_path = document.querySelector(".svg_search_path");
  const svg_search_shadow = document.querySelector(".svg_search_shadow");
  const search_box_container = document.querySelector(".search_bar_container");
  

  // console.log(this.props)
  const filterUI = this.props.categories.map((element,index) =>{
      return( <span className="filterItem"> <span className={this.props.activeId.includes(element.cat_id) ? "filterSelected" : "filter" } onClick={()=> this.applyFilter(element.cat_id,index)}>{element.cat_title}</span></span>)
  });

  const postsUI = this.showPosts(this.props.filteredPosts);
    
  return (
    
  <div className="homeSection main-white-block container text-center">
    <span className="search_bar_container">
      <svg className="svg_search" data-name="Layer 1" viewBox="0 0 97.39 94.95">
        <polygon className="svg_search_polygon" points="48.7 0 9.64 18.81 0 61.06 27.02 94.95 70.37 94.95 97.39 61.06 87.75 18.81 48.7 0" />
        <path className="svg_search_path" d="M74.28,69.84a1.75,1.75,0,0,0-.66-1.17L51.69,51.28l1.65-2.06a2.53,2.53,0,0,0,.49-2.14L51.29,35.94a2.51,2.51,0,0,0-1.37-1.71l-10.3-5a2.51,2.51,0,0,0-2.19,0l-10.3,5a2.48,2.48,0,0,0-1.36,1.71L23.22,47.08a2.57,2.57,0,0,0,.49,2.14l7.12,8.92a2.5,2.5,0,0,0,2,1H44.24a2.48,2.48,0,0,0,2-.94L48,55.91,70,73.3a1.7,1.7,0,0,0,1.09.38h.2A1.74,1.74,0,0,0,72.41,73l1.5-1.89A1.77,1.77,0,0,0,74.28,69.84ZM48.65,47l-5.62,7H34l-5.61-7,2-8.78,8.12-3.91,8.11,3.91Z" />
      </svg>
      <img src={svgShadow} className="svg_search_shadow" alt="search-icon"></img>
      <input
        type="text"
        className="searchBox d-inline-block"
        name="search"
        autoComplete="off"
        onChange={this.onSearch}
          onFocus={() => { navigation.style.opacity = "0"; navigation.style.display = "none"; svg_cancel.style.display = "inline"; svg_search_path.style.fill = "white"; svg_search_polygon.style.fill = "#46c9e4"; svg_search_shadow.style.left = "5px"; svg_search_shadow.style.opacity = 0; search_box_container.style.backgroundColor = 'white'; search_box_container.style.width = "100%"; search_box_container.style.top = "0px"}}
          onBlur={() => { navigation.style.opacity = "1"; navigation.style.display = "inline"; svg_cancel.style.display = "none"; svg_search_path.style.fill = "#9296a4"; svg_search_polygon.style.fill = "white"; svg_search_shadow.style.left = "13px"; svg_search_shadow.style.opacity = 0.5; search_box_container.style.backgroundColor = 'transparent'; search_box_container.style.width = "initial"; search_box_container.style.top = "40px"}}
      ></input>
      <svg className="svg_cancel" data-name="Layer 1" viewBox="0 0 97.39 94.95">
        <polygon className="svg_cancel_polygon" points="60.6 38.41 57.77 35.58 48.7 44.65 39.63 35.58 36.8 38.41 45.87 47.48 36.8 56.55 39.63 59.38 48.7 50.3 57.77 59.38 60.6 56.55 51.53 47.48 60.6 38.41" />
      </svg>
    </span>

    <div className="filter-section navbar-nav-scroll">
      <div className="categories w-100 navbar-nav bd-navbar-nav flex-row">
        <div className="filters nav-item pt-2">{filterUI}</div>
      </div>
    </div>

    <div className="postList">
      <CardColumns>
        {postsUI}
      </CardColumns>
     { this.props.posts.length > 6 * this.props.loadCount ? ( <button className="load-more" onClick = {() => this.loadCount()}>Load More</button>): (null) }
    </div>

  </div>)
  }

}

export default connect((store) =>{
    console.log(store);
    return {
        categories: store.HomeDataReducer.categories,
        posts: store.HomeDataReducer.posts,
        activeId: store.HomeDataReducer.activeId,
        loadCount: store.HomeDataReducer.loadCount,
        filteredPosts: store.HomeDataReducer.filteredPosts
    }
   })(Home);