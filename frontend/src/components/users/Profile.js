import axios from "axios";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BuyerProfileDisplay from '../common/BuyerProfileDisplay';
import VendorProfileDisplay from '../common/VendorProfileDisplay';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

//<BuyerProfileDisplay Name={props.loggedInUser.name} Email={props.loggedInUser.email} Age={props.loggedInUser.age} Batch={props.loggedInUser.batch} />
//<VendorProfileDisplay loggedInUser = {props.loggedInUser}/>

const Profile = (props) => {
  console.log(props.loggedInUser);

  //let userType = props.loggedInUser.batch ? true : false;

  let userType = props.loggedInUser.hasOwnProperty("batch");
  
  console.log("User type is : " + userType);
  return (
    <Box m={2} pt={3}>
      <div style={{textAlign: "center"}} >
        {userType ? <BuyerProfileDisplay loggedInUser = {props.loggedInUser} setLoggedInUser = {props.setLoggedInUser}/> : <VendorProfileDisplay loggedInUser = {props.loggedInUser} setLoggedInUser = {props.setLoggedInUser}/>}
        
      </div>
    </Box>
  );
};

export default Profile;
