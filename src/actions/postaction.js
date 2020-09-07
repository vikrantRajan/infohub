import axios from 'axios';
import config from '../config';

export function fetchPostData(id) {
    return function(dispatch) {
        axios.get(`${config.API}posts.php?p_id=${id}`).then((response) =>{
          console.log(response);
            dispatch({type:"POST", payload:response.data})
          }).catch((e) => {
            dispatch({type:"ERROR", payload:e})
          })
    }
}

export function postComment(data) {
  axios.post(`${config.API}submitcomment.php`, JSON.stringify(data)
  ).then((response) => {
    console.log(response);
    return response;
  }).catch((e) => {
    return e;
  })
}

 