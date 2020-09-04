import React from 'react'
import {connect} from 'react-redux'
import { CardColumns,Card } from 'react-bootstrap';
import  './home.css';
import { fetchHomeData, setActiveid }from '../../actions/homeactions.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-regular-svg-icons'




class Home extends React.Component {

  componentWillMount() {
      this.props.dispatch(fetchHomeData());
  }

  applyFilter = (id,index) =>{
      if( id !== 1) {
          if(this.props.activeId.includes(1)) {
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
      this.props.dispatch(setActiveid( [...this.props.activeId] ));
  }

  render(){
  // GLOBAL HOME VARIABLES
  const navigation = document.querySelector(".filters");
  const svg_cancel = document.querySelector(".svg_cancel");
  // console.log(this.props)
  const filterUI = this.props.categories.map((element,index) =>{
      return( <span className="filterItem"> <a className={this.props.activeId.includes(element.id) ? "filterSelected" : "filter" } onClick={()=> this.applyFilter(element.id,index)}>{element.name}</a></span>)
  });

  const postsUI = this.props.posts.map((element,index) => {
    return(
      <Card>
        <Card.Img variant="top" src={element.image} />
        <Card.Body>
          <Card.Title>{element.title}</Card.Title>
          <Card.Text>
            {element.description}
          </Card.Text>
          <Card.Text>
          <span className="cat float-left">{element.category.name}</span> <a href="https://jevelin.shufflehound.com/blog1/2016/11/23/trip-that-youll-never-forget/#comments" className="comment-count">
                      <FontAwesomeIcon icon={faComment} className="pr-1" size="lg" />
                        {element.comments}                </a>
          </Card.Text>
        </Card.Body>
      </Card>)
  })
    
  return (
    
  <div className="homeSection">
    <div className="filter-section row">

      <div className="categories w-100">
        <span>
          <svg className="svg_search" data-name="Layer 1" viewBox="0 0 97.39 94.95">
            <polygon className="svg_search_polygon" points="48.7 0 9.64 18.81 0 61.06 27.02 94.95 70.37 94.95 97.39 61.06 87.75 18.81 48.7 0" />
            <path className="svg_search_path" d="M74.28,69.84a1.75,1.75,0,0,0-.66-1.17L51.69,51.28l1.65-2.06a2.53,2.53,0,0,0,.49-2.14L51.29,35.94a2.51,2.51,0,0,0-1.37-1.71l-10.3-5a2.51,2.51,0,0,0-2.19,0l-10.3,5a2.48,2.48,0,0,0-1.36,1.71L23.22,47.08a2.57,2.57,0,0,0,.49,2.14l7.12,8.92a2.5,2.5,0,0,0,2,1H44.24a2.48,2.48,0,0,0,2-.94L48,55.91,70,73.3a1.7,1.7,0,0,0,1.09.38h.2A1.74,1.74,0,0,0,72.41,73l1.5-1.89A1.77,1.77,0,0,0,74.28,69.84ZM48.65,47l-5.62,7H34l-5.61-7,2-8.78,8.12-3.91,8.11,3.91Z" />
          </svg>
          <input 
          type="text" 
          className="searchBox d-inline-block" 
          name="search" 
          onFocus={() => { navigation.style.opacity = "0"; navigation.style.display = "none"; svg_cancel.style.display = "inline-block"; }}
          onBlur={() => { navigation.style.opacity = "1"; navigation.style.display = "inline-block"; svg_cancel.style.display = "none" }}
          ></input>
          <svg className="svg_cancel" data-name="Layer 1" viewBox="0 0 97.39 94.95">
             <polygon className="svg_cancel_polygon" points="60.6 38.41 57.77 35.58 48.7 44.65 39.63 35.58 36.8 38.41 45.87 47.48 36.8 56.55 39.63 59.38 48.7 50.3 57.77 59.38 60.6 56.55 51.53 47.48 60.6 38.41" />
          </svg>

        </span>
        <div className="filters"> {filterUI} </div>
      </div>

    </div>

    <div className="postList pt-5">
      <CardColumns>
        {postsUI}
      </CardColumns>
    </div>

  </div>)
  }

}

export default connect((store) =>{
    // console.log(store);
    return {
        categories: store.categories,
        posts: store.posts,
        activeId: store.activeId
    }
   })(Home);