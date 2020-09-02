import React from 'react'
import {connect} from 'react-redux'
import  './home.css';
import { fetchHomeData, setActiveid }from '../../actions/homeactions.js'
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
    return (<div className="homeSection">
        <div className="filter-section">
            <div className="filters">
               {filterUI}
            </div>
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