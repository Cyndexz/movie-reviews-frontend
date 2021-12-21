import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators -> actions that return actions
export const getPosts = () => async (dispatch) =>{      //Everytime you export something wherever you are using it, it needs to be imported
    try {
        const {data} = await api.fetchPosts();          //Gettting the response from the api and returning from the backend and the data object
        dispatch({type: FETCH_ALL, payload: data});                               //represents the posts
    } catch (error) {
        console.log(error);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);      //making a post api request to the backend 

        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error);
    }
}