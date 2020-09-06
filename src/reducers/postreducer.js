export default function postreducer(state = {
    fetching,
    fetched,
    postData
},action) {
        if(action.type === "FETCH_START") {
          state = { ...state, fetching: true };
        }
        if(action.type === "POST") {
          state = { ...state, fetching: false,fetched:true,postData:action.payload };
        }


        if(action.type === "ERROR") {
          state = { ...state, fetching: false,error:action.payload };
        }
        return state;
}