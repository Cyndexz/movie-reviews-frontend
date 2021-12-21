import axios from 'axios';  //used to make api calls

const url = 'https://movie-reviews-project.herokuapp.com/posts';      //url pointing to our backend always have http://172.29.174.112:3000/posts <--- /posts MUST be there for local


export const fetchPosts = () => axios.get(url);     //export this function to be able to add redux capabilities
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);