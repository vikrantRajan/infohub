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
        if( id != 1) {
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
    console.log(this.props)
    const filterUI = this.props.categories.map((element,index) =>{
        return( <span className="filterItem"> <a className={this.props.activeId.includes(element.id) ? "filterSelected" : "filter" } onClick={()=> this.applyFilter(element.id,index)}>{element.name}</a></span>)
    });

    const postsUI = this.props.posts.map((element,index) =>{
        return(<Card>
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
    return (<div className="homeSection">
        <div className="filter-section row">
            <div className="categories w-100">
        <input type="text" className="searchBox d-inline-block" name="search"></input>
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
    console.log(store);
    return {
        categories: store.categories,
        posts: store.posts,
        activeId: store.activeId
    }
   })(Home);