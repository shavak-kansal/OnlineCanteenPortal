import axios from "axios";
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import BuyerProfileDisplay from '../common/BuyerProfileDisplay';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const Profile = (props) => {
  const [details, setDetails] = useState([]);

  const location = useLocation();
  

  const newUser = {
    email: props.loggedInUser.email,
    password: props.loggedInUser.password,
  };

  var result;
  
  (async () => {
    result = await axios.post("http://localhost:4000/user/loginBuyer", newUser);
    console.log(result);
  })();
  
  //console.log(result);

  return (
    <div>
      <BuyerProfileDisplay Name="{result.data.name}" Email="{result.data.email}" Age="{result.data.age}" Batch="{result.data.batch}" />
    </div>
  );
  
  /* useEffect(() => {
    axios
      .get("http://localhost:4000/profile") // unimplemented
      .then((response) => {
        setDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); */
  
};

export default Profile;
