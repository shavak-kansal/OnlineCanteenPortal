import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState(0);

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setPassword("");
        setEmail("");
    };
    
    const onSubmitBuyer = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };
        
        axios
        .post("http://localhost:4000/user/loginBuyer", newUser)
        .then((response) => {
            alert("Logged in \t" + response.data.email);
            props.handleLogin(response.data);
            console.log(props.loggedInUser);
            navigate("/profile", );
        });
        
        
        resetInputs();
    };

    const onSubmitVendor = (event) => {
        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        //Navigate("");

        axios
        .post("http://localhost:4000/user/loginVendor", newUser)
        .then((response) => {
            alert("Logged in \t" + response.data.email);
            props.handleLogin(response.data);
            console.log(props.loggedInUser);
            navigate("/profile", );
        });
        
        
        resetInputs();
    };

    var src_list = [onSubmitBuyer, onSubmitVendor];

    return (
        <div>
            <Box sx={{ minWidth: 120 }} m={2} pt={3}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type of user</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type of user"
                onChange={handleChange}
                >
                <MenuItem value={0}>Buyer</MenuItem>
                <MenuItem value={1}>Vendor</MenuItem>
                </Select>
            </FormControl>
            </Box>
            <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Password"
                variant="outlined"
                value={password}
                onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={src_list[type]}>
                Login
                </Button>
            </Grid>
        </Grid>
        </div>

    );
};

export default Login;
