import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';

//Action Creators -> actions that return actions
export const getPost = (id) => async (dispatch) =>{      //Everytime you export something wherever you are using it, it needs to be imported
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);          //Gettting the response from the api and returning from the backend and the data object
    
        dispatch({type: FETCH_POST, payload: {post: data}});                               //represents the posts
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
};


export const getPosts = (page) => async (dispatch) =>{      //Everytime you export something wherever you are using it, it needs to be imported
    try {
        dispatch({type: START_LOADING});
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);        //Gettting the response from the api and returning from the backend and the data object
    
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });                              //represents the posts
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);

        dispatch({type: FETCH_BY_SEARCH, payload: {data}});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);      //making a post api request to the backend 

        dispatch({type: CREATE, payload: data});
        
        navigate(`/posts/${data._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async(dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const {data} = await api.likePost(id, user?.token);

        dispatch({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value, id);

        dispatch({type: COMMENT, payload: data});
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}