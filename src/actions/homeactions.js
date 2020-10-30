import axios from 'axios';
import config from '../config';

export function fetchHomeData() {
    return function(dispatch) {
      dispatch({type:"FETCH_START"})

        axios.get(`${config.API}index.php`).then((response) =>{
          console.log(response);
            dispatch({type:"HOME", payload:response.data})
          }).catch((e) => {
            dispatch({type:"ERROR", payload:e})
          })
    }
}

export function setFilterData(data) {
  return function(dispatch) {
          dispatch({type:"FILTER", payload:data})
  }
}

export function setLoadCount(count) {
  return function(dispatch) {
    dispatch({type:"LOADCOUNT", payload:count})

  }
}

export function setActiveid(id) {
  return function(dispatch) {
    dispatch({type:"ACTIVEID", payload:id})

  }
}
 