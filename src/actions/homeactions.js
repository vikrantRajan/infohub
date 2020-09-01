import axios from 'axios';

export function fetchHomeData() {
    return function(dispatch) {
        axios.get('http://demo3513052.mockable.io/home').then((response) =>{
            dispatch({type:"HOME", payload:response.data})
          }).catch((e) => {
            dispatch({type:"ERROR", payload:e})
          })
    }
}
 