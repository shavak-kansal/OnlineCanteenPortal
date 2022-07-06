import { Divider, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';


import axios from 'axios';

const spacedboxes = {m:2 , padding:2 , border: 1, borderRadius: 0, boxShadow: 1};

const BuyerOrder = (props) => {
    const [OrdersList, setOrdersList] = useState([]);

    useEffect(() => {
        let foodList = [];
        let foodGot = false
        axios
        .get("http://localhost:4000/food/")
        .then((response) => {
            foodList = response.data.slice();
            foodGot = true;
        });

        axios 
        .get("http://localhost:4000/order/")
        .then((response) => {
            console.log("Response is useeffect: ");
            console.log(response.data);
            
            let orders = response.data.slice();
            let newOrders = [];
            
            while(!foodGot)
                console.log("waiting...");

            orders.map((order, index) => {
                const found = foodList.find((item) => item._id == order.foodId);
                
                order.foodId = found;

                if(order.userId = props.loggedInUser._id)
                    newOrders.push(order);
            })
            
            setOrdersList(newOrders);
        });
    }, []);

    const getOrders = () => {
        axios 
        .get("http://localhost:4000/order/")
        .then((response) => {
            console.log("Response is : ");
            console.log(response.data);
            
            let orders = response.data.slice();
            let newOrders = [];

            //orders.filter((order) => order.userId == props.loggedInUser._id);
            
            orders.map((order) => {
                if(order.userId == props.loggedInUser._id)
                    newOrders.push(order);
            })

            setOrdersList(newOrders);
        });
    };
    

    return (
        <div>
            {OrdersList.map((order, index) => (
                <Grid container sx={spacedboxes}>
                    <Grid item xs={12}>
                        <Typography component="legend">UserId : {order.userId} </Typography>            
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">Cost : {order.cost}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">Time Order Placed : {order.time}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">FoodName : {order.foodId.name}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">Order Status : {order.status}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">Vendor Name : {order.foodId.shop}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">Quantity : {order.quantity}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography component="legend">Cost : {order.cost}</Typography>
                    <Divider />
                    </Grid>
                </Grid>
            ))}  
        </div>  
    )
}

export default BuyerOrder;
