import React, {useState, useRef} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {GoogleLogin} from "react-google-login";
import useStyles from './Styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from "./Input";
import Icon from "./Icon";
import useScript from "../../hooks/useScript";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth= () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp,setIsSignUp]=useState(false);
    const [formData, setFormData]= useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
        console.log(formData);
    }
    const handleChange = (e) => {
       setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword)=> !prevShowPassword)
    }
    const switchMode = () => {
        setIsSignUp((prevIsSignUp)=> !prevIsSignUp);
        setShowPassword(false);
    }
    const googleSuccess = async (res)=> {
        const result = decodeJwtResponse(res?.credential);
        const token = res?.credential;
        console.log(result);
        try {
            dispatch({type: 'AUTH', data: { result, token}});          
            navigate("/");
        } catch(error) {
            console.log(error);
        }
    }
    const decodeJwtResponse = (token)=> {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
    }
    const googleSignInButton = useRef(null);
    useScript("https://accounts.google.com/gsi/client", () => {
        window.google.accounts.id.initialize({
        client_id: "967866101408-8i3hb7nf1nrgk5f30dfjfrmgd70u4al1.apps.googleusercontent.com",
        callback: googleSuccess,
        });
        window.google.accounts.id.renderButton(
        googleSignInButton.current,
        { theme: "outline", size: "large"} // customization attributes
        );
        // window.google.accounts.id.
    });
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name= "firstName" label="First Name" handleChange={handleChange} autoFocus half />                            
                                    <Input name= "lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Pasword" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <div className={classes.googleButton} ref={googleSignInButton}>
                        <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth
                            startIcon={<Icon/>} 
                            variant="contained" 
                        >
                            Google Sign In
                        </Button>  
                    </div>
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )

}

export default Auth;