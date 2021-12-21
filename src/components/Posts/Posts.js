import React from 'react';
import {Grid, CircularProgress}  from '@material-ui/core';
import {useSelector} from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (                                        // ! = if,  ? = then return,   : = else return this
        !posts.length ? <CircularProgress/> : (     //If there are no posts length(length = 0) then return the circular progress otherwise return a grid with posts
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (         //Mapping with our real posts
                    <Grid key={post._id} item xs={12} sm={6} md={6}> 
                        <Post post={post} setCurrentId={setCurrentId}/>                   {/*we can send each individual value to each post component*/ }
                    </Grid>
                ))} { /**curly bracees to indicate that we are using javascript logic*/}
            </Grid>
        )
    );
};

export default Posts;