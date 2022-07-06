import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SearchComponent from './SearchComponent';
import { useState } from "react";
import axios from 'axios';
import { Button, Typography, TextField, Grid } from '@mui/material';

const style = {
    width: '100%',
    maxWidth: '100%',
    bgcolor: 'background.paper',
    margin: 'auto',
    textAlign: 'center',
  };

const spacedboxes = {m:2 , padding:2 , border: 1, borderRadius: 0, boxShadow: 1};
const miniboxes = { m:0 , padding:1 , border: 1, borderRadius: 0, boxShadow: 1};
const miniboxes2 = { m:0 , padding:1 , border: 0, borderRadius: 0, boxShadow: 1};

const BuyerProfileDisplay = props => {
    const [FavoritesList, setFavoritesList] = useState([]);
    const [FoodItemsList, setFoodItemsList] = useState([]);
    const [Wallet, setWallet] = useState(0);
    const [currentWallet, setCurrentWallet] = useState(props.loggedInUser.wallet);

    const getFavorites1 = () => {
        console.log("Getting favorites");
        let newArr = [];

        console.log(props.loggedInUser.favorites);
        for (const [i, favorite] of props.loggedInUser.favorites.entries()) {
            //console.log(favorite);
            
            const newUser = {
                foodid: favorite
            };
            
            console.log(newUser);

            axios
            .get("http://localhost:4000/food/getById", newUser)
            .then((response) => {
                alert("Logged in \t" + response.data);
                console.log("Response data");
                console.log(response.data);
            });
        }

        console.log("New array is : ");
        console.log(newArr);
        setFavoritesList(newArr);
        //console.log(FavoritesList);
    };

    const getFavorites = () => {
        console.log("Getting favorites");
        
        let newArr = [];

        axios
            .get("http://localhost:4000/food/", null)
            .then((response) => {
                console.log("Response data");
                console.log(response.data);
                newArr = response.data;
                
                console.log("newArr is");
                console.log(newArr);

                newArr = newArr.filter(item => props.loggedInUser.favorites.includes(item._id));
                
                console.log("newArr is after changes");
                console.log(newArr);
                
                setFavoritesList(newArr);
            });
    };

    const onChangeWallet = (event) => {
        console.log("Wallet changed");
        setWallet(event.target.value);
    };

    const handbleBuyWallet = (amount) => {
        if(currentWallet < amount) {
            
            return -1;
        }
        else {
            let cost = parseInt(amount);

            let user = props.loggedInUser;
            user.wallet = user.wallet - cost;
            props.setLoggedInUser(user);

            setCurrentWallet(user.wallet);

            setWallet(0);

            const newUser = {
                email: props.loggedInUser.email,
                wallet: user.wallet
            };

            axios
            .post("http://localhost:4000/user/walletUpdate", newUser)
            .then((response) => {
                console.log("Response data wallet updation");
                console.log(response.data);
            });
        }
    };


    const handleWallet = () => {
        const prevWallet = props.loggedInUser.wallet;
        const newWallet = prevWallet + parseInt(Wallet);

        //props.loggedInUser.wallet = newWallet;

        let user = props.loggedInUser;

        user.wallet = newWallet;

        props.setLoggedInUser(user);

        setCurrentWallet(newWallet);

        setWallet(0);

        const newUser = {
            email: props.loggedInUser.email,
            wallet: newWallet
        };

        axios
        .post("http://localhost:4000/user/walletUpdate", newUser)
        .then((response) => {
            console.log("Response data wallet updation");
            console.log(response.data);
            props.loggedInUser.wallet = newWallet;
        });
    };

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newBatch, setNewBatch] = useState("");

    const onChangeNewName = (event) => {
        setNewName(event.target.value);
    };

    const onChangeNewAge = (event) => {
        setNewAge(event.target.value);
    };

    const onChangeNewBatch = (event) => {
        setNewBatch(event.target.value);
    };

    const onUpdateNewName = () => {
        let user = props.loggedInUser;
        user.name = newName;
        user.age = newAge;
        user.batch = newBatch;

        props.setLoggedInUser(user);

        setNewName("");
        setNewAge("");
        setNewBatch("");

        axios
        .post("http://localhost:4000/user/buyerUpdate", user)
        .then((response) => {
            console.log("Response data buyer updation");
            console.log(response.data);
        });

    };

    //console.log(FavoritesList);
    return (
        <div>
            <Grid container sx={spacedboxes}>
                <Grid item xs={12} sx={miniboxes2}>
                    <Typography component="legend">Wallet amount : {currentWallet} </Typography> 
                </Grid>
                <Grid item xs={6} sx={miniboxes2}>
                    <TextField id="outlined-basic" label="Add money amount" variant="outlined" value={Wallet} onChange={onChangeWallet}/>
                </Grid>
                <Grid item xs={6} sx={miniboxes2}>
                    <Button variant="contained" color="primary" onClick={handleWallet}>Add Money</Button>
                </Grid>
            </Grid>
            <div>
                <button onClick={getFavorites} >Display Favorites</button>
                <List >
                    {FavoritesList.map((item, index) => (
                        <ListItemText sx={spacedboxes} primary="Name" secondary={item.name} />
                    ))}    
                </List>
            </div>
            <div>
            <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem>
                    <ListItemText primary="Name" secondary={props.loggedInUser.name} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Email" secondary={props.loggedInUser.email} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Age" secondary={props.loggedInUser.age} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Batch" secondary={props.loggedInUser.batch} />
                </ListItem>
            </List>
            <Grid container item xs={12} sx={spacedboxes}>
                <Grid item xs={12}>
                    <Typography component="legend">UPDATE USER DETAILS</Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Name" variant="outlined" value={newName} onChange={onChangeNewName}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Age" variant="outlined" value={newAge} onChange={onChangeNewAge}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="outlined-basic" label="New Batch" variant="outlined" value={newBatch} onChange={onChangeNewBatch}/>
                </Grid>
                <Grid item xs={3}>
                    <button onClick={onUpdateNewName}>Update User Details</button>
                </Grid>
            </Grid>
            <SearchComponent loggedInUser = {props.loggedInUser} handbleBuyWallet={handbleBuyWallet}/>
            </div>
        </div>
    );
};

export default BuyerProfileDisplay;