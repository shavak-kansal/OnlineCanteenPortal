import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login";
import BuyerOrder from "./components/common/BuyerOrder";
import VendorOrder from "./components/common/VendorOrder";
import VendorStatistics from "./components/common/VendorStatistics";

import Box from '@mui/material/Box';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  //const [loggedInUser, setLoggedInUser] = useCookies(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  

  const handleLogin = (id) => {
    setLoggedInUser(id);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser} handleLogin = {handleLogin}/>} />
          <Route path="login" element={<Login info="i wanna die" loggedInUser = {loggedInUser} handleLogin = {handleLogin}/>} />
          <Route path="orders" element={<BuyerOrder loggedInUser = {loggedInUser} setLoggedInUser = {setLoggedInUser}/>} />
          <Route path="vendororders" element={<VendorOrder loggedInUser = {loggedInUser}/>} />
          <Route path="vendorstatistics" element={<VendorStatistics loggedInUser = {loggedInUser}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
