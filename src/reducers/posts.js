import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];       //... <-- means to spread so here we are spreading out all of the posts and that post is being stored in the action.payload
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);  //action.payload is the updated post
        case DELETE:
            return posts.filter((post) => post._id !== action.payload); 
        default:
            return posts;
    }
}