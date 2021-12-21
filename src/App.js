import React, {useEffect, useState} from 'react';
import{Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import{useDispatch} from 'react-redux'; //dispatch an action

import {getPosts} from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import movies from './images/movies.png';
import useStyles from './styles';
//import { set } from 'mongoose';

const App = () => {                                     //The only parent to both form and post
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles ();
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(getPosts());
    }, [currentId,dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="transparent">
            <img className={classes.image} src={movies} alt="movies" height="90"/>
                <Typography className={classes.heading} variant="h2" align="center">Movie Reviews</Typography>
                <img className={classes.image} src={movies} alt="movies" height="90"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent ="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm ={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm ={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;