import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from '../constants/actionTypes';

const actionType = (state = {isLoading: true, posts: []}, action) => {      // when using curly braces it means that you are using an object with multiple fields
    switch(action.type){
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case FETCH_ALL:
            return{ ...state, 
                    posts: action.payload.data, 
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages};
        case FETCH_BY_SEARCH:
            return{ ...state, posts: action.payload.data};
        case FETCH_POST:
            return{ ...state, post: action.payload.post};
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};       //... <-- means to spread so here we are spreading out all of the posts and that post is being stored in the action.payload
        case UPDATE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};  //action.payload is the updated post
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}; 
        case COMMENT:
            return {...state, posts: state.posts.map((post) => {
                if(post._id === action.payload._id)        //Change the post that just recieved a comment
                    return action.payload;
                
                return post;
            }),};
        default:
            return state;
    }
};

export default actionType;