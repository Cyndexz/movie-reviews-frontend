import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';

import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts'

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: '' });       //This fetches data from redux
    const post = useSelector ((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //To only find the current post that we need from the data
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles ();
    const dispatch = useDispatch();         //Actually allows us to dispatch actions
    const location = useLocation();

    useEffect(() => {                   //If the posts exists we will set our post data
        if(post) setPostData(post);
    }, [post, location]);   //Added location and useLocation to form so that the form would not be available if the user is not logged in

    const handleSubmit = async(e) => {
        e.preventDefault();         //not to get the refresh in the browser

        if(currentId === 0){
            dispatch(createPost({...postData, name: user?.result?.name}));
        }else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        clear();
    };

    const clear = () =>{
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: '' });
    };


    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own movie reviews and like other's reviews on different movies.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography align="center" variant='h6'>{currentId ? `Editing ${post.title} Review` : 'Creating a Movie Review'} </Typography>
                <TextField name="title"  variant="outlined"  label="Movie Title"  fullWidth value ={postData.title}  onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="message"  variant="outlined"  label="Review" fullWidth multiline rows={4} value ={postData.message}  onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags"  variant="outlined"  label="Tags (comma seperated)"  fullWidth value ={postData.tags}  onChange={(e) => setPostData({...postData, tags: e.target.value.trim().split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;