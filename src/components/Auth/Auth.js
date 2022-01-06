import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';
import {AUTH} from '../../constants/actionTypes'

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

const initialState = {firstName: '', lastName: '', email: '', password:'', confirmPassword:''};

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);  //This switches things on and off
    
    const switchMode = ()  => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);   //Will be true of false 
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };
    
    const handleChange = (e) => {   //e for the event
        setFormData ({...formData, [e.target.name]: e.target.value});        //by using ...formData it will spread out all the other properties and going through and only changing it the one specific you are currently on
    };
    
    const googleSuccess = async (res) => {
        const result = res?.profileObj;        //the ?. will help because it means if we have show it but if we don't, don't cause a problem or show it
        const token = res?.tokenId;

        try {
            dispatch({type:AUTH, data: {result, token}});

           navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    
    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again Later');
        alert('Google Sign In was unsuccessful. Try Again Later');
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">Sign{isSignup ? ' Up' : ' In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign{isSignup ? ' Up' : ' In'}</Button>
                    <GoogleLogin 
                        clientId="815739940529-c9p1uavg163l84jcr6mg65qb7itfh2en.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained"> 
                            Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>{isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;