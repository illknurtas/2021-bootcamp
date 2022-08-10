import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {
    Grid,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    Link
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './login.css'
import signup from './signup'

const Login = ({handleChange}) => {

    const [nameLogin, setNameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const handleLogin = (e) => {
        e.preventDefault();

        console.log(nameLogin, passwordLogin);
        Axios.post('http://localhost:3001/api/checkPerson', {
            name: nameLogin,
            password: passwordLogin
        }).then((response) => {
            console.log(response.data);
        })

    }

    useEffect(() => {
        Axios.get("http://localhost:3001/api/login").then((response) => {
            if (response.data.loggedIn == true){
                setLoginStatus(response.data.user[0].name);
            }
        })
    }, []);

    const paperStyle = {
        padding: 10,
        height: '75vh',
        width: '50vh',
        marginTop:30,
        margin: "0 auto"
    }
    const hStyle = {
        margin: 0,
        fontSize: '3rem',
        fontFamily:'Helvetica'
    }
    const avatarStyle = {
        backgroundColor: 'transparent',
        margin: '15px'
    }
    const iconStyle = {
        color: 'pink',
        fontSize: '38px'
    }
    const controlStyle = {
        color: 'secondary',
        margin: '10px 0',
        fontSize: '12px'
    }
    const btnStyle = {
        margin: '8px 0'
    }
    const typStyle = {
        margin: '8px 0',
        fontSize: '0.8rem'

    }
    return (
        <div className="login-form" id="background">
            <Grid>
                <Paper
                    style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon style={iconStyle} />
                        </Avatar>
                        <h3 style={hStyle}>Login</h3>
                        </Grid>
                    <form noValidate autoComplete="off" onSubmit={handleLogin}>
                    <TextField onChange={(e) => setNameLogin(e.target.value)}
                        color="secondary"
                        id="standard-size-small"
                        label="Username"
                        placeholder="Enter your username"
                        type="text"
                        required fullWidth />
                    <TextField
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        color="secondary"
                        label="Password"
                        id="standard-size-small"
                        placeholder="Enter your password"
                        type="password"
                        required fullWidth />
                    <FormControlLabel
                        control=
                        {<Checkbox style={controlStyle}
                            name="checkedC" />
                        }
                        label="Remember me" align="left" />

                    <Typography
                        style={typStyle}>You don't have an account?
                        <Link href="signup" onClick={() => handleChange("event", 1)}>
                            {" "}Create new account
                        </Link>
                    </Typography>
                    <Button
                        style={btnStyle}
                        type="submit"
                        variant="contained" size="medium"
                        color="primary"
                        fullWidth>Sign In</Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login;