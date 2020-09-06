import axios from 'axios';
import config from '../config';

export function fetchPostData(id) {
    return function(dispatch) {
        axios.get(`${config.API}fetchPost.php?id=${id}`).then((response) =>{
          console.log(response);
            dispatch({type:"POST", payload:response.data})
          }).catch((e) => {
            dispatch({type:"ERROR", payload:e})
          })
    }
}

 