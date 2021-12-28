import React, {useState, useEffect} from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import movies from '../../images/movies.png';
import  useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));     //To fetch the local user
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({type: LOGOUT})
        navigate('/');
        setUser(null);
    };

    useEffect((logout, user) => {
        const token = user?.token;  //checks if token exists

        if(token){
            const decodedToken = decode(token);

                // v------------------v  This is going to be a certain value of something in miliseconds
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return(
        <AppBar className={classes.appBar} position="static" color="transparent">
            <div className={classes.brandContainer}>
                <a href='/'>
                <img className={classes.image} src={movies} alt="movies" height="100"/>
                </a>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Movie Reviews</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;