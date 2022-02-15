import axios from 'axios';  //used to make api calls

//const url = 'https://movie-reviews-project.herokuapp.com/posts';      //url pointing to our backend always have http://172.29.174.112:3000/posts <--- /posts MUST be there for local

//const API = axios.create({baseURL: 'http://localhost:5000/posts'});
const API = axios.create({baseURL: 'https://movie-reviews-project.herokuapp.com/posts'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);     //export this function to be able to add redux capabilities
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post('/users/signin', formData);        //here in the api its basically saying hey database get me some data
export const signUp = (formData) => API.post('/users/signup', formData);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value})