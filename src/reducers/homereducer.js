export default function reducer(state = {
    fetching:false,
    fetched:false,
    categories:[],
    posts:[],
    activeId:[1],
    error:""  
},action) {
        if(action.type === "FETCH_START") {
          state = { ...state, fetching: true };
        }
        if(action.type === "HOME") {
          state = { ...state, fetching: false,fetched:true,categories:action.payload.categories,posts:action.payload.posts };
        }

        if(action.type === "ACTIVEID") {
          state = { ...state, fetching: false,activeId: action.payload };
        }
        if(action.type === "ERROR") {
          state = { ...state, fetching: false,error:action.payload };
        }
        return state;
}