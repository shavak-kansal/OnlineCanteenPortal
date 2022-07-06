import { Button, Divider, FormControlLabel, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';


import axios from 'axios';

const spacedboxes = {m:2 , padding:2 , border: 1, borderRadius: 0, boxShadow: 1};

const VendorOrder = (props) => {
    const [OrdersList, setOrdersList] = useState([]);

    const statusList = ["PLACED", "ACCEPTED", "COOKING", "READY FOR PICKUP", "COMPLETED"];
    
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
            console.log("Response is : ");
            console.log(response.data);
            
            let orders = response.data.slice();
            

            while(!foodGot)
                console.log("waiting...");

            orders.map((order, index) => {
                const found = foodList.find((item) => item._id == order.foodId);
                
                orders[index].foodId = found;
            })

            let newOrders = [];
            
            orders.map((order) => {
                if(order.foodId.shop == props.loggedInUser.shop)
                    newOrders.push(order);
            })

            orders = newOrders.slice();
            newOrders = [];
            
            setOrdersList(orders);
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
    
    const advanceStatus = (index) => {
        return () => {
            const order = OrdersList[index];

            console.log("Order is : ");
            console.log(order);

            if(OrdersList[index].status == "REJECTED")
                return;

            let newOrders = OrdersList.slice();
            let index1 = statusList.indexOf(newOrders[index].status);

            if (index1 < statusList.length - 1)
                newOrders[index].status = statusList[index1 + 1];
            
            setOrdersList(newOrders);  
            
            axios
                .post("http://localhost:4000/order/updateStatus", newOrders[index])
                .then((response) => {
                    console.log("Response data for order status update");
                    console.log(response.data);
                });
        }
    }

    const onOrderReject = (index) => {
        return () => {
            if (OrdersList[index].status != "PLACED")
                return;

            let newOrders = OrdersList.slice();
            newOrders[index].status = "REJECTED";
            setOrdersList(newOrders);

            axios
                .post("http://localhost:4000/order/updateStatus", newOrders[index])
                .then((response) => {
                    console.log("Response data for order rejection");
                    console.log(response.data);
                });
        }
    }
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
                    <Typography component="legend">Food Item Name : {order.foodId.name}</Typography>
                    <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="legend">Order Status : {order.status}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="legend">Food Item Quantity : {order.quantity}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="legend">Order Shop : {order.shop}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={advanceStatus(index)}>MOVE TO NEXT STAGE</Button>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={onOrderReject(index)}>REJECT</Button>
                        <Divider />
                    </Grid>
                </Grid>
            ))}  
        </div>  
    )
}

export default VendorOrder;
