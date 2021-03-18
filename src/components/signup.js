import React, { useEffect, useState } from 'react';
import { Grid, Paper, Avatar, Typography, Button } from '@material-ui/core';
import { AddCircleOutlineOutlined } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fire } from "../helpers/db";

const Signup = (props) => {

    const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" }
    const avatarStyle = { backgroundColor: 'green' }
    const boxStyle = { display: "flex", width: "100%", justifyContent: "space-evenly" }
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }


    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleSignUp = () => {
        fire.createUserWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                if (response) {
                    props.history.goBack();
                    toast.success("User Registered Successfully..");
                }
            }).catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        toast.error(error.message);
                        break;
                    case 'auth/invalid-email':
                        toast.error(error.message);
                        break;
                    case 'auth/weak-password':
                        toast.error(error.message);
                        break;
                    default:
                        console.log(error);
                }
            })
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
        return () => {
            ValidatorForm.removeValidationRule('isPasswordMatch');
        }

    }, [password])

    return (
        <Grid>
            <ToastContainer />
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlined />
                    </Avatar>
                    <h2>Sign Up</h2>
                    <Typography variant="caption" gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <ValidatorForm onSubmit={handleSignUp} align="center">
                    <Grid >

                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            label="Email"
                            onChange={handleEmail}
                            name="email"
                            value={email}
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            autoComplete='off'
                            fullWidth placeholder="Enter Email" />


                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Password"
                            onChange={handlePassword}
                            name="password"
                            type="password"
                            value={password}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            autoComplete='off'
                            placeholder="Enter Password" />
                        <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Confirm Password"
                            onChange={handleConfirmPassword}
                            name="confirmpassword"
                            type="password"
                            value={confirmPassword}
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['Password do not matched!!!', 'This field is required']}
                            autoComplete='off'
                            placeholder="Enter Confirm Password" />

                    </Grid>
                    <Box m={2} p={2} style={boxStyle}>
                        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                        <Button type="submit" variant="contained" onClick={e => { e.preventDefault(); props?.history.goBack(); }} color="primary">Back</Button>
                    </Box>


                </ValidatorForm>
            </Paper>
        </Grid>
    )
}

export default withRouter(Signup);