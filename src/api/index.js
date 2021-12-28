import axios from 'axios';  //used to make api calls

//const url = 'https://movie-reviews-project.herokuapp.com/posts';      //url pointing to our backend always have http://172.29.174.112:3000/posts <--- /posts MUST be there for local

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');     //export this function to be able to add redux capabilities
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post('/users/signin', formData);        //here in the api its basically saying hey database get me some data
export const signUp = (formData) => API.post('/users/signup', formData);