import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



const Register = (props) =>  {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [password, setPassword] = useState("");

    const [manager, setManager] = useState("");
    const [shop, setShop] = useState("");
    const [phone, setPhone] = useState("");
    const [opening, setOpening] = useState("");
    const [closing, setClosing] = useState("");
    
    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangeAge = (event) => {
        setAge(event.target.value);
    };

    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeManager = (event) => {
        setManager(event.target.value);
    }

    const onChangeShop = (event) => {
        setShop(event.target.value);
    }

    const onChangePhone = (event) => {
        setPhone(parseInt(event.target.value));
    }

    const onChangeOpening = (event) => {
        setOpening(parseInt(event.target.value));
    }

    const onChangeClosing = (event) => {
        setClosing(parseInt(event.target.value));
    }

    const resetInputs = () => {
        setName("");
        setEmail("");
        setAge("");
        setBatch("");

        setPassword("");

        setManager("");
        setShop("");
        setPhone("");
        setOpening("");
        setClosing("");
    };

    const onSubmitBuyer = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            age: age,
            batch: batch,
            password: password
        };

        axios
        .post("http://localhost:4000/user/registerBuyer", newUser)
        .then((response) => {
            alert("Created\t" + response.data.name);
            console.log(response.data);
        });

        resetInputs();
    };

    const onSubmitVendor = (event) => {
        event.preventDefault();

        const newUser = {
            manager: manager,
            shop: shop,
            email: email,
            phone: phone,
            opening: opening,
            closing: closing,
            password: password
        };

        axios
        .post("http://localhost:4000/user/registerVendor", newUser)
        .then((response) => {
            alert("");
            alert("Created\t" + response.data.name);
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });

        resetInputs();
    };

    const [type, setType] = React.useState(0);

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const src_list = [
    <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
            <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={onChangeUsername}
            />
        </Grid>
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
            <TextField
                label="Age"
                variant="outlined"
                value={age}
                onChange={onChangeAge}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Batch"
                variant="outlined"
                value={batch}
                onChange={onChangeBatch}
            />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitBuyer}>
                Register
            </Button>
        </Grid>
    </Grid>, 
    <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
            <TextField
                label="Manager Name"
                variant="outlined"
                value={manager}
                onChange={onChangeManager}
            />
        </Grid>
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
            <TextField
                label="Shop Name"
                variant="outlined"
                value={shop}
                onChange={onChangeShop}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={onChangePhone}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Opening Time"
                variant="outlined"
                value={opening}
                onChange={onChangeOpening}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Closing Time"
                variant="outlined"
                value={closing}
                onChange={onChangeClosing}
            />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitVendor}>
                Register
            </Button>
        </Grid>
    </Grid>
    ];

    return (
        <div>
            <Box sx={{ minWidth: 120 }} m={2} pt={3}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Age"
                onChange={handleChange}
                >
                <MenuItem value={0}>Buyer</MenuItem>
                <MenuItem value={1}>Vendor</MenuItem>
                </Select>
            </FormControl>
            </Box>
            {src_list[type]}
        </div>
        
    );
};

export default Register;
