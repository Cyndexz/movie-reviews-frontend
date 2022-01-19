import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts'

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({title: '', message: '', tags: [], selectedFile: '' });       //This fetches data from redux
    const post = useSelector ((state) => currentId ? state.posts.posts.find((message) => message._id === currentId) : null); //To only find the current post that we need from the data
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles ();
    const dispatch = useDispatch();         //Actually allows us to dispatch actions
    const location = useLocation();
    const navigate = useNavigate();

    const clear = () =>{
        setCurrentId(null);
        setPostData({title: '', message: '', tags: [], selectedFile: '' });
    };
    
    useEffect(() => {                   //If the posts exists we will set our post data
        if(!post?.title){
            clear(); 
        }
        if(post) setPostData(post);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post, location]);   //Added location and useLocation to form so that the form would not be available if the user is not logged in
    

    const handleSubmit = async(e) => {
        e.preventDefault();         //not to get the refresh in the browser

        if(!currentId){
            dispatch(createPost({...postData, name: user?.result?.name}, navigate));
        }else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        clear();
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

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      };
    
      const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
      };

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography align="center" variant='h6'>{currentId ? `Editing ${post.title} Review` : 'Creating a Movie Review'} </Typography>
                <TextField name="title"  variant="outlined"  label="Movie Title"  fullWidth value ={postData.title}  onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="message"  variant="outlined"  label="Review" fullWidth multiline rows={4} value ={postData.message}  onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}/>
                </div>
                {/**<TextField name="tags"  variant="outlined"  label="Tags (comma seperated)"  fullWidth value ={postData.tags}  onChange={(e) => setPostData({...postData, tags: e.target.value.trim().split(',')})}/>*/}
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